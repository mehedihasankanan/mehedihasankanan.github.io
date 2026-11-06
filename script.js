
// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// =====================================
// BANGLA / ENGLISH LANGUAGE SWITCH
// =====================================

const languageToggle = document.getElementById("languageToggle");

let currentLanguage = "en";

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-en][data-bn]").forEach(element => {
    const content = element.dataset[language];

    if (content) {
      element.innerHTML = content;
    }
  });

  languageToggle.textContent =
    language === "en" ? "বাংলা" : "English";

  localStorage.setItem("portfolioLanguage", language);
}

languageToggle.addEventListener("click", () => {
  const newLanguage = currentLanguage === "en" ? "bn" : "en";
  changeLanguage(newLanguage);
});


// =====================================
// LOAD SAVED LANGUAGE PREFERENCE
// =====================================

const savedLanguage = localStorage.getItem("portfolioLanguage");

if (savedLanguage === "bn" || savedLanguage === "en") {
  changeLanguage(savedLanguage);
}


// =====================================
// CURRENT YEAR
// =====================================

const year = new Date().getFullYear();

document.querySelectorAll(".current-year").forEach(element => {
  element.textContent = year;
});
