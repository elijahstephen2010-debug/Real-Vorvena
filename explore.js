
document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // VORVENA SPECIALTIES
    // =====================================

    const categories = {
        "dev-it": {
            title: "Development & IT",
            description: "Explore development and IT specialties to find the right professional for your project.",
            specialties: [
                { name: "Full-Stack Developer", slug: "fullstack-developer", icon: "fa-code", description: "Build complete web applications from frontend to backend." },
                { name: "Frontend Developer", slug: "frontend-developer", icon: "fa-laptop-code", description: "Create beautiful, responsive and engaging user interfaces." },
                { name: "Backend Developer", slug: "backend-developer", icon: "fa-server", description: "Build powerful server-side applications and APIs." },
                { name: "Mobile App Developer", slug: "mobile-app-developer", icon: "fa-mobile-screen-button", description: "Develop mobile applications for Android and iOS." },
                { name: "Software Engineer", slug: "software-engineer", icon: "fa-gears", description: "Design, develop and maintain software solutions." },
                { name: "WordPress Developer", slug: "wordpress-developer", icon: "fa-wordpress", description: "Build and customize professional WordPress websites." },
                { name: "Web Developer", slug: "web-developer", icon: "fa-globe", description: "Create and maintain modern websites." },
                { name: "DevOps Engineer", slug: "devops-engineer", icon: "fa-cloud", description: "Manage deployment, infrastructure and development workflows." },
                { name: "Cybersecurity Specialist", slug: "cybersecurity-specialist", icon: "fa-shield-halved", description: "Protect applications, systems and digital assets." },
                { name: "QA Engineer", slug: "qa-engineer", icon: "fa-bug", description: "Test software and ensure quality and reliability." }
            ]
        },

        "design-creative": {
            title: "Design & Creative",
            description: "Discover creative professionals who can bring your ideas to life.",
            specialties: [
                { name: "UI/UX Designer", slug: "ui-ux-designer", icon: "fa-pen-ruler", description: "Design intuitive and engaging digital experiences." },
                { name: "Graphic Designer", slug: "graphic-designer", icon: "fa-palette", description: "Create compelling graphics and visual designs." },
                { name: "Product Designer", slug: "product-designer", icon: "fa-layer-group", description: "Design useful and engaging digital products." },
                { name: "Brand Designer", slug: "brand-designer", icon: "fa-copyright", description: "Build memorable brand identities." },
                { name: "Motion Designer", slug: "motion-designer", icon: "fa-film", description: "Create engaging animations and motion graphics." },
                { name: "Video Editor", slug: "video-editor", icon: "fa-video", description: "Edit videos and create compelling visual stories." },
                { name: "3D Designer", slug: "3d-designer", icon: "fa-cube", description: "Create detailed three-dimensional designs." },
                { name: "Illustrator", slug: "illustrator", icon: "fa-pen-nib", description: "Create original digital illustrations and artwork." }
            ]
        },

        "data-ai": {
            title: "Data & AI",
            description: "Discover professionals who turn data and artificial intelligence into useful solutions.",
            specialties: [
                { name: "Data Analyst", slug: "data-analyst", icon: "fa-chart-line", description: "Analyze data and uncover valuable insights." },
                { name: "Data Scientist", slug: "data-scientist", icon: "fa-chart-pie", description: "Use data science to solve complex problems." },
                { name: "Machine Learning Engineer", slug: "machine-learning-engineer", icon: "fa-brain", description: "Build and deploy machine learning systems." },
                { name: "AI Engineer", slug: "ai-engineer", icon: "fa-robot", description: "Develop intelligent applications and AI solutions." },
                { name: "Data Engineer", slug: "data-engineer", icon: "fa-database", description: "Build and manage data pipelines." },
                { name: "Business Intelligence Analyst", slug: "business-intelligence-analyst", icon: "fa-chart-column", description: "Create reports and dashboards for better decisions." },
                { name: "Prompt Engineer", slug: "prompt-engineer", icon: "fa-terminal", description: "Design effective prompts for AI systems." }
            ]
        },

        "digital-growth": {
            title: "Digital Growth",
            description: "Find digital experts who can grow your brand and online presence.",
            specialties: [
                { name: "Digital Marketer", slug: "digital-marketer", icon: "fa-bullhorn", description: "Plan and manage effective digital campaigns." },
                { name: "SEO Specialist", slug: "seo-specialist", icon: "fa-magnifying-glass-chart", description: "Improve website rankings and search visibility." },
                { name: "Social Media Manager", slug: "social-media-manager", icon: "fa-hashtag", description: "Manage social media accounts and communities." },
                { name: "Content Strategist", slug: "content-strategist", icon: "fa-file-lines", description: "Plan content that connects with your audience." },
                { name: "Email Marketing Specialist", slug: "email-marketing-specialist", icon: "fa-envelope", description: "Create and manage effective email campaigns." },
                { name: "Growth Marketer", slug: "growth-marketer", icon: "fa-chart-simple", description: "Develop strategies that support business growth." },
                { name: "Copywriter", slug: "copywriter", icon: "fa-pen-to-square", description: "Write persuasive content for brands and businesses." }
            ]
        }
    };

    // =====================================
    // HTML ELEMENTS
    // =====================================

    const grid = document.getElementById("specialtiesGrid");
    const title = document.getElementById("categoryTitle");
    const description = document.getElementById("categoryDescription");
    const breadcrumb = document.getElementById("breadcrumbCategory");

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearSearchButton = document.getElementById("clearSearch");
    const emptyState = document.getElementById("emptyState");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const copyrightYear = document.getElementById("copyrightYear");

    if (!grid) {
        console.error("VORVENA: specialtiesGrid was not found.");
        return;
    }

    // =====================================
    // CATEGORY FROM URL
    // =====================================

    const params = new URLSearchParams(window.location.search);

    let selectedCategory = params.get("category") || "dev-it";
    let searchTerm = "";

    // Backwards compatibility with the old category link.
    if (selectedCategory === "data-analytics") {
        selectedCategory = "data-ai";
    }

    if (!categories[selectedCategory]) {
        selectedCategory = "dev-it";
    }

    // =====================================
    // CREATE SPECIALTY CARD
    // =====================================

    function createSpecialtyCard(specialty) {
        const card = document.createElement("a");

        card.className = "specialty-card";
        card.href = `professionals.html?category=${encodeURIComponent(specialty.slug)}`;
        card.setAttribute("aria-label", `Explore ${specialty.name} professionals`);

        const iconBox = document.createElement("div");
        iconBox.className = "specialty-icon";

        const icon = document.createElement("i");
        icon.className = `fa-solid ${specialty.icon}`;
        icon.setAttribute("aria-hidden", "true");

        iconBox.appendChild(icon);

        const content = document.createElement("div");
        content.className = "specialty-content";

        const heading = document.createElement("h3");
        heading.textContent = specialty.name;

        const text = document.createElement("p");
        text.textContent = specialty.description;

        content.append(heading, text);

        const bottom = document.createElement("div");
        bottom.className = "card-bottom";

        const bottomText = document.createElement("span");
        bottomText.textContent = "Explore Professionals";

        const arrow = document.createElement("i");
        arrow.className = "fa-solid fa-arrow-right";
        arrow.setAttribute("aria-hidden", "true");

        bottom.append(bottomText, arrow);

        card.append(iconBox, content, bottom);

        return card;
    }

    // =====================================
    // DISPLAY SPECIALTIES
    // =====================================

    function renderSpecialties() {
        const category = categories[selectedCategory];

        const filtered = category.specialties.filter(specialty => {
            const name = specialty.name.toLowerCase();
            const details = specialty.description.toLowerCase();

            return name.includes(searchTerm) || details.includes(searchTerm);
        });

        grid.replaceChildren();

        if (filtered.length === 0) {
            grid.style.display = "none";

            if (emptyState) {
                emptyState.classList.add("show");
            }

            return;
        }

        grid.style.display = "";

        if (emptyState) {
            emptyState.classList.remove("show");
        }

        const cards = document.createDocumentFragment();

        filtered.forEach(specialty => {
            cards.appendChild(createSpecialtyCard(specialty));
        });

        grid.appendChild(cards);
    }

    // =====================================
    // UPDATE CATEGORY
    // =====================================

    function updateCategory() {
        const category = categories[selectedCategory];

        title && (title.textContent = category.title);
        description && (description.textContent = category.description);
        breadcrumb && (breadcrumb.textContent = category.title);

        renderSpecialties();
    }

    // =====================================
    // SEARCH
    // =====================================

    function performSearch() {
        searchTerm = searchInput.value.trim().toLowerCase();
        renderSpecialties();
    }

    if (searchInput) {
        searchInput.addEventListener("input", performSearch);

        searchInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                performSearch();
            }
        });
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener("click", performSearch);
    }

    // =====================================
    // CLEAR SEARCH
    // =====================================

    function clearSearch() {
        searchTerm = "";

        if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
        }

        renderSpecialties();
    }

    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", clearSearch);
    }

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("show");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });
    }

    // =====================================
    // FOOTER YEAR
    // =====================================

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // =====================================
    // INITIALIZE
    // =====================================

    updateCategory();

    console.log("VORVENA Explore page initialized.");
});
