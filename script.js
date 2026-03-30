// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });

  // Close menu when clicking a link (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("nav-open");
    }
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Enhanced form handler: generate a mailto link with the form values
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect field values
    const name = document.getElementById("name")?.value || "";
    const business = document.getElementById("business")?.value || "";
    const emailInput = document.getElementById("email")?.value || "";
    const platform = document.getElementById("platform")?.value || "";
    const message = document.getElementById("message")?.value || "";

    // Collect selected extras
    const extrasElems = contactForm.querySelectorAll('input[name="extras"]:checked');
    const extras = Array.from(extrasElems)
      .map((el) => {
        // Try to use the label text next to the checkbox; fallback to value
        const parentLabel = el.parentElement;
        if (parentLabel) {
          return parentLabel.textContent.trim();
        }
        return el.value;
      })
      .filter(Boolean);

    // Build the email body with proper line breaks
    let bodyParts = [];
    if (name) bodyParts.push(`Name: ${name}`);
    if (business) bodyParts.push(`Business: ${business}`);
    if (emailInput) bodyParts.push(`Email: ${emailInput}`);
    if (platform) bodyParts.push(`Platform: ${platform}`);
    if (message) bodyParts.push(`Message: ${message}`);
    if (extras.length) bodyParts.push(`Extras: ${extras.join(", ")}`);

    const body = encodeURIComponent(bodyParts.join("\n"));
    const subject = encodeURIComponent("New Client Inquiry");

    // Compose the mailto URL
    const mailtoLink = `mailto:coretracedevs@gmail.com?subject=${subject}&body=${body}`;

    // Redirect to the mailto link to open the user's default email client
    window.location.href = mailtoLink;
  });
}

// Pricing plan buttons: auto-scroll to contact form and pre-fill the message textarea
const pricingButtons = document.querySelectorAll("#pricing .pricing-card a.btn");
pricingButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // When clicking the pricing button, prevent default anchor jump
    e.preventDefault();

    const packageName = btn.getAttribute("data-package");
    if (packageName) {
      const messageField = document.getElementById("message");
      if (messageField) {
        // Pre-fill the "What do you want to improve?" textarea
        messageField.value = packageName;
      }
    }

    // Smoothly scroll to the contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});