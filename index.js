
/* =========================================
   VORVENA - MAIN JAVASCRIPT
   Shared frontend functionality
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. LOADING SCREEN
  ===================================== */

  const intro = document.getElementById("intro");

  function hideIntro() {
    if (intro) {
      intro.classList.add("hide");
    }
  }

  if (intro) {
    if (document.readyState === "complete") {
      setTimeout(hideIntro, 500);
    } else {
      window.addEventListener("load", () => {
        setTimeout(hideIntro, 500);
      }, { once: true });
    }

    // Prevent the loading screen from staying forever.
    setTimeout(hideIntro, 5000);
  }


  /* =====================================
     2. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");

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

    // Close menu after clicking a link.
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside.
    document.addEventListener("click", event => {

      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });

    // Close menu with Escape.
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when returning to desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

  }


  /* =====================================
     3. SMOOTH PAGE SECTION NAVIGATION
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",

        block: "start"
      });

      // Update the URL hash without reloading.
      history.replaceState(null, "", targetId);

    });

  });


  /* =====================================
     4. SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =====================================
     5. CURRENT COPYRIGHT YEAR
  ===================================== */

  const copyrightYear = document.getElementById("copyrightYear");

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }


  /* =====================================
     6. ACTIVE NAVIGATION LINK
  ===================================== */

  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  document.querySelectorAll(".nav-links a[href]").forEach(link => {

    const linkUrl = new URL(link.href, window.location.href);

    const linkPage = linkUrl.pathname
      .split("/")
      .pop()
      .toLowerCase();

    if (
      linkPage &&
      linkPage === currentPage &&
      !link.hash
    ) {
      link.classList.add("active-page");
    }

  });


  /* =====================================
     7. CROSS-PAGE NAVIGATION HELPERS
  ===================================== */

  window.VORVENA = window.VORVENA || {};

  window.VORVENA.navigate = function (page) {

    if (typeof page !== "string" || !page.trim()) {
      console.error("VORVENA: A valid page name is required.");
      return;
    }

    // Prevent unsafe external or script URLs.
    if (
      page.includes("://") ||
      page.startsWith("//") ||
      page.toLowerCase().startsWith("javascript:")
    ) {
      console.error("VORVENA: Invalid internal page destination.");
      return;
    }

    window.location.href = page;

  };


  /* =====================================
     8. ROLE-BASED PAGE NAVIGATION
  ===================================== */

  window.VORVENA.openSignup = function (role) {

    const signupPages = {
      client: "client-signup.html",
      professional: "professional-signup.html"
    };

    if (!signupPages[role]) {
      console.error("VORVENA: Invalid signup role.");
      return;
    }

    window.location.href = signupPages[role];

  };


  /* =====================================
     9. LOGIN NAVIGATION
  ===================================== */

  window.VORVENA.openLogin = function () {
    window.location.href = "login.html";
  };


  /* =====================================
     10. WHATSAPP COMMUNITY LINK
  ===================================== */

  const whatsappLink = document.querySelector(
    ".vorvena-community-link"
  );

  if (whatsappLink) {
    whatsappLink.setAttribute("target", "_blank");
    whatsappLink.setAttribute("rel", "noopener noreferrer");
  }


  /* =====================================
     11. BACK TO TOP
  ===================================== */

  document.querySelectorAll('a[href="#home"]').forEach(link => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  /* =====================================
     12. IMAGE FALLBACK
  ===================================== */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {
      image.classList.add("image-load-error");
    });

  });


  /* =====================================
     13. INITIALIZATION
  ===================================== */

  console.log("VORVENA frontend initialized.");

});
