/* ---------- Utility & DOM ---------- */
const hambBtn = document.getElementById('hambBtn');
const mainMenu = document.getElementById('mainMenu');
const themeBtn = document.getElementById('themeBtn');
const langSelect = document.getElementById('langSelect');
const onlineCountEl = document.getElementById('onlineCount');
const contactForm = document.getElementById('contactForm');

/* ---------- Hamburger (same style as 'postani dio tima') ---------- */
function toggleMenu() {
  mainMenu.classList.toggle('show');
  hambBtn.classList.toggle('active');
}
hambBtn.addEventListener('click', toggleMenu);
// close menu on outside click for mobile
document.addEventListener('click', (e) => {
  if (!mainMenu.contains(e.target) && !hambBtn.contains(e.target)) {
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
  }
});
// close on resize > desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
  }
});

/* ---------- Theme auto-detect + toggle ---------- */
function applyTheme(pref) {
  if (pref === 'dark') document.documentElement.classList.remove('light');
  else document.documentElement.classList.add('light');
}
const systemPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(systemPref);

themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
});

/* ---------- Language auto-detect + simple translations ---------- */
const i18n = {
  bs: {
    subtitle: 'Partner program — futuristički neon',
    heroTitle: 'Uvijek tu za vas',
    heroLead: 'Kontaktirajte nas putem e-maila, WhatsApp-a ili popunite formu — šaljemo odmah poruku.',
    emailText: 'Pišite nam bilo kada:',
    waText: 'Odgovor obično u roku od par minuta',
    workText: 'Podrška dostupna 24/7',
    fastResponse: 'Brz odgovor u svako doba',
    formTitle: 'Pošaljite poruku',
    sendBtn: 'Pošalji na WhatsApp',
    sendEmail: 'Pošalji mail',
    openWhats: 'Otvori WhatsApp',
    trustedTitle: 'Trusted & Partners',
    trustedNote: 'Prikazani partneri su referentni. Prava partnerstva su moguća samo uz dogovor.'
  },
  en: {
    subtitle: 'Partner program — futuristic neon',
    heroTitle: 'We are here for you',
    heroLead: 'Contact us via email, WhatsApp or fill the form — we will send the message.',
    emailText: 'Write to us anytime:',
    waText: 'Usually replies within minutes',
    workText: 'Support available 24/7',
    fastResponse: 'Quick replies any time',
    formTitle: 'Send a message',
    sendBtn: 'Send via WhatsApp',
    sendEmail: 'Send email',
    openWhats: 'Open WhatsApp',
    trustedTitle: 'Trusted & Partners',
    trustedNote: 'Displayed partners are references. Real partnerships only on agreement.'
  },
  de: {
    subtitle: 'Partnerprogramm — futuristisches Neon',
    heroTitle: 'Wir sind für Sie da',
    heroLead: 'Kontaktieren Sie uns per E-Mail, WhatsApp oder Formular — wir senden die Nachricht.',
    emailText: 'Schreiben Sie uns jederzeit:',
    waText: 'Antwort meist innerhalb von Minuten',
    workText: 'Support 24/7 verfügbar',
    fastResponse: 'Schnelle Antworten jederzeit',
    formTitle: 'Nachricht senden',
    sendBtn: 'Per WhatsApp senden',
    sendEmail: 'E-Mail senden',
    openWhats: 'WhatsApp öffnen',
    trustedTitle: 'Trusted & Partners',
    trustedNote: 'Angezeigte Partner sind Referenzen. Echte Partnerschaften nur nach Vereinbarung.'
  }
};

function setLanguage(lang) {
  // fill elements that have data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  langSelect.value = lang;
}

// Try auto-detect browser language (user requested "oba autodetect")
const browserLang = (navigator.language || navigator.userLanguage || 'bs').slice(0,2);
if (['bs','en','de'].includes(browserLang)) setLanguage(browserLang); else setLanguage('bs');

langSelect.addEventListener('change', (e)=> setLanguage(e.target.value));

/* ---------- Online counter 10.000 - 13.450 (updates every 5s) ---------- */
function updateOnline() {
  const min = 10000, max = 13450;
  const num = Math.floor(Math.random()*(max-min+1))+min;
  onlineCountEl.textContent = num.toLocaleString('de-DE');
}
updateOnline();
setInterval(updateOnline, 5000);

/* ---------- CONTACT FORM -> opens WhatsApp with prefilled text ---------- */
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) return alert('Molimo unesite ime i poruku.');

  // encode and open wa link
  const phone = '4915755749502';
  const text = `Ime: ${name}\nEmail: ${email || 'Nije naveden'}\nPoruka: ${message}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});

/* ---------- Accessibility: close menu with Escape ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
  }
});
