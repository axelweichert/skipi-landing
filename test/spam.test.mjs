// Inhaltsprüfung der Formulare (OWL-2559): die echte Werbung vom 18.11.2026 muss aussortiert werden, echte Anfragen nie.
import test from 'node:test';
import assert from 'node:assert/strict';
import { pruefen } from '../src/spam.mjs';

const WERBUNG_18_11 = {
  kurz: ['Mayra Nord', '�� Own Your Own Branded AI Software Business Today (70% OFF)'],
  lang: ['Hello! �� Ready for a profitable, ready-to-launch digital business opportunity? Turn high-demand AI technology into your own recurring revenue stream! With our White-Label SaaS Reseller Program, you unlock a powerful AI Chatbot, WhatsApp CRM, and Social Media Automation platform ready to sell under your own brand, logo, and domain. Why is this a game-changer for business owners? ✔ **100% Yours:** Set your own packages and keep all your revenue (no commissions). ✅ **Instant Setup:** Live in under 15 minutes with zero coding required. **Monthly Plan:** Just **$29.99/mo** (Regularly $99.99) Lock in your 70% discount and start your AI business today: https://planifyx.com/reseller-program/aff/998/ Best regards!'],
};

const SPAM = [
  ['Werbung vom 18.11.2026', WERBUNG_18_11],
  ['SEO-Angebot ohne Link', { kurz: ['John Smith', 'Your website'], lang: ['Hi, I checked weichert.at and noticed it is not on the first page of Google. We offer SEO and backlinks to improve your Google rankings and website traffic. Reply for our price list. To opt-out reply STOP.'] }],
  ['Krypto mit Kurzlink', { kurz: ['Anna', 'Investment'], lang: ['Earn passive income with Bitcoin, sign up now: https://bit.ly/3xyz'] }],
  ['Kyrillisch mit Link', { kurz: ['Иван'], lang: ['Здравствуйте! Предлагаем продвижение вашего сайта в поисковых системах, подробности на сайте https://prodvizhenie.ru/offer'] }],
  ['Link im Namen', { kurz: ['Best Casino https://win-big.top', ''], lang: ['Play now at https://win-big.top and get a free trial bonus'] }],
];
const ECHT = [
  ['Team mit Website', { kurz: ['Max Mustermann', 'Anfrage DTM Nürburgring'], lang: ['Hallo Herr Weichert, wir sind das Team Muster Racing (www.muster-racing.de) und suchen für das DTM-Wochenende am Nürburgring einen Fotografen. Was würde ein Wochenende kosten? Viele Grüße'] }],
  ['Englische Buchungsanfrage', { kurz: ['Sarah Miller', 'Photo shoot Spa'], lang: ['Hello Axel, we would like to book you for our team at the 24h of Spa. Could you send us a quote for the whole weekend? You can see our car on instagram.com/millerracing. Best, Sarah'] }],
  ['Hochzeit', { kurz: ['Lena Schmidt', 'Hochzeit im Juni'], lang: ['Guten Tag, wir heiraten am 14.06.2027 in Bielefeld und hätten gern ein Angebot für eine Reportage über 8 Stunden. Unser Budget liegt bei etwa 1.800 €. Sind Sie an dem Termin frei?'] }],
  ['Kalender', { kurz: ['Peter', 'Wandkalender'], lang: ['Gibt es den Kalender 2027 schon? Preis? Ich bräuchte 3 Stück, gern per Rechnung an peter@firma-xy.de.'] }],
  ['Buchung ohne Nachricht', { kurz: ['Tim Berger', 'tim@example.com', '+49 171 1234567'], lang: [] }],
  ['Emojis im Text', { kurz: ['Jule'], lang: ['Mega Bilder vom Wochenende 😍😍 Kann man die auch als Poster bestellen? 🙏'] }],
];

for (const [name, texte] of SPAM) test(`aussortiert: ${name}`, () => { const r = pruefen(texte); assert.equal(r.stufe, 'spam', JSON.stringify(r)); });
for (const [name, texte] of ECHT) test(`zugestellt: ${name}`, () => { const r = pruefen(texte); assert.equal(r.stufe, 'ok', JSON.stringify(r)); });
test('Gründe sind lesbar', () => { const r = pruefen(WERBUNG_18_11); assert.ok(r.gruende.length >= 3 && r.gruende.every((g) => typeof g === 'string')); });
