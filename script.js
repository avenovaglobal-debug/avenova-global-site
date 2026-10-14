// Avenova Global starter site interactions.
// Replace the placeholder recipient below with an inbox you control before launch.
const CONTACT_EMAIL = "REPLACE_WITH_YOUR_EMAIL@example.com";
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
const form = document.querySelector("#contact-form");
const message = document.querySelector("#form-message");
if (form) form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (CONTACT_EMAIL.includes("REPLACE_WITH_YOUR_EMAIL")) {
    message.textContent = "Setup needed: replace the placeholder email in script.js with your real contact address, then test the form again.";
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent("Avenova Global project enquiry — " + data.get("project"));
  const body = encodeURIComponent("Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\nProject type: " + data.get("project") + "\n\nProject details:\n" + data.get("details"));
  message.textContent = "Opening your email app with a prepared enquiry. Please send the draft to complete your enquiry.";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});