
document.addEventListener("DOMContentLoaded", function () {

  // 1. AUTOMATIC COPYRIGHT YEAR
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");

      menuToggle.textContent =
        navMenu.classList.contains("open") ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";
      });
    });
  }

  // 3. BANGLA / ENGLISH LANGUAGE SWITCH
  const languageToggle = document.getElementById("languageToggle");
  let currentLanguage = "en";

  function changeLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang = language;
    document.body.classList.toggle("bn", language === "bn");

    document.querySelectorAll("[data-en][data-bn]").forEach(function (element) {
      element.textContent =
        element.getAttribute("data-" + language);
    });

    languageToggle.textContent =
      language === "en" ? "বাংলা" : "English";

    const search = document.getElementById("learningSearch");

    if (search) {
      search.placeholder = language === "en"
        ? "Search learning topics..."
        : "শেখার বিষয় খুঁজুন...";
    }
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", function () {
      changeLanguage(currentLanguage === "en" ? "bn" : "en");
    });
  }

  // 4. LEARNING JOURNAL SEARCH & CATEGORY FILTER
  const searchInput = document.getElementById("learningSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const learningCards = document.querySelectorAll(".learning-card");
  const emptyState = document.getElementById("emptyState");

  function filterLearning() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    learningCards.forEach(function (card) {
      const cardText = card.textContent.toLowerCase();
      const cardCategory = card.dataset.category;

      const matchesSearch = cardText.includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        cardCategory === selectedCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    emptyState.hidden = visibleCount !== 0;
  }

  if (searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterLearning);
    categoryFilter.addEventListener("change", filterLearning);
  }

  // 5. ACTIVE NAVIGATION LINK
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

});
