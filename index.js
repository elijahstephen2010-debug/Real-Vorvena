
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
  const signupLink = navLinks?.querySelector(".signup-link");

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
    localStorage.removeItem("vorvenaRemembered");

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
     10. LOGIN NAVIGATION
  ===================================== */

  window.VORVENA.openLogin = function () {
    window.location.href = "login.html";
  };


  /* =====================================
     11. WHATSAPP COMMUNITY LINK
  ===================================== */

  const whatsappLink = document.querySelector(
    ".vorvena-community-link"
  );

  if (whatsappLink) {
    whatsappLink.setAttribute("target", "_blank");
    whatsappLink.setAttribute("rel", "noopener noreferrer");
  }


  /* =====================================
     12. BACK TO TOP
  ===================================== */

  document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener("click", closeMenu);
  });


  /* =====================================
     13. IMAGE FALLBACK
  ===================================== */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {
      image.classList.add("image-load-error");
    });

  });


  /* =====================================
     14. TALENT CATEGORIES (explore-talent.html)
     Job groups as tabs, with the skills that belong to each group as compact cards.
     To add or rename a skill, edit the GROUPS list below.
     Each card goes to professionals.html?category=<slug>, the same link explore.js uses.
  ===================================== */

  (function setupTalentCategories() {
    const root = document.getElementById("talentBrowser");
    if (!root) return;

    // [name, icon, short description, slug]
    const GROUPS = [
      {
        name: "Development & IT", icon: "fa-code", all: "dev-it",
        desc: "Build, ship and maintain the software your business runs on, from first prototype to production.",
        hint: "Great for launching a product, fixing technical debt or adding a missing skill to your team.",
        items: [
          ["Full Stack Developers", "fa-layer-group", "End-to-end web products", "fullstack-developer"],
          ["Front-End Developers", "fa-laptop-code", "Fast, polished interfaces", "frontend-developer"],
          ["Back-End Developers", "fa-server", "APIs, databases and logic", "backend-developer"],
          ["Mobile App Developers", "fa-mobile-screen-button", "iOS and Android apps", "mobile-app-developer"],
          ["Software Engineers", "fa-gears", "Design and maintain software", "software-engineer"],
          ["Web Developers", "fa-globe", "Modern, maintained websites", "web-developer"],
          ["WordPress Developers", "fa-brands fa-wordpress", "Themes, plugins, sites", "wordpress-developer"],
          ["Shopify Developers", "fa-bag-shopping", "Online stores that sell", "shopify-developer"],
          ["Webflow Developers", "fa-pen-ruler", "No-code, custom-quality sites", "webflow-developer"],
          ["DevOps Engineers", "fa-cloud", "Deploys, servers, uptime", "devops-engineer"],
          ["Cybersecurity Specialists", "fa-shield-halved", "Audits and secure builds", "cybersecurity-specialist"],
          ["QA Engineers", "fa-bug", "Find bugs before users do", "qa-engineer"]
        ]
      },
      {
        name: "AI & Automation", icon: "fa-robot", all: "ai-automation",
        desc: "Add intelligence to your product and remove repetitive work with practical, working AI solutions.",
        hint: "Great for smart features, chatbots and automating the tasks your team repeats every week.",
        items: [
          ["AI Engineers", "fa-robot", "Intelligent apps and AI solutions", "ai-engineer"],
          ["Machine Learning Engineers", "fa-brain", "Models built and deployed", "machine-learning-engineer"],
          ["Prompt Engineers", "fa-terminal", "Reliable AI outputs", "prompt-engineer"],
          ["Chatbot Developers", "fa-comments", "Support and sales bots", "chatbot-developer"],
          ["AI Integration Developers", "fa-plug", "AI inside your existing tools", "ai-integration-developer"],
          ["Automation Experts", "fa-bolt", "Remove repetitive work", "automation-expert"],
          ["n8n & Zapier Experts", "fa-diagram-project", "Workflow builders", "workflow-automation-expert"],
          ["AI Video Creators", "fa-film", "AI-assisted video and edits", "ai-video-creator"],
          ["Vibe Coders", "fa-wand-magic-sparkles", "Ship fast with AI coding", "vibe-coder"],
          ["AI Consultants", "fa-lightbulb", "Strategy and adoption", "ai-consultant"]
        ]
      },
      {
       name: "Data & Analytics", icon: "fa-chart-pie", all: "data-analytics",
        desc: "Turn raw data into decisions with analysts and engineers who make numbers easy to act on.",
        hint: "Great for reporting, forecasting and dashboards your whole team can read.",
        items: [
          ["Data Analysts", "fa-chart-line", "Insights from your numbers", "data-analyst"],
          ["Data Scientists", "fa-flask", "Prediction and modelling", "data-scientist"],
          ["Data Engineers", "fa-database", "Pipelines and warehouses", "data-engineer"],
          ["BI Analysts", "fa-chart-column", "Reports and dashboards", "business-intelligence-analyst"],
          ["Data Visualization Specialists", "fa-chart-pie", "Clear charts and stories", "data-visualization-specialist"],
          ["Power BI Specialists", "fa-gauge-high", "Reports built in Power BI", "power-bi-specialist"],
          ["Business Analysts", "fa-briefcase", "Requirements to results", "business-analyst"],
          ["Database Administrators", "fa-table-cells", "Fast, safe databases", "database-administrator"],
          ["Web Scraping Experts", "fa-spider", "Collect data at scale", "web-scraping-expert"],
          ["Quantitative Researchers", "fa-square-root-variable", "Statistics and research", "quantitative-researcher"]
        ]
      },
      {
        name: "Design & Creative", icon: "fa-pen-nib", all: "design-creative",
        desc: "Give your product and brand a look people trust, with designers who think about users first.",
        hint: "Great for new product interfaces, rebrands and marketing visuals.",
        items: [
          ["UI/UX Designers", "fa-pen-ruler", "Easy-to-use screens", "ui-ux-designer"],
          ["Product Designers", "fa-layer-group", "From idea to interface", "product-designer"],
          ["Graphic Designers", "fa-palette", "Visuals for any channel", "graphic-designer"],
          ["Brand Designers", "fa-copyright", "Identity that stands out", "brand-designer"],
          ["Motion Designers", "fa-film", "Animation and explainers", "motion-designer"],
          ["Video Editors", "fa-video", "Clean, engaging edits", "video-editor"],
          ["3D Designers", "fa-cube", "Detailed 3D work", "3d-designer"],
          ["Illustrators", "fa-pen-nib", "Original artwork", "illustrator"],
          ["Prototyping Specialists", "fa-vector-square", "Clickable prototypes in Figma", "prototyping-specialist"],
          ["Presentation Designers", "fa-display", "Decks that persuade", "presentation-designer"]
        ]
      },
      {
        name: "Digital & Growth", icon: "fa-chart-line", all: "digital-growth",
        desc: "Reach the right audience and grow steadily with specialists in search, content and strategy.",
        hint: "Great for launches, traffic growth and building a consistent online presence.",
        items: [
          ["Digital Marketers", "fa-bullhorn", "Plan and run campaigns", "digital-marketer"],
          ["SEO Specialists", "fa-magnifying-glass-chart", "Rank higher on search", "seo-specialist"],
          ["Social Media Managers", "fa-hashtag", "Content and community", "social-media-manager"],
          ["Content Strategists", "fa-file-lines", "Plans that build an audience", "content-strategist"],
          ["Email Marketing Specialists", "fa-envelope", "Campaigns and flows", "email-marketing-specialist"],
          ["Growth Marketers", "fa-chart-simple", "Test, learn, scale", "growth-marketer"],
          ["Copywriters", "fa-pen-to-square", "Words that persuade", "copywriter"],
          ["Google Ads Experts", "fa-rectangle-ad", "Paid search that converts", "google-ads-expert"],
          ["Meta Ads Specialists", "fa-bullseye", "Facebook and Instagram ads", "meta-ads-specialist"],
          ["Marketing Automation Consultants", "fa-gears", "Nurture leads on autopilot", "marketing-automation-consultant"],
          ["Lead Generation Specialists", "fa-user-plus", "Fill your pipeline", "lead-generation-specialist"],
          ["Marketing Strategists", "fa-chess", "Positioning and plans", "marketing-strategist"]
        ]
      },
      {
     name: "Admin & Support", icon: "fa-headset", all: "admin-support",
        desc: "Keep the business running smoothly with reliable people for day-to-day operations and customers.",
        hint: "Great for freeing up your time, keeping records tidy and looking after your customers.",
        items: [
          ["Virtual Assistants", "fa-user-clock", "Day-to-day support", "virtual-assistant"],
          ["Data Entry Specialists", "fa-keyboard", "Accurate, fast input", "data-entry-specialist"],
          ["Bookkeepers", "fa-calculator", "Books kept in order", "bookkeeper"],
          ["Excel Experts", "fa-file-excel", "Formulas, models, reports", "excel-expert"],
          ["Customer Service Representatives", "fa-headset", "Friendly, quick replies", "customer-service-representative"],
          ["Appointment Setters", "fa-calendar-check", "Fill your calendar", "appointment-setter"],
          ["Personal Assistants", "fa-user-tie", "Schedules and errands", "personal-assistant"],
          ["PowerPoint Experts", "fa-file-powerpoint", "Clean, professional slides", "powerpoint-expert"],
          ["QuickBooks Consultants", "fa-receipt", "Accounting set-up", "quickbooks-consultant"],
          ["Project Managers", "fa-list-check", "Keep work on track", "project-manager"]
        ]
      }
    ];

    const make = (tag, className, text) => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text) node.textContent = text;
      return node;
    };

    const makeIcon = name => {
      const icon = make("i", name.startsWith("fa-brands") ? name : "fa-solid " + name);
      icon.setAttribute("aria-hidden", "true");
      return icon;
    };

    const wrap = make("div", "tc");
    const tabs = make("div", "tc-tabs");
    const panel = make("div", "tc-panel");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Talent categories");
    panel.setAttribute("role", "tabpanel");

    function showGroup(index) {
      [...tabs.children].forEach((tab, i) => tab.setAttribute("aria-selected", i === index ? "true" : "false"));

      const group = GROUPS[index];
      panel.textContent = "";

      const head = make("div", "tc-head");
      const titleBox = make("div");
      titleBox.append(make("h3", "", group.name), make("p", "", group.desc));
      head.appendChild(titleBox);

      if (group.all) {
        const all = make("a", "tc-all", "See all " + group.name + " roles");
        all.href = "explore.html?category=" + encodeURIComponent(group.all);
        all.appendChild(makeIcon("fa-arrow-right"));
        head.appendChild(all);
      }

      const grid = make("div", "tc-grid");
      group.items.forEach(([name, icon, text, slug]) => {
        const card = make("a", "tc-card");
        card.href = "professionals.html?category=" + encodeURIComponent(slug);

        const iconBox = make("span", "tc-icon");
        iconBox.appendChild(makeIcon(icon));
        const arrow = make("span", "tc-go");
        arrow.appendChild(makeIcon("fa-arrow-right"));

        card.append(iconBox, arrow, make("h4", "", name), make("p", "", text));
        grid.appendChild(card);
      });

      const hint = make("div", "tc-hint");
      hint.append(makeIcon("fa-lightbulb"), make("span", "", group.hint));

      panel.append(head, grid, hint);
    }

    GROUPS.forEach((group, index) => {
      const tab = make("button", "tc-tab");
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.append(makeIcon(group.icon), document.createTextNode(group.name));
      tab.addEventListener("click", () => showGroup(index));
      tabs.appendChild(tab);
    });

    wrap.append(tabs, panel);
    root.appendChild(wrap);
    showGroup(0);
  })();

  /* =====================================
     15. INITIALIZATION
  ===================================== */

  console.log("VORVENA frontend initialized.");

});
