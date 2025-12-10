/* HAMBURGER */
function toggleMenu() {
  document.getElementById("mainMenu").classList.toggle("show-menu");
}

/* DAY/NIGHT */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* ONLINE FAKE BROJAČ — 10.000 do 13.450 */
function onlineCounter() {
  let count = Math.floor(10000 + Math.random() * 3450);
  document.getElementById("onlineCount").innerText = count.toLocaleString("de-DE");
}
setInterval(onlineCounter, 5000);
onlineCounter();

/* MULTI LANGUAGE */
const translations = {
  bs: {
    commentsTitle: "Komentari naših korisnika",
    leaveComment: "Ostavi komentar",
    userComments: "Komentari korisnika"
  },
  en: {
    commentsTitle: "User Reviews",
    leaveComment: "Leave a Comment",
    userComments: "User Comments"
  },
  de: {
    commentsTitle: "Benutzerkommentare",
    leaveComment: "Kommentar hinterlassen",
    userComments: "Kommentare"
  }
};

function changeLanguage() {
  let lang = document.getElementById("languageSelect").value;
  document.querySelectorAll("[data-text]").forEach(el => {
    let key = el.dataset.text;
    el.textContent = translations[lang][key];
  });
}

/* FAKE KOMENTARI */
const fakeNames = [
  "Haris","Amir","Nikola","Filip","Anes","Marko","Armin","Stefan","Alem",
  "Kenan","Jovan","Luka","Boris","Dino","Eldin","Mario","Petar",
  "Vanja","Tarik","Mitar","Milan","Nermin","Davor","Emir","Aleksandar"
];

const fakeCities = [
  "Sarajevo","Zagreb","Beograd","Tuzla","Split","Podgorica","Novi Sad",
  "Zenica","Mostar","Rijeka","Niš","Skoplje","Kragujevac"
];

const fakeMessages = [
  "Top usluga, radi brutalno!",
  "Preporučujem svima, odlična slika.",
  "Brza aktivacija i sve stabilno.",
  "Podrška odlična, sve riješeno odmah.",
  "Kvalitet slike brutalno dobar.",
  "Nijednog prekida do sada!",
  "Savršen izbor kanala!",
  "Cijena top, kvalitet još bolji!",
  "Bolje od kablovske!",
  "Radi i na sporijem internetu!"
];

function generateFakeComments() {
  const used = new Set();

  for (let i = 0; i < 25; i++) {
    let idx;
    do { idx = Math.floor(Math.random() * fakeNames.length); }
    while (used.has(idx));
    used.add(idx);

    let name = fakeNames[idx];
    let city = fakeCities[Math.floor(Math.random() * fakeCities.length)];
    let msg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
    let avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`;

    displayComment(name, city, msg, avatar);
  }
}

/* DISPLAY COMMENT */
function displayComment(name, location, msg, avatar) {
  const box = document.getElementById("commentsArea");

  const div = document.createElement("div");
  div.classList.add("comment-card");

  div.innerHTML = `
    <img src="${avatar}" class="avatar">
    <strong>${name} (${location})</strong><br>${msg}
  `;

  box.prepend(div);
}

/* LOAD */
window.onload = function () {
  generateFakeComments();

  const saved = JSON.parse(localStorage.getItem("comments")) || [];
  saved.forEach(c => displayComment(c.name, c.location, c.message, c.avatar));
};

/* SPAM PROTECT */
let lastSubmit = 0;

/* ADD COMMENT */
function addComment(e) {
  e.preventDefault();

  if (Date.now() - lastSubmit < 4000) {
    document.getElementById("spamWarning").style.display = "block";
    return;
  }
  document.getElementById("spamWarning").style.display = "none";
  lastSubmit = Date.now();

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const message = document.getElementById("message").value;
  const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`;

  displayComment(name, location, message, avatar);

  const saved = JSON.parse(localStorage.getItem("comments")) || [];
  saved.unshift({ name, location, message, avatar });
  localStorage.setItem("comments", JSON.stringify(saved));

  document.getElementById("commentForm").reset();
}
