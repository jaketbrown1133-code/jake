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
    const submitButton = quoteForm.querySelector("button[type=submit]");

    quoteForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        formStatus.textContent = "Please fill in the required fields.";
        formStatus.className = "form-status is-error";
        return;
      }

      submitButton.disabled = true;
      formStatus.textContent = "Sending…";
      formStatus.className = "form-status";

      try {
        const response = await fetch(quoteForm.action, {
          method: "POST",
          body: new FormData(quoteForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          formStatus.textContent = "Thanks! We'll be in touch soon to schedule your consultation.";
          formStatus.className = "form-status is-success";
          quoteForm.reset();
        } else {
          formStatus.textContent = "Something went wrong. Please call us at (845) 566-4000 or try again.";
          formStatus.className = "form-status is-error";
        }
      } catch (err) {
        formStatus.textContent = "Something went wrong. Please call us at (845) 566-4000 or try again.";
        formStatus.className = "form-status is-error";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
});
