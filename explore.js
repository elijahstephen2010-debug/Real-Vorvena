
document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // VORVENA SPECIALTIES
    // =====================================

    const categories = {
        "dev-it": {
            title: "Development & IT",
            description: "Explore development and IT specialties to find the right professional for your project.",
            specialties: [
                { name: "Full Stack Developers", slug: "fullstack-developer", icon: "fa-layer-group", description: "Build complete web applications from frontend to backend." },
                { name: "Front-End Developers", slug: "frontend-developer", icon: "fa-laptop-code", description: "Create beautiful, responsive and engaging user interfaces." },
                { name: "Back-End Developers", slug: "backend-developer", icon: "fa-server", description: "Build powerful server-side applications and APIs." },
                { name: "Mobile App Developers", slug: "mobile-app-developer", icon: "fa-mobile-screen-button", description: "Develop mobile applications for Android and iOS." },
                { name: "Software Engineers", slug: "software-engineer", icon: "fa-gears", description: "Design, develop and maintain software solutions." },
                { name: "Web Developers", slug: "web-developer", icon: "fa-globe", description: "Create and maintain modern websites." },
                { name: "WordPress Developers", slug: "wordpress-developer", icon: "fa-wordpress", description: "Build and customize professional WordPress websites." },
                { name: "Shopify Developers", slug: "shopify-developer", icon: "fa-bag-shopping", description: "Build and customize professional online stores." },
                { name: "Webflow Developers", slug: "webflow-developer", icon: "fa-pen-ruler", description: "Create modern websites using Webflow." },
                { name: "DevOps Engineers", slug: "devops-engineer", icon: "fa-cloud", description: "Manage deployment, infrastructure and development workflows." },
                { name: "Cybersecurity Specialists", slug: "cybersecurity-specialist", icon: "fa-shield-halved", description: "Protect applications, systems and digital assets." },
                { name: "QA Engineers", slug: "qa-engineer", icon: "fa-bug", description: "Test software and ensure quality and reliability." }
            ]
        },

        "ai-automation": {
            title: "AI & Automation",
            description: "Discover professionals who build intelligent solutions and automate everyday business tasks.",
            specialties: [
                { name: "AI Engineers", slug: "ai-engineer", icon: "fa-robot", description: "Develop intelligent applications and AI solutions." },
                { name: "Machine Learning Engineers", slug: "machine-learning-engineer", icon: "fa-brain", description: "Build and deploy machine learning systems." },
                { name: "Prompt Engineers", slug: "prompt-engineer", icon: "fa-terminal", description: "Design effective prompts for AI systems." },
                { name: "Chatbot Developers", slug: "chatbot-developer", icon: "fa-comments", description: "Build intelligent chatbots for support and sales." },
                { name: "AI Integration Developers", slug: "ai-integration-developer", icon: "fa-plug", description: "Integrate AI capabilities into existing applications and tools." },
                { name: "Automation Experts", slug: "automation-expert", icon: "fa-bolt", description: "Automate repetitive tasks and business processes." },
                { name: "n8n & Zapier Experts", slug: "workflow-automation-expert", icon: "fa-diagram-project", description: "Build automated workflows using tools like n8n and Zapier." },
                { name: "AI Video Creators", slug: "ai-video-creator", icon: "fa-film", description: "Create videos using AI-powered tools." },
                { name: "Vibe Coders", slug: "vibe-coder", icon: "fa-wand-magic-sparkles", description: "Build and develop applications with AI-assisted coding." },
                { name: "AI Consultants", slug: "ai-consultant", icon: "fa-lightbulb", description: "Help businesses identify and implement practical AI solutions." }
            ]
        },

        "data-analytics": {
            title: "Data & Analytics",
            description: "Turn raw data into useful insights with professionals who make information easier to understand and act on.",
            specialties: [
                { name: "Data Analysts", slug: "data-analyst", icon: "fa-chart-line", description: "Analyze data and uncover valuable insights." },
                { name: "Data Scientists", slug: "data-scientist", icon: "fa-flask", description: "Use data science to solve complex problems." },
                { name: "Data Engineers", slug: "data-engineer", icon: "fa-database", description: "Build and manage data pipelines and infrastructure." },
                { name: "BI Analysts", slug: "business-intelligence-analyst", icon: "fa-chart-column", description: "Create reports and dashboards for better decisions." },
                { name: "Data Visualization Specialists", slug: "data-visualization-specialist", icon: "fa-chart-pie", description: "Turn complex data into clear visual reports." },
                { name: "Power BI Specialists", slug: "power-bi-specialist", icon: "fa-gauge-high", description: "Create interactive reports and dashboards using Power BI." },
                { name: "Business Analysts", slug: "business-analyst", icon: "fa-briefcase", description: "Analyze business needs and identify practical solutions." },
                { name: "Database Administrators", slug: "database-administrator", icon: "fa-table-cells", description: "Manage, maintain and secure databases." },
                { name: "Web Scraping Experts", slug: "web-scraping-expert", icon: "fa-spider", description: "Collect and organize useful data from websites." },
                { name: "Quantitative Researchers", slug: "quantitative-researcher", icon: "fa-square-root-variable", description: "Use statistics and mathematical methods to solve problems." }
            ]
        },

        "design-creative": {
            title: "Design & Creative",
            description: "Discover creative professionals who can bring your ideas to life.",
            specialties: [
                { name: "UI/UX Designers", slug: "ui-ux-designer", icon: "fa-pen-ruler", description: "Design intuitive and engaging digital experiences." },
                { name: "Product Designers", slug: "product-designer", icon: "fa-layer-group", description: "Design useful and engaging digital products." },
                { name: "Graphic Designers", slug: "graphic-designer", icon: "fa-palette", description: "Create compelling graphics and visual designs." },
                { name: "Brand Designers", slug: "brand-designer", icon: "fa-copyright", description: "Build memorable brand identities." },
                { name: "Motion Designers", slug: "motion-designer", icon: "fa-film", description: "Create engaging animations and motion graphics." },
                { name: "Video Editors", slug: "video-editor", icon: "fa-video", description: "Edit videos and create compelling visual stories." },
                { name: "3D Designers", slug: "3d-designer", icon: "fa-cube", description: "Create detailed three-dimensional designs." },
                { name: "Illustrators", slug: "illustrator", icon: "fa-pen-nib", description: "Create original digital illustrations and artwork." },
                { name: "Prototyping Specialists", slug: "prototyping-specialist", icon: "fa-vector-square", description: "Create interactive prototypes and product demonstrations." },
                { name: "Presentation Designers", slug: "presentation-designer", icon: "fa-display", description: "Create clean and professional presentations." }
            ]
        },

        "digital-growth": {
            title: "Digital & Growth",
            description: "Find digital experts who can grow your brand and online presence.",
            specialties: [
                { name: "Digital Marketers", slug: "digital-marketer", icon: "fa-bullhorn", description: "Plan and manage effective digital campaigns." },
                { name: "SEO Specialists", slug: "seo-specialist", icon: "fa-magnifying-glass-chart", description: "Improve website rankings and search visibility." },
                { name: "Social Media Managers", slug: "social-media-manager", icon: "fa-hashtag", description: "Manage social media accounts and communities." },
                { name: "Content Strategists", slug: "content-strategist", icon: "fa-file-lines", description: "Plan content that connects with your audience." },
                { name: "Email Marketing Specialists", slug: "email-marketing-specialist", icon: "fa-envelope", description: "Create and manage effective email campaigns." },
                { name: "Growth Marketers", slug: "growth-marketer", icon: "fa-chart-simple", description: "Develop strategies that support business growth." },
                { name: "Copywriters", slug: "copywriter", icon: "fa-pen-to-square", description: "Write persuasive content for brands and businesses." },
                { name: "Google Ads Experts", slug: "google-ads-expert", icon: "fa-rectangle-ad", description: "Create and manage Google advertising campaigns." },
                { name: "Meta Ads Specialists", slug: "meta-ads-specialist", icon: "fa-bullseye", description: "Manage advertising campaigns across Facebook and Instagram." },
                { name: "Marketing Automation Consultants", slug: "marketing-automation-consultant", icon: "fa-gears", description: "Automate marketing campaigns and lead nurturing." },
                { name: "Lead Generation Specialists", slug: "lead-generation-specialist", icon: "fa-user-plus", description: "Find and attract potential customers for businesses." },
                { name: "Marketing Strategists", slug: "marketing-strategist", icon: "fa-chess", description: "Develop marketing strategies that support business growth." }
            ]
        },

        "admin-support": {
            title: "Admin & Support",
            description: "Find reliable professionals who can help manage daily operations and support your business.",
            specialties: [
                { name: "Virtual Assistants", slug: "virtual-assistant", icon: "fa-user-clock", description: "Provide day-to-day administrative support." },
                { name: "Data Entry Specialists", slug: "data-entry-specialist", icon: "fa-keyboard", description: "Enter, organize and maintain accurate information." },
                { name: "Bookkeepers", slug: "bookkeeper", icon: "fa-calculator", description: "Manage financial records and bookkeeping tasks." },
                { name: "Excel Experts", slug: "excel-expert", icon: "fa-file-excel", description: "Create spreadsheets, formulas and useful reports." },
                { name: "Customer Service Representatives", slug: "customer-service-representative", icon: "fa-headset", description: "Help customers with questions and support requests." },
                { name: "Appointment Setters", slug: "appointment-setter", icon: "fa-calendar-check", description: "Schedule appointments and manage bookings." },
                { name: "Personal Assistants", slug: "personal-assistant", icon: "fa-user-tie", description: "Help manage schedules, tasks and daily responsibilities." },
                { name: "PowerPoint Experts", slug: "powerpoint-expert", icon: "fa-file-powerpoint", description: "Create professional and engaging presentations." },
                { name: "QuickBooks Consultants", slug: "quickbooks-consultant", icon: "fa-receipt", description: "Help businesses manage their accounting with QuickBooks." },
                { name: "Project Managers", slug: "project-manager", icon: "fa-list-check", description: "Plan, coordinate and manage projects." }
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

    // Backwards compatibility with the previous combined category.
    if (selectedCategory === "data-ai") {
        selectedCategory = "data-analytics";
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

        if (title) title.textContent = category.title;
        if (description) description.textContent = category.description;
        if (breadcrumb) breadcrumb.textContent = category.title;

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
