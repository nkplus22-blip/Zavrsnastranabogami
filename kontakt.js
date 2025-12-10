function toggleMenu() {
  document.getElementById("mainMenu").classList.toggle("show");
}

// WhatsApp Form
document.getElementById("waForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let ime = document.getElementById("ime").value;
  let email = document.getElementById("email").value;
  let poruka = document.getElementById("poruka").value;

  let broj = "4915755749502";

  let tekst =
    `👤 Ime: ${ime}%0A` +
    `📧 Email: ${email}%0A` +
    `💬 Poruka:%0A${poruka}`;

  window.open(`https://wa.me/${broj}?text=${tekst}`, "_blank");
});
