# Skipi Landing Page

**Version:** 1.3.53  
**Live:** [www.skipi.cloud](https://www.skipi.cloud)

Marketing-Landing-Page für Skipi – Smart KI Picture Indexer.

---

## Sektionen (Reihenfolge)

1. Hero
2. Differenzierungsmerkmale
3. Features
4. Workflow-Vergleich (Manuell vs. Skipi)
5. Cloud Native (section-label, h2, Feature-Boxen)
6. Unterstützte Serien
7. Preise (Tryout · Essentials · Advanced · Premier · Unlimited · Agency + Backup Add-on)
8. Über uns (Axel Weichert, Foto, Biografie)
9. Performance & Sicherheit (Cloudflare Infrastruktur)
10. FAQ
11. CTA
12. Footer

## Features

- **6 Sprachen:** DE, EN, FR, IT, ES, PT (vollständig übersetzt)
- **Dark/Light Mode**
- **Kontaktformular-Modal** → /api/contact → Resend → axel@weichert.at
- **Backup Add-on** in PowerUp-Sektion mit Checkbox → `&addon=backup` URL-Parameter
- **Cloud Native Sektion** mit Feature-Boxen (Kein Upload, Keine Installation etc.)
- **Über-uns-Sektion** mit Foto, responsive (Tablet + Mobile)
- Vollständig responsive (900px + 600px Breakpoints)

## Dateien

| Datei | Inhalt |
|---|---|
| `public/index.html` | Vollständige Landing Page (Single-File) |
| `public/axel-weichert.jpg` | Foto für Über-uns-Sektion |
| `src/worker.js` | Cloudflare Worker (statische Assets + /api/contact) |
| `check-i18n.js` | i18n-Prüfskript (vor jedem Commit ausführen) |

## Worker-Endpoints

| Endpoint | Methode | Funktion |
|---|---|---|
| `/api/contact` | POST | Kontaktformular → Resend |

## Secrets (Cloudflare Dashboard)

| Key | Beschreibung |
|---|---|
| `RESEND_API_KEY` | Resend API Key für Kontaktformular |

## Dev-Regeln

1. Vor jedem Commit: `node check-i18n.js`
2. Neue Texte immer in alle 6 Sprachen übersetzen
3. Keine Inline-Styles die Media Queries überschreiben — immer CSS-Klassen
4. Vor Push fragen — nie blind deployen
5. Version in `package.json` bei jedem Commit erhöhen
