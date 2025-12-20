/* ======================
   HAMBURGER MENU
   ====================== */
function toggleMenu() {
  const nav = document.getElementById("overlayNav");
  nav.classList.add("open");
  nav.setAttribute("aria-hidden", "false");
}

function closeNav() {
  const nav = document.getElementById("overlayNav");
  nav.classList.remove("open");
  nav.setAttribute("aria-hidden", "true");
}

/* ======================
   WHATSAPP FORMA
   ====================== */
const form = document.getElementById("waForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ime = document.getElementById("ime").value;
    const email = document.getElementById("email").value;
    const poruka = document.getElementById("poruka").value;

    const broj = "4915755749502";

    const tekst =
      `👤 Ime: ${ime}\n` +
      `📧 Email: ${email}\n` +
      `💬 Poruka:\n${poruka}`;

    const url =
      "https://wa.me/" + broj + "?text=" + encodeURIComponent(tekst);

    window.open(url, "_blank");
  });
}
