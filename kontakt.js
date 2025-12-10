/* ====== Hamburger (top-right) ====== */
const hambBtn = document.getElementById('hambBtn');
const mainMenu = document.getElementById('mainMenu');

hambBtn.addEventListener('click', ()=>{
  mainMenu.classList.toggle('show');
  hambBtn.classList.toggle('active');
  hambBtn.setAttribute('aria-expanded', hambBtn.classList.contains('active'));
});

// Close nav on outside click (mobile)
document.addEventListener('click', (e)=>{
  if(!mainMenu.contains(e.target) && !hambBtn.contains(e.target) && mainMenu.classList.contains('show')){
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
  }
});

/* ====== Theme: autodetect + toggle ====== */
const themeBtn = document.getElementById('themeBtn');
function applyInitialTheme(){
  const saved = localStorage.getItem('yf_theme');
  if(saved) {
    if(saved === 'light') document.body.classList.add('light');
    return;
  }
  // autodetect
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if(prefersLight) document.body.classList.add('light');
}
applyInitialTheme();

themeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  localStorage.setItem('yf_theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

/* ====== Contact form -> opens WhatsApp with filled text ====== */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('fullName').value.trim() || 'Anonim');
  const phone = encodeURIComponent(document.getElementById('phone').value.trim() || '');
  const email = encodeURIComponent(document.getElementById('email').value.trim() || '');
  const msg = encodeURIComponent(document.getElementById('message').value.trim());

  const text = `👤 Ime: ${name}%0A📞 Telefon: ${phone}%0A📧 Email: ${email}%0A%0A💬 Poruka:%0A${msg}`;
  const waNumber = '4915755749502';
  const url = `https://wa.me/${waNumber}?text=${text}`;

  window.open(url, '_blank');
});

/* clear form button */
document.getElementById('clearForm').addEventListener('click', ()=>{
  contactForm.reset();
});

/* ====== Trusted partners (13 default, editable) ====== */
const defaultPartners = [
  "ServerOne IPTV",
  "StreamMasters",
  "Nebula Streams",
  "BlueWave IPTV",
  "MegaChannels",
  "UltraStream Pro",
  "CityStream Hub",
  "PrimeMedia Server",
  "OptiStream Network",
  "Skyline IPTV",
  "RapidCast Services",
  "VividChannels",
  "GlobalStream X"
];

const partnersGrid = document.getElementById('partnersGrid');

function renderPartners(list){
  partnersGrid.innerHTML = '';
  list.forEach((p, i)=>{
    const card = document.createElement('div');
    card.className = 'partner-card';
    // show verified badge for all (pulse) — you can change logic
    card.innerHTML = `<div class="partner-name">${escapeHtml(p)}</div><div class="verified-badge"><span class="verified-icon" aria-hidden="true"></span><span style="font-size:12px;color:var(--muted)">Verified</span></div>`;
    partnersGrid.appendChild(card);
  });
}

// escape utility to avoid injection if user pastes HTML
function escapeHtml(unsafe){
  return unsafe.replace(/[&<"'>]/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]); });
}

// initial render (either from storage or default)
function loadPartners(){
  const saved = localStorage.getItem('yf_partners');
  if(saved){
    try{
      const arr = JSON.parse(saved);
      if(Array.isArray(arr) && arr.length) { renderPartners(arr); return; }
    }catch(e){}
  }
  renderPartners(defaultPartners);
}
loadPartners();

// edit partners button (prompts comma-separated list)
document.getElementById('editPartnersBtn').addEventListener('click', ()=>{
  const current = localStorage.getItem('yf_partners') || JSON.stringify(defaultPartners);
  let txt = prompt('Unesite partnere odvojene zarezom (max 30). Npr: Partner A, Partner B, Partner C', JSON.parse(current).join(', '));
  if(txt === null) return;
  const arr = txt.split(',').map(s=>s.trim()).filter(Boolean).slice(0,30);
  if(arr.length === 0){ alert('Niste unijeli nijedan partner.'); return; }
  localStorage.setItem('yf_partners', JSON.stringify(arr));
  renderPartners(arr);
});

/* ====== Prevent large top blank (ensure body margin zero) ====== */
window.addEventListener('load', ()=>{ document.body.style.marginTop = '0';});

/* ====== Accessibility: close nav with ESC ====== */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && mainMenu.classList.contains('show')){
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
  }
});
