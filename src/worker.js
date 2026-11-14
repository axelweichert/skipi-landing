const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const { name, email, message } = await request.json();
        if (!name || !email || !message) {
          return Response.json({ error: 'Alle Felder erforderlich' }, { status: 400, headers: CORS });
        }
        if (!email.includes('@')) {
          return Response.json({ error: 'Ungültige E-Mail' }, { status: 400, headers: CORS });
        }

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
            subject: `Skipi Kontaktanfrage von ${name}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px">
                <h2 style="color:#e85d04;margin-bottom:24px">Neue Kontaktanfrage – skipi.cloud</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Nachricht:</strong></p>
                <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</div>
              </div>
            `,
          }),
        });

        if (!res.ok) {
          return Response.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500, headers: CORS });
        }
        return Response.json({ ok: true }, { headers: CORS });
      } catch (e) {
        return Response.json({ error: 'Serverfehler' }, { status: 500, headers: CORS });
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

