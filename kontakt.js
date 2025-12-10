// Hamburger toggle (right side)
const hambBtn = document.getElementById('hambBtn');
const mainMenu = document.getElementById('mainMenu');

hambBtn.addEventListener('click', ()=> {
  mainMenu.classList.toggle('show');
  hambBtn.classList.toggle('active');
  if(mainMenu.classList.contains('show')){
    setTimeout(()=>document.addEventListener('click', outsideClick), 60);
  } else {
    document.removeEventListener('click', outsideClick);
  }
});

function outsideClick(e){
  if(!mainMenu.contains(e.target) && !hambBtn.contains(e.target)){
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
    document.removeEventListener('click', outsideClick);
  }
}

// Theme toggle (day/night)
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// Language (only labels changed client-side)
const langSelect = document.getElementById('langSelect');
const texts = {
  bs: {
    kicker: 'Kontakt & Podrška',
    title: 'Uvijek tu za tebe — piši, zovi ili pošalji poruku',
    help: 'Klikom na "Pošalji poruku" otvorit će se WhatsApp s popunjenim tekstom.',
    formTitle: 'Pošalji poruku — otvori WhatsApp'
  },
  en: {
    kicker: 'Contact & Support',
    title: 'We are here for you — write, call or send a message',
    help: 'Click "Send message" to open WhatsApp with a prefilled message.',
    formTitle: 'Send message — open WhatsApp'
  },
  de: {
    kicker: 'Kontakt & Support',
    title: 'Wir sind für dich da — schreiben, anrufen oder Nachricht senden',
    help: 'Klicke "Nachricht senden", um WhatsApp mit einer vorausgefüllten Nachricht zu öffnen.',
    formTitle: 'Nachricht senden — WhatsApp öffnen'
  }
};

langSelect.addEventListener('change', ()=>{
  const v = langSelect.value;
  document.querySelector('.kicker').textContent = texts[v].kicker;
  document.querySelector('.hero-left h2').textContent = texts[v].title;
  document.querySelector('.help').textContent = texts[v].help;
  document.querySelector('.form-panel h3').textContent = texts[v].formTitle;
});

// Online counter (10.000 - 13.450)
function updateOnline(){
  const n = Math.floor(10000 + Math.random()*3450);
  document.getElementById('onlineCount').textContent = n.toLocaleString();
}
setInterval(updateOnline, 5000);
updateOnline();

// Contact form opening WhatsApp
document.getElementById('sendWa').addEventListener('click', ()=>{
  const name = document.getElementById('cf_name').value.trim();
  const email = document.getElementById('cf_email').value.trim();
  const tel = document.getElementById('cf_tel').value.trim();
  const msg = document.getElementById('cf_msg').value.trim();

  if(!name || !email || !msg){
    alert('Popuni ime, email i poruku.');
    return;
  }

  const phone = '4915755749502'; // broj bez + i razmaka
  // Encode message - include user fields
  let text = `🔔 Novi kontakt sa sajta%0A%0AIme: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}`;
  if(tel) text += `%0ATel: ${encodeURIComponent(tel)}`;
  text += `%0A%0APoruka:%0A${encodeURIComponent(msg)}`;

  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, '_blank');
});

// Accessibility: close menu on resize to desktop
window.addEventListener('resize', ()=>{
  if(window.innerWidth > 880){
    mainMenu.classList.remove('show');
    hambBtn.classList.remove('active');
    document.removeEventListener('click', outsideClick);
  }
});
