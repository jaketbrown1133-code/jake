document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!navToggle || !mobileMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("is-open", !isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      mobileMenu.classList.remove("is-open");
    });
  });

  const quoteForm = document.getElementById("quote-form");
  const formStatus = document.getElementById("form-status");

  if (quoteForm && formStatus) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        formStatus.textContent = "Please fill in the required fields.";
        formStatus.className = "form-status is-error";
        return;
      }

      // TODO: wire this up to a real form backend (e.g. Formspree, Netlify
      // Forms, or a serverless function) before launch. This currently only
      // confirms client-side and does not send the lead anywhere.
      formStatus.textContent = "Thanks! We'll be in touch soon to schedule your consultation.";
      formStatus.className = "form-status is-success";
      quoteForm.reset();
    });
  }
});
