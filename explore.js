// =========================================
// VORVENA EXPLORE PAGE
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. CATEGORY DATA
    // =====================================

    const categories = {
        "dev-it": {
            title: "Development & IT",
            description: "Find skilled developers and technology professionals.",
            specialties: [
                {
                    slug: "fullstack-developer",
                    name: "Full Stack Developer",
                    description: "Build complete web applications from frontend to backend.",
                    keywords: "fullstack full stack web react node"
                },
                {
                    slug: "frontend-developer",
                    name: "Frontend Developer",
                    description: "Create responsive and engaging user interfaces.",
                    keywords: "frontend html css javascript react"
                },
                {
                    slug: "backend-developer",
                    name: "Backend Developer",
                    description: "Build server-side systems, APIs and databases.",
                    keywords: "backend api server database"
                },
                {
                    slug: "mobile-app-developer",
                    name: "Mobile App Developer",
                    description: "Build applications for mobile devices.",
                    keywords: "mobile android ios flutter"
                },
                {
                    slug: "wordpress-developer",
                    name: "WordPress Developer",
                    description: "Build and manage professional WordPress websites.",
                    keywords: "wordpress website cms"
                },
                {
                    slug: "software-developer",
                    name: "Software Developer",
                    description: "Develop software applications and digital solutions.",
                    keywords: "software programming applications"
                },
                {
                    slug: "cybersecurity-specialist",
                    name: "Cybersecurity Specialist",
                    description: "Protect systems, networks and digital information.",
                    keywords: "cybersecurity security ethical hacking"
                },
                {
                    slug: "devops-engineer",
                    name: "DevOps Engineer",
                    description: "Manage deployment, automation and infrastructure.",
                    keywords: "devops cloud deployment infrastructure"
                }
            ]
        },

        "design-creative": {
            title: "Design & Creative",
            description: "Connect with creative professionals who bring ideas to life.",
            specialties: [
                {
                    slug: "ui-ux-designer",
                    name: "UI/UX Designer",
                    description: "Design intuitive and user-friendly digital experiences.",
                    keywords: "ui ux figma interface experience"
                },
                {
                    slug: "graphic-designer",
                    name: "Graphic Designer",
                    description: "Create attractive visual designs for brands.",
                    keywords: "graphic photoshop illustrator branding"
                },
                {
                    slug: "logo-designer",
                    name: "Logo Designer",
                    description: "Create memorable logos and brand identities.",
                    keywords: "logo brand identity"
                },
                {
                    slug: "motion-graphics-designer",
                    name: "Motion Graphics Designer",
                    description: "Create animated graphics and visual content.",
                    keywords: "motion animation graphics"
                },
                {
                    slug: "video-editor",
                    name: "Video Editor",
                    description: "Edit and produce engaging video content.",
                    keywords: "video editing premiere"
                },
                {
                    slug: "3d-designer",
                    name: "3D Designer",
                    description: "Create detailed three-dimensional designs.",
                    keywords: "3d blender modelling"
                },
                {
                    slug: "product-designer",
                    name: "Product Designer",
                    description: "Shape useful and engaging product experiences.",
                    keywords: "product design ux"
                },
                {
                    slug: "illustrator",
                    name: "Illustrator",
                    description: "Create original illustrations and visual artwork.",
                    keywords: "illustration drawing artwork"
                }
            ]
        },

        "data-ai": {
            title: "Data & AI",
            description: "Find professionals working with data and artificial intelligence.",
            specialties: [
                {
                    slug: "data-analyst",
                    name: "Data Analyst",
                    description: "Turn data into useful business insights.",
                    keywords: "data analytics excel sql"
                },
                {
                    slug: "data-scientist",
                    name: "Data Scientist",
                    description: "Use data science to solve complex problems.",
                    keywords: "data science statistics"
                },
                {
                    slug: "machine-learning-engineer",
                    name: "Machine Learning Engineer",
                    description: "Build and deploy machine learning solutions.",
                    keywords: "machine learning ml python"
                },
                {
                    slug: "ai-developer",
                    name: "AI Developer",
                    description: "Develop applications powered by artificial intelligence.",
                    keywords: "ai artificial intelligence"
                },
                {
                    slug: "data-engineer",
                    name: "Data Engineer",
                    description: "Build data pipelines and infrastructure.",
                    keywords: "data pipeline engineering"
                },
                {
                    slug: "business-intelligence-analyst",
                    name: "Business Intelligence Analyst",
                    description: "Transform business data into actionable insights.",
                    keywords: "business intelligence power bi"
                },
                {
                    slug: "ai-automation-specialist",
                    name: "AI Automation Specialist",
                    description: "Automate business processes using AI tools.",
                    keywords: "automation ai workflows"
                },
                {
                    slug: "database-administrator",
                    name: "Database Administrator",
                    description: "Manage and maintain database systems.",
                    keywords: "database sql administrator"
                }
            ]
        },

        "digital-growth": {
            title: "Digital & Growth",
            description: "Discover professionals who help businesses grow online.",
            specialties: [
                {
                    slug: "digital-marketer",
                    name: "Digital Marketer",
                    description: "Grow businesses through digital marketing strategies.",
                    keywords: "digital marketing online"
                },
                {
                    slug: "seo-specialist",
                    name: "SEO Specialist",
                    description: "Improve website visibility in search engines.",
                    keywords: "seo search engine optimization"
                },
                {
                    slug: "social-media-manager",
                    name: "Social Media Manager",
                    description: "Manage and grow social media accounts.",
                    keywords: "social media management"
                },
                {
                    slug: "content-writer",
                    name: "Content Writer",
                    description: "Create engaging content for digital platforms.",
                    keywords: "content writing blogs"
                },
                {
                    slug: "copywriter",
                    name: "Copywriter",
                    description: "Write persuasive copy for brands and businesses.",
                    keywords: "copywriting advertising"
                },
                {
                    slug: "email-marketer",
                    name: "Email Marketer",
                    description: "Create and manage effective email campaigns.",
                    keywords: "email marketing campaigns"
                },
                {
                    slug: "growth-marketer",
                    name: "Growth Marketer",
                    description: "Develop strategies that support business growth.",
                    keywords: "growth marketing business"
                },
                {
                    slug: "ecommerce-specialist",
                    name: "E-commerce Specialist",
                    description: "Help businesses manage and grow online stores.",
                    keywords: "ecommerce online store shopify"
                }
            ]
        }
    };


    // =====================================
    // 2. GET PAGE ELEMENTS
    // =====================================

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    const specialtiesGrid = document.getElementById("specialtiesGrid");

    const categoryTitle = document.getElementById("categoryTitle");
    const categoryDescription = document.getElementById("categoryDescription");
    const breadcrumbCategory = document.getElementById("breadcrumbCategory");

    const emptyState = document.getElementById("emptyState");
    const clearSearch = document.getElementById("clearSearch");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");


    // =====================================
    // 3. PAGE STATE
    // =====================================

    const params = new URLSearchParams(window.location.search);

    const selectedCategory = params.get("category") || "dev-it";

    const currentCategory = categories[selectedCategory] || categories["dev-it"];


    // =====================================
    // 4. UPDATE CATEGORY HEADING
    // =====================================

    function updateCategoryHeading() {

        categoryTitle.textContent = currentCategory.title;

        categoryDescription.textContent = currentCategory.description;

        breadcrumbCategory.textContent = currentCategory.title;

    }


    // =====================================
    // 5. CREATE SPECIALTY CARD
    // =====================================

    function createSpecialtyCard(specialty) {

        const card = document.createElement("a");

        card.className = "specialty-card";

        // Correct path to Professionals page
        card.href =
            `professionals/professionals.html?category=${encodeURIComponent(specialty.slug)}`;

        card.innerHTML = `
            <div class="specialty-card-icon">
                <i class="fas fa-code"></i>
            </div>

            <h3>${specialty.name}</h3>

            <p>${specialty.description}</p>

            <span class="specialty-card-link">
                Explore professionals
                <i class="fas fa-arrow-right"></i>
            </span>
        `;

        return card;

    }


    // =====================================
    // 6. DISPLAY SPECIALTIES
    // =====================================

    function renderSpecialties(searchTerm = "") {

        specialtiesGrid.innerHTML = "";

        const normalizedSearch = searchTerm.trim().toLowerCase();

        const filteredSpecialties = currentCategory.specialties.filter(
            specialty => {

                const searchableText = [
                    specialty.name,
                    specialty.description,
                    specialty.keywords
                ].join(" ").toLowerCase();

                return searchableText.includes(normalizedSearch);

            }
        );


        if (filteredSpecialties.length === 0) {

            emptyState.classList.add("show");

            return;

        }

        emptyState.classList.remove("show");

        filteredSpecialties.forEach(specialty => {

            specialtiesGrid.appendChild(
                createSpecialtyCard(specialty)
            );

        });

    }


    // =====================================
    // 7. SEARCH
    // =====================================

    searchInput.addEventListener("input", () => {

        renderSpecialties(searchInput.value);

    });


    searchButton.addEventListener("click", () => {

        renderSpecialties(searchInput.value);

    });


    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            renderSpecialties(searchInput.value);

        }

    });


    // =====================================
    // 8. CLEAR SEARCH
    // =====================================

    clearSearch.addEventListener("click", () => {

        searchInput.value = "";

        renderSpecialties();

    });


    // =====================================
    // 9. MOBILE NAVIGATION
    // =====================================

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.replace("fa-bars", "fa-times");

            menuToggle.setAttribute("aria-expanded", "true");

        } else {

            icon.classList.replace("fa-times", "fa-bars");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });


    document.querySelectorAll("#navLinks a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // =====================================
    // 10. FOOTER YEAR
    // =====================================

    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {

        copyrightYear.textContent = new Date().getFullYear();

    }


    // =====================================
    // 11. INITIALIZE PAGE
    // =====================================

    updateCategoryHeading();

    renderSpecialties();

});