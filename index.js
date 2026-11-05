
/* =========================================
   VORVENA - MAIN JAVASCRIPT
   Shared frontend functionality
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  window.VORVENA = window.VORVENA || {};

  /* =====================================
     1. LOADING SCREEN
  ===================================== */

  const intro = document.getElementById("intro");

  function hideIntro() {
    if (intro) intro.classList.add("hide");
  }

  if (intro) {
    if (document.readyState === "complete") {
      setTimeout(hideIntro, 500);
    } else {
      window.addEventListener("load", () => {
        setTimeout(hideIntro, 500);
      }, { once: true });
    }

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

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        closeAccountDropdown();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }


  /* =====================================
     3. ACCOUNT DROPDOWN STYLES
  ===================================== */

  const accountStyles = document.createElement("style");

  accountStyles.textContent = `
    .vorvena-account {
      position: relative;
      display: flex;
      align-items: center;
    }

    .vorvena-account-toggle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      background: #102b52;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 15px;
      font-weight: 700;
      transition: 0.25s ease;
    }

    .vorvena-account-toggle:hover {
      background: #17447b;
      transform: translateY(-2px);
    }

    .vorvena-account-dropdown {
      position: absolute;
      top: calc(100% + 14px);
      right: 0;
      width: 210px;
      padding: 8px;
      background: #ffffff;
      border: 1px solid #e8edf4;
      border-radius: 12px;
      box-shadow: 0 12px 35px rgba(0,0,0,0.13);
      display: none;
      z-index: 9999;
    }

    .vorvena-account-dropdown.show {
      display: block;
      animation: vorvenaDropdown 0.2s ease;
    }

    @keyframes vorvenaDropdown {
      from {
        opacity: 0;
        transform: translateY(-7px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .vorvena-account-dropdown a,
    .vorvena-account-dropdown button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #172b4d;
      text-decoration: none;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
      transition: 0.2s ease;
    }

    .vorvena-account-dropdown a:hover,
    .vorvena-account-dropdown button:hover {
      background: #f1f5fb;
      color: #1769d2;
    }

    .vorvena-account-dropdown .vorvena-logout {
      color: #d14343;
    }

    .vorvena-account-dropdown .vorvena-logout:hover {
      background: #fff1f1;
      color: #c62828;
    }

    .vorvena-account-dropdown i {
      width: 17px;
      text-align: center;
    }

    .vorvena-account-divider {
      height: 1px;
      background: #edf0f4;
      margin: 5px 4px;
    }

    @media (max-width: 768px) {
      .vorvena-account {
        width: 100%;
        justify-content: flex-start;
      }

      .vorvena-account-dropdown {
        top: 50px;
        left: 0;
        right: auto;
      }
    }
  `;

  document.head.appendChild(accountStyles);


  /* =====================================
     4. LOGIN STATE & PROFILE DROPDOWN
  ===================================== */

  const loginLink = navLinks?.querySelector(".login-link");
  const signupLink = navLinks?.querySelector(".nav-cta");

  let accountContainer = null;
  let accountToggle = null;
  let accountDropdown = null;

  function closeAccountDropdown() {
    if (!accountDropdown || !accountToggle) return;

    accountDropdown.classList.remove("show");
    accountToggle.setAttribute("aria-expanded", "false");
  }

  function createAccountDropdown() {

    if (!navLinks || accountContainer) return;

    accountContainer = document.createElement("div");
    accountContainer.className = "vorvena-account";

    accountContainer.innerHTML = `
      <button
        type="button"
        class="vorvena-account-toggle"
        id="vorvenaAccountToggle"
        aria-label="Open account menu"
        aria-expanded="false"
        aria-controls="vorvenaAccountDropdown"
      >
        <i class="fa-solid fa-user"></i>
      </button>

      <div
        class="vorvena-account-dropdown"
        id="vorvenaAccountDropdown"
      >
        <a href="#" id="vorvenaDashboardLink">
          <i class="fa-solid fa-gauge-high"></i>
          <span>Dashboard</span>
        </a>

        <div class="vorvena-account-divider"></div>

        <button
          type="button"
          class="vorvena-logout"
          id="vorvenaLogoutButton"
        >
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    `;

    navLinks.appendChild(accountContainer);

    accountToggle = document.getElementById("vorvenaAccountToggle");
    accountDropdown = document.getElementById("vorvenaAccountDropdown");

    accountToggle.addEventListener("click", event => {
      event.stopPropagation();

      const isOpen = accountDropdown.classList.toggle("show");

      accountToggle.setAttribute("aria-expanded", String(isOpen));
    });

    accountDropdown.addEventListener("click", event => {
      event.stopPropagation();
    });

    document.addEventListener("click", closeAccountDropdown);

    document.getElementById("vorvenaLogoutButton")
      .addEventListener("click", logout);

    updateDashboardLink();
  }


  function getUserRole() {
    return sessionStorage.getItem("vorvenaLoggedInRole");
  }


  function getDashboardPage() {
    const role = getUserRole();

    if (role === "professional") {
      return "professional-dashboard.html";
    }

    if (role === "client") {
      return "client-dashboard.html";
    }

    return "login.html";
  }


  function updateDashboardLink() {
    const dashboardLink = document.getElementById(
      "vorvenaDashboardLink"
    );

    if (dashboardLink) {
      dashboardLink.href = getDashboardPage();
    }
  }


  function updateAccountUI() {

    const isLoggedIn =
      sessionStorage.getItem("vorvenaLoggedIn") === "true";

    const role = getUserRole();

    const validRole =
      role === "professional" || role === "client";

    const showAccount = isLoggedIn && validRole;

    if (loginLink) {
      loginLink.style.display = showAccount ? "none" : "";
    }

    if (signupLink) {
      signupLink.style.display = showAccount ? "none" : "";
    }

    if (showAccount) {

      createAccountDropdown();
      accountContainer.style.display = "flex";

      const fullName =
        sessionStorage.getItem("vorvenaFullName") || "";

      const firstLetter = fullName.trim()
        ? fullName.trim().charAt(0).toUpperCase()
        : '<i class="fa-solid fa-user"></i>';

      accountToggle.innerHTML = firstLetter;

      accountToggle.setAttribute(
        "aria-label",
        "Account menu"
      );

      updateDashboardLink();

    } else if (accountContainer) {

      accountContainer.style.display = "none";
      closeAccountDropdown();

    }
  }


  function logout() {

    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    sessionStorage.removeItem("vorvenaLoggedIn");
    sessionStorage.removeItem("vorvenaLoggedInRole");
    sessionStorage.removeItem("vorvenaLoggedInEmail");
    sessionStorage.removeItem("vorvenaFullName");
    sessionStorage.removeItem("vorvenaEmail");

    closeAccountDropdown();
    closeMenu();

    window.location.href = "index.html";
  }


  updateAccountUI();


  /* =====================================
     5. SMOOTH SECTION NAVIGATION
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

      history.replaceState(null, "", targetId);
    });

  });


  /* =====================================
     6. SCROLL REVEAL ANIMATIONS
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
     7. COPYRIGHT YEAR
  ===================================== */

  const copyrightYear = document.getElementById("copyrightYear");

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }


  /* =====================================
     8. ACTIVE NAVIGATION LINK
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
     9. PAGE NAVIGATION
  ===================================== */

  window.VORVENA.navigate = function (page) {

    if (typeof page !== "string" || !page.trim()) {
      console.error("VORVENA: A valid page name is required.");
      return;
    }

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
     10. ROLE-BASED SIGNUP
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
     11. LOGIN NAVIGATION
  ===================================== */

  window.VORVENA.openLogin = function () {
    window.location.href = "login.html";
  };


  /* =====================================
     12. WHATSAPP COMMUNITY LINK
  ===================================== */

  const whatsappLink = document.querySelector(
    ".vorvena-community-link"
  );

  if (whatsappLink) {
    whatsappLink.setAttribute("target", "_blank");
    whatsappLink.setAttribute("rel", "noopener noreferrer");
  }


  /* =====================================
     13. BACK TO TOP
  ===================================== */

  document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener("click", closeMenu);
  });


  /* =====================================
     14. IMAGE FALLBACK
  ===================================== */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {
      image.classList.add("image-load-error");
    });

  });


  /* =====================================
     15. INITIALIZATION
  ===================================== */

  console.log("VORVENA frontend initialized.");

});
