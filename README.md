# Skipi Landing Page

**Version:** 1.3.41  
**Live:** [www.skipi.cloud](https://www.skipi.cloud)

Marketing-Landing-Page für Skipi – Smart KI Picture Indexer.

---

## Struktur

| Datei | Inhalt |
|---|---|
| `public/index.html` | Vollständige Landing Page (Single-File) |
| `public/axel-weichert.jpg` | Foto für Über-uns-Sektion |
| `src/worker.js` | Cloudflare Worker (statische Assets + /api/contact) |
| `check-i18n.js` | i18n-Prüfskript (vor jedem Commit ausführen) |

## Sektionen (Reihenfolge)

1. Hero
2. Differenzierungsmerkmale
3. Features
4. Workflow-Vergleich
5. Unterstützte Serien
6. Preise (Tryout · Essentials · Advanced · Premier · Unlimited · Agency + Backup Add-on)
7. Über uns (Axel Weichert, Foto, Biografie)
8. Performance & Sicherheit (Cloudflare Infrastruktur)
9. FAQ
10. CTA
11. Footer

## Features

- **6 Sprachen:** DE, EN, FR, IT, ES, PT (vollständig übersetzt)
- **Dark/Light Mode**
- **Kontaktformular-Modal** → /api/contact → Resend → axel@weichert.at
- **Backup Add-on** in PowerUp-Sektion mit Checkbox → `&addon=backup` URL-Parameter
- **Über-uns-Sektion** mit Foto, responsive (Tablet + Mobile)
- Vollständig responsive (900px + 600px Breakpoints)

## Worker-Endpoints

| Endpoint | Methode | Funktion |
|---|---|---|
| `/api/contact` | POST | Kontaktformular → Resend |

## Secrets (Cloudflare Dashboard)

| Key | Beschreibung |
|---|---|
| `RESEND_API_KEY` | Resend API Key für Kontaktformular |

## Dev-Regeln

1. Vor jedem Commit: `node check-i18n.js` — prüft JS-Syntax, data-i18n-Verdrahtung, alle 6 Sprachen
2. Neue Texte immer in alle 6 Sprachen übersetzen
3. Neue HTML-Elemente mit `data-i18n` oder `data-i18n-html` versehen
4. Version in `package.json` bei jedem Commit erhöhen
