
/* =========================================
   MEHEDI HASAN - PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTS
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const languageToggle = document.getElementById("languageToggle");

  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });

    // Close menu after selecting a navigation link

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    // Close menu with Escape key

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    // Close menu when clicking outside

    document.addEventListener("click", event => {

      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });

  }

  // =====================================
  // BANGLA / ENGLISH LANGUAGE SWITCH
  // =====================================

  let currentLanguage = "en";

  function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    // Change all translated elements

    document.querySelectorAll("[data-en][data-bn]").forEach(element => {

      const content = element.dataset[language];

      if (content !== undefined) {

        element.innerHTML = content;

      }

    });

    // Update language button

    if (languageToggle) {

      languageToggle.textContent =
        language === "en" ? "বাংলা" : "English";

      languageToggle.setAttribute(
        "aria-label",
        language === "en"
          ? "Switch to Bangla"
          : "Switch to English"
      );

    }

    // Save preference

    try {

      localStorage.setItem("portfolioLanguage", language);

    } catch (error) {

      console.warn("Language preference could not be saved.");

    }

  }

  // Language button event

  if (languageToggle) {

    languageToggle.addEventListener("click", () => {

      const newLanguage =
        currentLanguage === "en" ? "bn" : "en";

      changeLanguage(newLanguage);

    });

  }

  // Load saved language

  try {

    const savedLanguage = localStorage.getItem("portfolioLanguage");

    if (savedLanguage === "bn" || savedLanguage === "en") {

      changeLanguage(savedLanguage);

    }

  } catch (error) {

    console.warn("Saved language could not be loaded.");

  }

  // =====================================
  // CURRENT YEAR
  // =====================================

  const currentYear = new Date().getFullYear();

  document.querySelectorAll(".current-year").forEach(element => {

    element.textContent = currentYear;

  });

  // =====================================
  // ACTIVE NAVIGATION ON SCROLL
  // =====================================

  const sections = document.querySelectorAll("main section[id]");

  const navItems = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const sectionId = entry.target.id;

          navItems.forEach(link => {

            const isActive =
              link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);

          });

        }

      });

    }, {

      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0

    });

    sections.forEach(section => {

      observer.observe(section);

    });

  }

});
