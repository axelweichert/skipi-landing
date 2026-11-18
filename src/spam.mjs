// Inhaltsprüfung für Formularnachrichten (OWL-2559). Anlass: Am 18.11.2026 kam Werbung („White-Label SaaS Reseller Program“, Partnerlink)
// über das Kontaktformular an – abgeschickt von einem ferngesteuerten echten Browser, der Honigfeld und Mindestzeit besteht.
// Die Prüfung zählt Merkmale von Werbung. Ein Link allein reicht nie: Kunden nennen ihre Team-Seite oder ihr Instagram.
//   ab VERDACHT Punkten → wird zugestellt, Betreff beginnt mit „Spamverdacht“
//   ab SPAM Punkten     → wird nicht zugestellt, sondern 30 Tage im Admin unter „Aussortierte Nachrichten“ aufbewahrt
export const VERDACHT = 3;
export const SPAM = 5;

const MAIL = /[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}/gi;
const LINK = /(?:https?:\/\/|www\.)[^\s<>"')]+|\b[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.(?:com|net|org|io|co|ru|cn|xyz|top|biz|info|online|site|shop|app|ai|link|click|store|pro|vip|live|me|ly|de|at|ch|eu)\b(?:\/[^\s<>"')]*)?/gi;
const PARTNERLINK = /\/aff(?:iliate)?\/|[?&](?:ref|aff|affiliate|utm_[a-z]+|partner|coupon)=|\b(?:bit\.ly|tinyurl\.com|t\.me|wa\.me|cutt\.ly|rb\.gy|is\.gd|goo\.gl)\b/i;
// Werbesprache, wie sie in Formular-Spam vorkommt (Englisch, Deutsch). Bewusst keine Alltagswörter wie „Angebot“ oder „Preis“.
const WERBUNG = [
  /\b\d{1,3}\s?% ?(?:off|rabatt|discount)\b/i, /\bdiscount\b/i, /\bflash (?:deal|sale)\b/i, /\blimited[- ]time\b/i, /\bspecial offer\b/i,
  /\bwhite[- ]label\b/i, /\breseller\b/i, /\baffiliate\b/i, /\brecurring revenue\b/i, /\bpassive income\b/i, /\bpure profit\b/i, /\bno commissions?\b/i,
  /\bbusiness opportunity\b/i, /\bgame[- ]changer\b/i, /\bzero coding\b/i, /\bsaas\b/i, /\bchatbot\b/i, /\bwhatsapp crm\b/i, /\bautomation platform\b/i,
  /\bseo\b/i, /\bbacklinks?\b/i, /\b(?:google )?rankings?\b/i, /\bfirst page of google\b/i, /\bwebsite traffic\b/i, /\borganic traffic\b/i, /\blead generation\b/i, /\bgenerate (?:more )?leads\b/i,
  /\bguest post\b/i, /\blink building\b/i, /\bdomain authority\b/i, /\bweb ?design services?\b/i, /\bredesign your (?:web)?site\b/i, /\bvirtual assistant\b/i,
  /\bcrypto(?:currency)?\b/i, /\bbitcoin\b/i, /\bforex\b/i, /\bcasino\b/i, /\bbetting\b/i, /\binvestment opportunity\b/i, /\bloans?\b.{0,40}\b(?:approval|rate)\b/i,
  /\bunsubscribe\b/i, /\bopt[- ]out\b/i, /\bclick here\b/i, /\bact now\b/i, /\bsign up (?:now|today)\b/i, /\bfree trial\b/i, /\bper month\b|\/mo\b/i, /\bmoney[- ]back\b/i,
  /\bviagra\b/i, /\bcialis\b/i, /\bpharmacy\b/i, /\bescort\b/i, /\bporn\b/i, /\bxxx\b/i,
  /\bsuchmaschinenoptimierung\b/i, /\bbesucherzahlen steigern\b/i, /\bmehr kunden gewinnen\b/i, /\bkostenlose analyse ihrer (?:web)?seite\b/i, /\bkredit ohne schufa\b/i,
];
const PREIS = /(?:[$£]\s?\d|\b\d+(?:[.,]\d{2})?\s?(?:usd|\$)\b)/i;
const BILDZEICHEN = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}�]/gu;
const FREMDSCHRIFT = /[Ѐ-ӿ一-鿿぀-ヿ؀-ۿ฀-๿가-힯]/g;

/**
 * @param {{kurz: string[], lang: string[]}} texte kurz = einzeilige Felder (Name, Betreff …), lang = Nachrichtenfelder
 * @returns {{punkte: number, gruende: string[], stufe: 'ok'|'verdacht'|'spam'}}
 */
export function pruefen({ kurz = [], lang = [] }) {
  const gruende = [];
  let punkte = 0;
  const plus = (n, grund) => { punkte += n; gruende.push(grund); };
  const ohneMail = (s) => String(s || '').replace(MAIL, ' ');
  const alles = [...kurz, ...lang].map(ohneMail).join('\n');
  const links = alles.match(LINK) || [];
  const linksKurz = kurz.map(ohneMail).join('\n').match(LINK) || [];

  if (linksKurz.length) plus(2, 'Link in einem einzeiligen Feld');
  if (links.length >= 3) plus(3, `${links.length} Links`);
  else if (links.length) plus(2, links.length === 1 ? 'Link in der Nachricht' : '2 Links');
  if (PARTNERLINK.test(alles)) plus(3, 'Partner- oder Kurzlink');
  const treffer = WERBUNG.filter((r) => r.test(alles)).length;
  if (treffer) plus(Math.min(treffer, 4), `Werbesprache (${treffer} Merkmale)`);
  if (PREIS.test(alles)) plus(1, 'Preisangabe in Dollar');
  if (/\*\*[^*\n]{2,60}\*\*/.test(alles) || (alles.match(BILDZEICHEN) || []).length >= 4) plus(1, 'Werbeformatierung (Sternchen, viele Bildzeichen)');
  const buchstaben = alles.replace(/[^\p{L}]/gu, '').length;
  if (buchstaben >= 20 && (alles.match(FREMDSCHRIFT) || []).length / buchstaben > 0.3) plus(3, 'überwiegend nicht-lateinische Schrift');

  return { punkte, gruende, stufe: punkte >= SPAM ? 'spam' : punkte >= VERDACHT ? 'verdacht' : 'ok' };
}
