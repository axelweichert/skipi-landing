# Changelog – Skipi Landing Page

## [1.3.75] – 2026-04-21
- PowerUp-Token-Pakete erhöht (ehrliche Marge):
  - 5 €/500 → 9 €/500
  - 12 €/1.500 → 19 €/1.200
  - 35 €/5.000 → 49 €/3.000
  - NEU: 99 €/6.500
- Preise nun konsistent mit monatlichen Abo-Plänen (gleicher €/Token)

## [1.3.74] – 2026-04-21
- i18n: „Warum Skipi" Übersetzungen für FR, IT, ES, PT ergänzt

## [1.3.73] – 2026-04-21
- Preise und Token-Pakete aktualisiert (nach Marktanalyse):
  - Advanced: 1.200 Token (statt 2.000)
  - Premier: 49 € / 3.000 Token (statt 39 € / 6.000)
  - Unlimited: 99 € / 7.500 Token (statt 89 € / 15.000)
  - Agency: 249 € / 20.000 Token (statt 199 € / 50.000)
  - Essentials 9 € / 500 Token unverändert
- Schema.org JSON-LD Offers synchron
- FAQ-Richtwert aktualisiert (DTM-Wochenende ca. 3.000–4.000 Token)
- FAQ-Preisübersicht aktualisiert
- i18n DE + EN: neue Beträge
- NEU: „Warum Skipi" Vergleichs-Box unter Pricing — hebt visuellen Fahrzeug-Match und Gesichtserkennung hervor

## [1.3.39] – 2026-04-18
- NEU: Über-uns-Sektion mit Foto von Axel Weichert, vollständiger Biografie und Links zu weichert.at + 100octane.de
- Nav: „Über uns" Link in alle 6 Sprachen ergänzt
- i18n: about.* Keys (label, h2, p1–p4, footer, location) in DE/EN/FR/IT/ES/PT

## [1.3.38] – 2026-04-18
- BUGFIX: Pricing-Sektion war nur auf Deutsch – data-i18n-Attribute fehlten komplett bei Advanced, Premier, Unlimited Feature-Listen und gesamtem Agency-Banner
- i18n: Agency-Banner vollständig übersetzt (Tagline, 6 Features, CTA) in DE/EN/FR/IT/ES/PT
- i18n: Neue Keys agency.tagline, agency.f1–f3, agency.f5–f6, agency.cta in allen 6 Sprachen

