#!/usr/bin/env node
// Skipi Landing – i18n Vollständigkeitsprüfung
// Prüft BEIDE Richtungen:
// 1. Alle data-i18n Attribute → Key im T-Objekt vorhanden?
// 2. Alle Keys im T-Objekt → data-i18n Attribut im HTML vorhanden?
// 3. Alle Sprachblöcke vollständig gegen DE?

const fs = require('fs');
const html = fs.readFileSync('./public/index.html', 'utf8');
let ok = true;

// ── 1. JS Syntax ──────────────────────────────────────────────
const scripts = [...html.matchAll(/<script(?! type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)];
scripts.forEach((m, i) => {
  try { new Function(m[1]); } catch(e) {
    console.error(`❌ JS Syntax Fehler in Script ${i+1}: ${e.message}`);
    ok = false;
  }
});

// ── 2. T-Objekt extrahieren ───────────────────────────────────
const tm = html.match(/const T=\{([\s\S]*?)\};\s*\nfunction applyLang/);
if (!tm) { console.error('❌ T-Objekt nicht gefunden'); process.exit(1); }
let T; eval('T={'+tm[1]+'}');
const deKeys = Object.keys(T.de);

// ── 3. data-i18n Attribute aus HTML ───────────────────────────
const usedKeys = [...new Set([...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map(m=>m[1]))];

// Richtung A: data-i18n Key existiert nicht im T.de
const missingInT = usedKeys.filter(k => !T.de[k]);
if (missingInT.length) {
  console.error('❌ data-i18n Keys ohne Übersetzung in T.de:', missingInT.join(', '));
  ok = false;
}

// Richtung B: T.de Key hat kein data-i18n im HTML
// (Ausnahmen: Keys die per JS gesetzt werden, nicht per data-i18n)
const jsOnlyKeys = ['nav.cta']; // Keys die per JS verwendet werden
const missingInHtml = deKeys.filter(k => !usedKeys.includes(k) && !jsOnlyKeys.includes(k));
if (missingInHtml.length) {
  console.warn('⚠️  T.de Keys ohne data-i18n im HTML (möglicherweise per JS gesetzt):');
  console.warn('   ', missingInHtml.join(', '));
}

// ── 4. Alle Sprachen gegen DE ─────────────────────────────────
['en','fr','it','es','pt'].forEach(lang => {
  const missing = deKeys.filter(k => T[lang][k] === undefined);
  if (missing.length) {
    console.error(`❌ ${lang.toUpperCase()} fehlt ${missing.length} Keys:`, missing.join(', '));
    ok = false;
  }
});

if (ok) {
  console.log('✅ i18n vollständig – JS Syntax OK, alle Keys verdrahtet, alle Sprachen vollständig');
} else {
  process.exit(1);
}
