// Kontaktformular (OWL-2559): nur von der eigenen Seite, Cloudflare Turnstile (prüft, ob ein Mensch am Browser sitzt),
// Inhaltsprüfung gegen Werbung (spam.mjs) und alle Angaben maskiert, bevor sie in die Mail kommen.
import { pruefen } from './spam.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function menschGeprueft(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, ...(ip ? { remoteip: ip } : {}) }) });
    if (!r.ok) { console.error('turnstile status', r.status); return true; }
    const j = await r.json();
    if (!j.success) console.log('turnstile abgelehnt', (j['error-codes'] || []).join(','));
    return !!j.success;
  } catch (e) { console.error('turnstile', e?.message || e); return true; }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const ursprung = request.headers.get('origin');
        if (ursprung && ursprung !== url.origin) return Response.json({ error: 'Ungültiger Ursprung' }, { status: 403 });
        const b = await request.json();
        const feld = (k, max) => String(b?.[k] ?? '').replace(/\r/g, '').trim().slice(0, max);
        const name = feld('name', 120).replace(/[\n\t]/g, ' '), email = feld('email', 160), message = feld('message', 5000);
        if (!name || !email || !message) {
          return Response.json({ error: 'Alle Felder erforderlich' }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return Response.json({ error: 'Ungültige E-Mail' }, { status: 400 });
        }
        if (!(await menschGeprueft(env, feld('turnstile', 2100), request.headers.get('cf-connecting-ip') || ''))) {
          return Response.json({ error: 'Sicherheitsprüfung fehlgeschlagen', pruefung: true }, { status: 403 });
        }
        const urteil = pruefen({ kurz: [name], lang: [message] });
        if (urteil.stufe === 'spam') {
          // Werbung: nicht zustellen. Der Absender sieht dieselbe Bestätigung wie jeder andere; im Protokoll steht nur der Grund.
          console.log('kontakt aussortiert', urteil.punkte, urteil.gruende.join('; '));
          return Response.json({ ok: true });
        }
        const verdacht = urteil.stufe === 'verdacht' ? `Die Nachricht hat Merkmale von Werbung (${urteil.gruende.join(', ')}), wurde aber zugestellt.` : '';

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Skipi Kontakt <noreply@skipi.cloud>',
            to: ['axel@weichert.at'],
            reply_to: email,
            subject: `${verdacht ? 'Spamverdacht – ' : ''}Skipi Kontaktanfrage von ${name}`.slice(0, 180),
            html: `
              <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px">
                <h2 style="color:#e85d04;margin-bottom:24px">Neue Kontaktanfrage – skipi.cloud</h2>
                <p><strong>Name:</strong> ${esc(name)}</p>
                <p><strong>E-Mail:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
                <p><strong>Nachricht:</strong></p>
                <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${esc(message)}</div>
                ${verdacht ? `<p style="font-size:13px;color:#9b1c1c">Hinweis: ${esc(verdacht)}</p>` : ''}
              </div>
            `,
          }),
        });

        if (!res.ok) {
          return Response.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500 });
        }
        return Response.json({ ok: true });
      } catch (e) {
        return Response.json({ error: 'Serverfehler' }, { status: 500 });
      }
    }

    // Windows- und Linux-App: zu groß für statische Assets (max. 25 MiB), deshalb aus R2 „skipi-downloads“
    const DOWNLOADS = { '/download/Skipi-windows.zip': 'application/zip', '/download/Skipi-linux.tar.gz': 'application/gzip' };
    if (DOWNLOADS[url.pathname] && (request.method === 'GET' || request.method === 'HEAD')) {
      const key = url.pathname.slice('/download/'.length);
      const obj = request.method === 'HEAD'
        ? await env.DOWNLOADS.head(key)
        : await env.DOWNLOADS.get(key, { range: request.headers, onlyIf: request.headers });
      if (!obj) return new Response('Nicht gefunden', { status: 404 });
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set('ETag', obj.httpEtag);
      headers.set('Content-Type', DOWNLOADS[url.pathname]);
      headers.set('Content-Disposition', `attachment; filename="${key}"`);
      headers.set('Accept-Ranges', 'bytes');
      headers.set('Cache-Control', 'public, max-age=300');
      if (request.method === 'HEAD') { headers.set('Content-Length', String(obj.size)); return new Response(null, { headers }); }
      if (!('body' in obj)) return new Response(null, { status: 304, headers });
      if (request.headers.has('Range') && obj.range && 'offset' in obj.range) {
        const end = obj.range.offset + obj.range.length - 1;
        headers.set('Content-Range', `bytes ${obj.range.offset}-${end}/${obj.size}`);
        return new Response(obj.body, { status: 206, headers });
      }
      return new Response(obj.body, { headers });
    }

    // Favicon redirect
    if (url.pathname === '/favicon.ico') {
      return Response.redirect('https://skipi.cloud/skipi-logo-dark.svg', 301);
    }

    return env.ASSETS.fetch(request);
  },
};