## [1.3.37] – 2026-04-18
- BUGFIX: Sprachschalter defekt – unescapter Apostroph in französischer Übersetzung (l'une) hat den gesamten i18n-Block zum Absturz gebracht

## [1.3.36] – 2026-04-18
- PowerUp-Sektion: Titel „Mehr Token benötigt?" → „PowerUps gefällig?" (alle 6 Sprachen)
- PowerUp-Sektion: Neues zweispaltiges Layout — Token-Pakete links, Backup Add-on rechts
- Backup Add-on: 5 €/Monat, Checkbox „Zum Plan hinzufügen", orangefarbener Rahmen bei Aktivierung
- Backup Add-on: Bei Aktivierung erhalten alle Plan-Buttons automatisch &addon=backup in der URL
- i18n: Neue Keys pu.token_title, pu.backup_title, pu.backup_desc, pu.backup_hint, pu.backup_add, pu.backup_selected in allen 6 Sprachen

## [1.3.24] – 2026-04-18
- FIX: Security-Sektion: Orange statt Blau als Akzentfarbe, nur 2 Stat-Karten (400+ TBps + &lt;2ms Latenz), 330+ und 13.000+ entfernt

## [1.3.22] – 2026-04-17
- i18n: Vollständige Übersetzung aller 6 Sprachen (DE/EN/FR/IT/ES/PT)
- i18n: 118 übersetzte Elemente auf der gesamten Seite
- i18n: Dropdown-Bug behoben

## [1.3.21] – 2026-04-17
- SEO: AggregateRating 4.9/5 Schema hinzugefügt
- SEO: Sitemap-Datum aktualisiert
- SEO: FAQ-Schema von 5 auf 9 Fragen erweitert
- GEO: llms-full.txt angelegt (vollständige Produktbeschreibung)
- i18n: Sprachauswahl DE/EN/FR/IT/ES/PT mit Flaggen-Dropdown
- i18n: Erkennt automatisch Browsersprache, speichert Auswahl

## [1.3.20] – 2026-04-17
- GEO: llms.txt angelegt (ChatGPT, Claude, Perplexity)
- robots.txt: AI-Crawler explizit erlaubt + llms.txt Referenz

## [1.3.19] – 2026-04-17
- EU-Infrastruktur → Cloudflare EU-Infrastruktur

## [1.3.18] – 2026-04-17
- Tech-Stack anonymisiert: Google Vision/Vertex AI → OptiMatch AI / SuperMatch AI

## [1.3.17] – 2026-04-17
- Light Mode Logo: zurück zu filter invert+hue-rotate

## [1.3.16] – 2026-04-17
- BUGFIX: Light Mode Logo – dunkler Hintergrund statt blauer Filter (CI erhalten)

## [1.3.15] – 2026-04-17
- Light Mode: skipi-Logo in schwarz dargestellt (CSS filter invert+hue-rotate)

## [1.3.14] – 2026-04-17
- NEU: Dark/Light Mode Toggle in der Navigation

## [1.3.13] – 2026-04-17
- UI: Premier-Karte pulsiert als ganzes Feld (orange Glow-Animation)

## [1.3.12] – 2026-04-17
- BUGFIX: Empfohlen-Badge pulsiert jetzt sichtbar (scale+color statt box-shadow)

## [1.3.11] – 2026-04-17
- UI: Alle Serien-Tags orange (nicht nur ausgewählte)
- UI: Empfohlen-Badge pulsiert orange

## [1.3.10] – 2026-04-17
- Pricing: Agency-Banner ebenfalls anklickbar und auswählbar

## [1.3.9] – 2026-04-17
- Pricing: Karten sind anklickbar – Klick markiert Plan mit orangem Rahmen und ändert Button auf orange

## [1.3.8] – 2026-04-17
- Pricing: Agency als Enterprise-Banner unter den 4 Standard-Karten

## [1.3.7] – 2026-04-17
- Pricing: Agency-Plan (199€, 50.000 Token, 20 Seats) ergänzt

## [1.3.6] – 2026-04-16
- Pricing Buttons mit ?plan= Parameter (Checkout-Flow)

## [1.3.5] – 2026-04-16
- Footer: Impressum, Datenschutz (DSGVO/TDDDG-konform)

## [1.3.4] – 2026-04-16
- OG-Bild hinzugefügt (1200x630px)
- Serien: Markennamen zurück (WEC/NLS/GTWC/DTM), orange Tags, Deutsche Bergmeisterschaft ergänzt

## [1.3.3] – 2026-04-16
- Markenrecht: ADAC/WEC/NLS/GTWC/DTM durch neutrale Begriffe ersetzt

## [1.3.2] – 2026-04-16
- Pricing: KI-OCR in allen Plänen, Vertex AI ab Premier, Premium Support Unlimited

## [1.3.1] – 2026-04-16
- Responsive: Tablet (900px) + Mobile (600px), Pricing 4→1 Spalte, Footer, FAQ

## [1.3.0] – 2026-04-16
- SEO: Meta/OG/Twitter/Schema.org, GEO: FAQ-Sektion mit JSON-LD, robots.txt, sitemap.xml

## [1.2.0] – 2026-04-16
- Pricing: echte Pläne (Essentials/Advanced/Premier/Unlimited), Tryout Banner, PowerUp Sektion

## [1.1.6] – 2026-04-16
- Hero: Logo-Höhe auf 240px

## [1.1.0] – 2026-04-16
- Logo: skipi-logo-dark.svg in Nav, Hero und Footer
- Font: Century Gothic, Gewichte 400/900

## [1.3.41] – 2026-04-18
- NEU: Kontaktformular-Modal (Name, E-Mail, Nachricht) mit Resend-Versand an axel@weichert.at
- Worker: /api/contact POST-Endpoint
- i18n: contact.* Keys in DE/EN/FR/IT/ES/PT
- BUGFIX: stat-num Farbe (#fff → var(--text0)) – Zahlen im Light Mode jetzt schwarz statt weiß

## [1.3.48] – 2026-04-19
- Workflow-Sektion: "Event" → eigene Begriffe (Rennen fotografieren, Rennwochenende etc.) in 6 Sprachen
- "Import Lightroom" → "Import ins Bildarchiv" in 6 Sprachen
- "Manuelles Tagging" → "Manuelles Verschlagworten" in 6 Sprachen
- Zeiten: 8–12 Std → 6–10 Std (manuell gesamt), 6–10 Std → 4–6 Std (Tagging-Schritt)
- stat.hours + wf.h2 angepasst in allen 6 Sprachen

## [1.3.50] – 2026-04-19
- NEU: Cloud Native Feature-Card nach Workflow-Sektion
- USP: Keine App, kein Upload, 100 Fotos in unter 2 Minuten, Browser-basiert
- i18n: cn.* Keys in DE/EN/FR/IT/ES/PT

## [1.3.53] – 2026-04-19
- NEU: Cloud Native Sektion nach Workflow – section-label (orange), h2, Untertitel, 5 Feature-Boxen
- Feature-Boxen im gleichen Stil wie Infrastruktur/Security-Kacheln (BSI C5, DSGVO etc.)
- USPs: Keine Installation, Kein Upload, 100 Fotos unter 2 Min, Mac/Win/Linux, Auto-Updates
- i18n: cn.* Keys (label, h2, sub, f1t/d–f5t/d) in DE/EN/FR/IT/ES/PT

## [1.3.52] – 2026-04-19
- Cloud Native: Nur section-label + h2 + Untertitel (ohne Boxen)

## [1.3.51] – 2026-04-19
- Cloud Native: feature-card wide Layout (wird durch v1.3.52 überschrieben)

## [1.3.50] – 2026-04-19
- NEU: Cloud Native Feature-Card nach Workflow-Sektion (erste Version)

## [1.3.49] – 2026-04-19
- Workflow: Import-Bezeichnung → "Import Lightroom / Photo Mechanic / Luminar" in 6 Sprachen

## [1.3.48] – 2026-04-19
- Workflow-Sektion: "Event" → eigene Begriffe (Rennen fotografieren etc.) in 6 Sprachen
- "Import Lightroom" → eigene Bezeichnung in 6 Sprachen
- "Manuelles Tagging" → "Manuelles Verschlagworten" in 6 Sprachen
- Zeiten: 8–12 Std → 6–10 Std (manuell), 6–10 Std → 4–6 Std (Tagging), stat.hours + wf.h2 angepasst

## [1.3.55] – 2026-04-19
- BUGFIX: h2 em – kein Kursiv, gleiche Größe/Gewicht wie Headline (font-style:normal, font-size:inherit)
- CTA: "Bereit für deinen ersten Event mit Skipi?" → "Bereit für dein erstes Rennwochenende mit Skipi?" in 6 Sprachen

## [1.3.56] – 2026-04-19
- BUGFIX: Security-Sektion h2 Inline-Style entfernt – Schriftgröße/Gewicht jetzt identisch mit allen anderen Überschriften

## [1.3.57] – 2026-04-19
- BUGFIX: h1 Safari – line-height 1.0 → 1.05 verhindert Ineinanderlaufen der Zeilen
- h1 -webkit-font-smoothing: antialiased für konsistenteres Safari-Rendering

## [1.3.61] – 2026-04-19
- Century Gothic als Self-Hosted Web-Font eingebunden (centurygothic.ttf + centurygothic_bold.ttf)
- @font-face für Regular (400) und Bold/Black (700-900)
- Font-Stack zurück auf Century Gothic als primärer Font
- Nunito Sans bleibt als Fallback

## [1.3.62] – 2026-04-19
- Font: Adobe Fonts (Typekit) statt Self-Hosting – pvm2dym.css
- Font-Stack: "century-gothic" (Adobe) als primär
- TTF-Dateien aus Repo entfernt – lizenzkonform

## [1.3.65] – 2026-04-19
- NEU: Video-Sektion nach Workflow – Cloudflare Stream Embed
- Label "Kinderleicht", Headline, Subtext, 3 Bullets, Video im Rahmen
- i18n: demo.* Keys in DE/EN/FR/IT/ES/PT

## [1.3.67] – 2026-04-19
- BUGFIX: Demo-Sektion Bullets auf Mobile via .demo-bullets CSS-Klasse korrekt gestapelt
- CHANGELOG nachgepflegt für v1.3.65+66

## [1.3.71] – 2026-04-20
- SEO/GEO: llms.txt aktualisiert – neue Feature-Namen, ADAC GT4, Backup, Demo-URL
- SEO: Schema.org Agency-Plan ergänzt, softwareVersion auf 1.6.188, neue featureList-Einträge
- SEO: Sitemap lastmod auf 2026-04-20 aktualisiert
