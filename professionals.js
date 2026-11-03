
/* =========================================
   VORVENA PROFESSIONALS PAGE
   FRONTEND DEMO VERSION
   =========================================

   IMPORTANT:
   Profiles are demo data, not real registered users.
   Authentication, hiring and payments must be
   validated by the backend in production.
*/


// =========================================
// 1. SPECIALTY DATA
// =========================================

const specialties = {
    "fullstack-developer": {
        title: "Full Stack Developers",
        category: "Dev & IT",
        description: "Find professionals skilled in building complete web applications."
    },
    "frontend-developer": {
        title: "Frontend Developers",
        category: "Dev & IT",
        description: "Discover developers who create beautiful and responsive interfaces."
    },
    "backend-developer": {
        title: "Backend Developers",
        category: "Dev & IT",
        description: "Find experts who build powerful server-side applications."
    },
    "mobile-app-developer": {
        title: "Mobile App Developers",
        category: "Dev & IT",
        description: "Discover developers who build mobile applications."
    },
    "wordpress-developer": {
        title: "WordPress Developers",
        category: "Dev & IT",
        description: "Find professionals who build and manage WordPress websites."
    },
    "software-developer": {
        title: "Software Developers",
        category: "Dev & IT",
        description: "Explore professionals who develop software solutions."
    },
    "cybersecurity-specialist": {
        title: "Cybersecurity Specialists",
        category: "Dev & IT",
        description: "Find experts who help protect digital systems."
    },
    "devops-engineer": {
        title: "DevOps Engineers",
        category: "Dev & IT",
        description: "Discover professionals who manage deployment and infrastructure."
    },

    "ui-ux-designer": {
        title: "UI/UX Designers",
        category: "Design & Creative",
        description: "Find designers who create intuitive digital experiences."
    },
    "graphic-designer": {
        title: "Graphic Designers",
        category: "Design & Creative",
        description: "Discover creative professionals for your visual projects."
    },
    "logo-designer": {
        title: "Logo Designers",
        category: "Design & Creative",
        description: "Find designers who create memorable brand identities."
    },
    "motion-graphics-designer": {
        title: "Motion Graphics Designers",
        category: "Design & Creative",
        description: "Explore professionals who create animated visual content."
    },
    "video-editor": {
        title: "Video Editors",
        category: "Design & Creative",
        description: "Find skilled video editors for your projects."
    },
    "3d-designer": {
        title: "3D Designers",
        category: "Design & Creative",
        description: "Discover professionals who create three-dimensional designs."
    },
    "product-designer": {
        title: "Product Designers",
        category: "Design & Creative",
        description: "Find designers who shape digital and physical products."
    },
    "illustrator": {
        title: "Illustrators",
        category: "Design & Creative",
        description: "Explore creative illustrators for your next project."
    },

    "data-analyst": {
        title: "Data Analysts",
        category: "Data & AI",
        description: "Find professionals who turn data into useful insights."
    },
    "data-scientist": {
        title: "Data Scientists",
        category: "Data & AI",
        description: "Discover experts in data science and predictive analysis."
    },
    "machine-learning-engineer": {
        title: "Machine Learning Engineers",
        category: "Data & AI",
        description: "Find engineers who build machine learning solutions."
    },
    "ai-developer": {
        title: "AI Developers",
        category: "Data & AI",
        description: "Explore developers building artificial intelligence solutions."
    },
    "data-engineer": {
        title: "Data Engineers",
        category: "Data & AI",
        description: "Find professionals who build data systems and pipelines."
    },
    "business-intelligence-analyst": {
        title: "Business Intelligence Analysts",
        category: "Data & AI",
        description: "Discover analysts who turn business data into insights."
    },
    "ai-automation-specialist": {
        title: "AI Automation Specialists",
        category: "Data & AI",
        description: "Find experts who automate business processes with AI."
    },
    "database-administrator": {
        title: "Database Administrators",
        category: "Data & AI",
        description: "Explore professionals who manage and maintain databases."
    },

    "digital-marketer": {
        title: "Digital Marketers",
        category: "Digital & Growth",
        description: "Find professionals who grow businesses online."
    },
    "seo-specialist": {
        title: "SEO Specialists",
        category: "Digital & Growth",
        description: "Discover experts who improve website search visibility."
    },
    "social-media-manager": {
        title: "Social Media Managers",
        category: "Digital & Growth",
        description: "Find professionals who manage and grow social media accounts."
    },
    "content-writer": {
        title: "Content Writers",
        category: "Digital & Growth",
        description: "Explore writers who create engaging digital content."
    },
    "copywriter": {
        title: "Copywriters",
        category: "Digital & Growth",
        description: "Find writers who create persuasive marketing copy."
    },
    "email-marketer": {
        title: "Email Marketers",
        category: "Digital & Growth",
        description: "Discover professionals who build effective email campaigns."
    },
    "growth-marketer": {
        title: "Growth Marketers",
        category: "Digital & Growth",
        description: "Find experts who help businesses grow."
    },
    "ecommerce-specialist": {
        title: "E-commerce Specialists",
        category: "Digital & Growth",
        description: "Explore professionals who help businesses sell online."
    }
};


// =========================================
// 2. DEMO PROFILE DATA
// =========================================

// These names are sample/demo identities.
// Replace them with real registered profiles
// when the backend is connected.

const demoNames = [
    ["Alex Morgan", "Michael Adams", "Daniel Smith"],
    ["Samuel Okafor", "James Wilson", "David Chen"],
    ["Sarah Johnson", "Grace Williams", "Olivia Brown"]
];

const countries = [
    "Nigeria",
    "United States",
    "United Kingdom",
    "Canada"
];

const experienceLevels = [
    "expert",
    "intermediate",
    "entry"
];

const ratings = [
    4.9,
    4.7,
    4.6
];

const completedJobs = [
    48,
    31,
    12
];

const skillLibrary = {
    "fullstack-developer": ["React", "Node.js", "JavaScript", "MongoDB"],
    "frontend-developer": ["HTML", "CSS", "JavaScript", "React"],
    "backend-developer": ["Node.js", "Python", "SQL", "API Development"],
    "mobile-app-developer": ["Flutter", "Dart", "Firebase"],
    "wordpress-developer": ["WordPress", "PHP", "Elementor", "CSS"],
    "software-developer": ["Python", "JavaScript", "Git", "Software Design"],
    "cybersecurity-specialist": ["Network Security", "Linux", "Security Auditing"],
    "devops-engineer": ["Docker", "AWS", "Linux", "CI/CD"],

    "ui-ux-designer": ["Figma", "Wireframing", "Prototyping", "Research"],
    "graphic-designer": ["Photoshop", "Illustrator", "Branding"],
    "logo-designer": ["Illustrator", "Logo Design", "Brand Identity"],
    "motion-graphics-designer": ["After Effects", "Animation", "Premiere Pro"],
    "video-editor": ["Premiere Pro", "DaVinci Resolve", "Video Editing"],
    "3d-designer": ["Blender", "3D Modelling", "Rendering"],
    "product-designer": ["Figma", "Product Design", "Prototyping"],
    "illustrator": ["Digital Illustration", "Procreate", "Drawing"],

    "data-analyst": ["Python", "SQL", "Power BI", "Excel"],
    "data-scientist": ["Python", "Statistics", "Machine Learning"],
    "machine-learning-engineer": ["Python", "TensorFlow", "PyTorch"],
    "ai-developer": ["Python", "AI Integration", "APIs"],
    "data-engineer": ["SQL", "Python", "Data Pipelines"],
    "business-intelligence-analyst": ["Power BI", "Excel", "SQL"],
    "ai-automation-specialist": ["Python", "Automation", "AI Tools"],
    "database-administrator": ["SQL", "MySQL", "PostgreSQL"],

    "digital-marketer": ["SEO", "Social Media", "Content Strategy"],
    "seo-specialist": ["SEO", "Keyword Research", "Google Analytics"],
    "social-media-manager": ["Content Planning", "Instagram", "Analytics"],
    "content-writer": ["Blog Writing", "Research", "Editing"],
    "copywriter": ["Copywriting", "Advertising", "Brand Messaging"],
    "email-marketer": ["Email Campaigns", "Mailchimp", "Automation"],
    "growth-marketer": ["Growth Strategy", "Analytics", "Marketing"],
    "ecommerce-specialist": ["Shopify", "E-commerce", "Product Management"]
};


// Generate exactly 3 demo profiles per specialty.

const professionals = [];

let profileId = 1;

Object.keys(specialties).forEach((specialty, specialtyIndex) => {

    const specialtyInfo = specialties[specialty];

    const role = specialtyInfo.title.replace(/s$/, "");

    for (let i = 0; i < 3; i++) {

        const name = demoNames[i][specialtyIndex % 3];

        const profile = {
            id: profileId++,
            name: name,
            role: role,
            specialty: specialty,
            country: countries[(specialtyIndex + i) % countries.length],
            rating: ratings[i],
            jobs: completedJobs[i],
            verified: i !== 2,
            experience: experienceLevels[i],
            bio: `${role} with experience in delivering professional projects and creating practical solutions for clients.`,
            skills: skillLibrary[specialty] || ["Communication", "Problem Solving"],
            initials: name.split(" ").map(part => part[0]).join("")
        };

        professionals.push(profile);
    }

});


// =========================================
// 3. GET PAGE ELEMENTS
// =========================================

const professionalsGrid = document.getElementById("professionalsGrid");
const professionalSearch = document.getElementById("professionalSearch");
const searchButton = document.getElementById("searchButton");

const categoryTitle = document.getElementById("categoryTitle");
const categoryDescription = document.getElementById("categoryDescription");
const breadcrumbCategory = document.getElementById("breadcrumbCategory");

const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

const countryFilter = document.getElementById("countryFilter");
const ratingFilter = document.getElementById("ratingFilter");
const verifiedFilter = document.getElementById("verifiedFilter");
const sortFilter = document.getElementById("sortFilter");

const resetFilters = document.getElementById("resetFilters");
const clearFilters = document.getElementById("clearFilters");

const profileModal = document.getElementById("profileModal");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const modalProfileContent = document.getElementById("modalProfileContent");
const authContent = document.getElementById("authContent");

const hireModal = document.getElementById("hireModal");
const hireOverlay = document.getElementById("hireOverlay");
const closeHireModal = document.getElementById("closeHireModal");
const hireForm = document.getElementById("hireForm");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


// =========================================
// 4. PAGE STATE
// =========================================

const urlParams = new URLSearchParams(window.location.search);
const selectedSpecialty = urlParams.get("category");

const currentSpecialty = specialties[selectedSpecialty] || null;

let selectedProfessional = null;


// =========================================
// 5. AUTHENTICATION CHECK
// =========================================

function getCurrentUser() {

    const possibleKeys = [
        "vorvenaUser",
        "currentUser",
        "user"
    ];

    for (const key of possibleKeys) {

        try {

            const storedUser = localStorage.getItem(key);

            if (!storedUser) continue;

            const user = JSON.parse(storedUser);

            if (user && typeof user === "object") {
                return user;
            }

        } catch (error) {

            console.warn(`Could not read ${key} from localStorage.`);

        }

    }

    return null;
}


function getUserRole(user) {

    if (!user) return null;

    return String(
        user.role ||
        user.userRole ||
        user.accountType ||
        ""
    ).toLowerCase().trim();

}


function isLoggedIn() {

    const user = getCurrentUser();

    if (!user) return false;

    const role = getUserRole(user);

    return (
        ["client", "professional"].includes(role) &&
        user.isVerified !== false &&
        user.emailVerified !== false &&
        user.phoneVerified !== false
    );

}


function isClient() {

    const user = getCurrentUser();

    return isLoggedIn() && getUserRole(user) === "client";

}


function isProfessional() {

    const user = getCurrentUser();

    return isLoggedIn() && getUserRole(user) === "professional";

}


// =========================================
// 6. UPDATE PAGE CATEGORY
// =========================================

function updateCategoryHeading() {

    if (!currentSpecialty) {

        categoryTitle.textContent = "Explore Professionals";

        categoryDescription.textContent =
            "Find experienced professionals ready to bring your ideas to life.";

        breadcrumbCategory.textContent = "Professionals";

        return;
    }

    categoryTitle.textContent = currentSpecialty.title;
    categoryDescription.textContent = currentSpecialty.description;
    breadcrumbCategory.textContent = currentSpecialty.title;

}


// =========================================
// 7. FILTER PROFESSIONALS
// =========================================

function getFilteredProfessionals() {

    let filtered = [...professionals];

    // Specialty

    if (currentSpecialty) {

        filtered = filtered.filter(person =>
            person.specialty === selectedSpecialty
        );

    }

    // Search

    const searchTerm = professionalSearch.value
        .trim()
        .toLowerCase();

    if (searchTerm) {

        filtered = filtered.filter(person => {

            const searchableText = [
                person.name,
                person.role,
                person.country,
                person.bio,
                person.experience,
                ...person.skills
            ].join(" ").toLowerCase();

            return searchableText.includes(searchTerm);

        });

    }

    // Experience

    const selectedExperience = document.querySelector(
        'input[name="experience"]:checked'
    )?.value || "all";

    if (selectedExperience !== "all") {

        filtered = filtered.filter(person =>
            person.experience === selectedExperience
        );

    }

    // Country

    if (countryFilter.value !== "all") {

        filtered = filtered.filter(person =>
            person.country === countryFilter.value
        );

    }

    // Rating

    const minimumRating = Number(ratingFilter.value);

    if (minimumRating > 0) {

        filtered = filtered.filter(person =>
            person.rating >= minimumRating
        );

    }

    // Verified

    if (verifiedFilter.checked) {

        filtered = filtered.filter(person =>
            person.verified
        );

    }

    // Sorting

    if (sortFilter.value === "rating") {

        filtered.sort((a, b) => b.rating - a.rating);

    }

    if (sortFilter.value === "jobs") {

        filtered.sort((a, b) => b.jobs - a.jobs);

    }

    return filtered;

}


// =========================================
// 8. DISPLAY PROFESSIONAL CARDS
// =========================================

function renderProfessionals() {

    const filtered = getFilteredProfessionals();

    professionalsGrid.innerHTML = "";

    resultsCount.textContent =
        `Showing ${filtered.length} professional${filtered.length === 1 ? "" : "s"}`;

    if (filtered.length === 0) {

        emptyState.classList.add("show");

        return;

    }

    emptyState.classList.remove("show");

    filtered.forEach(person => {

        const card = document.createElement("article");

        card.className = "professional-card";

        const verificationBadge = person.verified
            ? `<span class="verified-badge" title="Demo verified status">
                    <i class="fas fa-check"></i>
               </span>`
            : "";

        card.innerHTML = `
            <div class="professional-card-top">

                <div class="professional-avatar">
                    ${person.initials}
                </div>

                <div class="professional-info">

                    <h3>
                        ${person.name}
                        ${verificationBadge}
                    </h3>

                    <span class="professional-role">
                        ${person.role}
                    </span>

                </div>

            </div>

            <div class="professional-location">
                <i class="fas fa-map-marker-alt"></i>
                ${person.country}
            </div>

            <p class="professional-bio">
                ${person.bio}
            </p>

            <div class="professional-stats">

                <span class="professional-stat">
                    <i class="fas fa-star"></i>
                    ${person.rating.toFixed(1)}
                </span>

                <span class="professional-stat">
                    <i class="fas fa-briefcase"></i>
                    ${person.jobs} jobs
                </span>

            </div>

            <div class="professional-card-bottom">

                <span class="experience-tag">
                    ${formatExperience(person.experience)}
                </span>

                <button
                    class="view-profile-btn"
                    type="button"
                    data-profile-id="${person.id}"
                >
                    View Profile
                </button>

            </div>
        `;

        professionalsGrid.appendChild(card);

    });

}


// =========================================
// 9. FORMAT EXPERIENCE
// =========================================

function formatExperience(experience) {

    const labels = {
        entry: "Entry Level",
        intermediate: "Intermediate",
        expert: "Expert"
    };

    return labels[experience] || experience;

}


// =========================================
// 10. OPEN PROFESSIONAL PROFILE
// =========================================

function openProfile(professionalId) {

    const person = professionals.find(
        item => item.id === Number(professionalId)
    );

    if (!person) return;

    selectedProfessional = person;

    const verificationBadge = person.verified
        ? `<span class="verified-badge">
                <i class="fas fa-check"></i>
           </span>`
        : "";

    const skillsHTML = person.skills.map(skill =>
        `<span class="experience-tag">${skill}</span>`
    ).join("");

    modalProfileContent.innerHTML = `
        <div class="professional-avatar modal-avatar">
            ${person.initials}
        </div>

        <h2>
            ${person.name}
            ${verificationBadge}
        </h2>

        <p class="professional-role">${person.role}</p>

        <p class="professional-location">
            <i class="fas fa-map-marker-alt"></i>
            ${person.country}
        </p>

        <div class="professional-stats">

            <span class="professional-stat">
                <i class="fas fa-star"></i>
                ${person.rating.toFixed(1)} Rating
            </span>

            <span class="professional-stat">
                <i class="fas fa-briefcase"></i>
                ${person.jobs} Completed Jobs
            </span>

        </div>

        <h3 class="modal-section-title">About Me</h3>

        <p class="professional-bio modal-bio">
            ${person.bio}
        </p>

        <h3 class="modal-section-title">Skills</h3>

        <div class="modal-skills">
            ${skillsHTML}
        </div>

        <h3 class="modal-section-title">Experience</h3>

        <p class="professional-role">
            ${formatExperience(person.experience)}
        </p>
    `;

    updateProfileAccess();

    profileModal.classList.add("show");
    document.body.classList.add("modal-open");

}


// =========================================
// 11. CONTROL PROFILE ACCESS
// =========================================

function updateProfileAccess() {

    // Visitor

    if (!isLoggedIn()) {

        authContent.innerHTML = `
            <span class="auth-label">JOIN VORVENA</span>

            <h2>Ready to hire?</h2>

            <p>
                Create an account or sign in to hire talented
                professionals and manage your projects.
            </p>

            <a href="../signup.html" class="auth-option">
                <i class="fab fa-google"></i>
                Continue with Google
            </a>

            <a href="../signup.html" class="auth-option">
                <i class="fab fa-apple"></i>
                Continue with Apple
            </a>

            <a href="../client-signup.html" class="auth-option">
                <i class="fas fa-envelope"></i>
                Continue with Email
            </a>

            <p class="auth-terms">
                Already have an account?
                <a href="../login.html">Log In</a>
            </p>
        `;

        return;

    }


    // Client

    if (isClient()) {

        authContent.innerHTML = `
            <span class="auth-label">READY TO START?</span>

            <h2>Hire this professional</h2>

            <p>
                You're signed in as a client.
                Start by sharing your project details.
            </p>

            <button
                class="auth-option hire-profile-btn"
                id="hireProfileButton"
                type="button"
            >
                <i class="fas fa-briefcase"></i>
                Hire Professional
            </button>

            <p class="auth-terms">
                Your project details will be reviewed before submission.
            </p>
        `;

        document.getElementById("hireProfileButton")
            .addEventListener("click", openHiringForm);

        return;

    }


    // Professional

    if (isProfessional()) {

        authContent.innerHTML = `
            <span class="auth-label">PROFESSIONAL ACCOUNT</span>

            <h2>You're signed in as a professional.</h2>

            <p>
                Hiring other professionals is available through a client account.
                Continue to your professional dashboard.
            </p>

            <a href="../professional-dashboard.html" class="auth-option">
                <i class="fas fa-th-large"></i>
                My Dashboard
            </a>
        `;

    }

}


// =========================================
// 12. CLOSE PROFILE MODAL
// =========================================

function closeProfileModal() {

    profileModal.classList.remove("show");

    document.body.classList.remove("modal-open");

    selectedProfessional = null;

}

closeModal.addEventListener("click", closeProfileModal);
modalOverlay.addEventListener("click", closeProfileModal);


// =========================================
// 13. OPEN HIRING FORM
// =========================================

function openHiringForm() {

    if (!isClient()) {

        closeProfileModal();

        window.location.href = "../login.html";

        return;

    }

    if (!selectedProfessional) return;

    profileModal.classList.remove("show");

    hireModal.classList.add("show");

    document.body.classList.add("modal-open");

}


function closeHiringForm() {

    hireModal.classList.remove("show");

    document.body.classList.remove("modal-open");

}


closeHireModal.addEventListener("click", closeHiringForm);
hireOverlay.addEventListener("click", closeHiringForm);


// =========================================
// 14. HIRING FORM SUBMISSION
// =========================================

hireForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!isClient()) {

        alert("Please sign in with a client account to continue.");

        window.location.href = "../login.html";

        return;

    }

    if (!selectedProfessional) {

        alert("Please select a professional first.");

        return;

    }

    const projectTitle =
        document.getElementById("projectTitle").value.trim();

    const projectBudget =
        Number(document.getElementById("projectBudget").value);

    const projectDeadline =
        document.getElementById("projectDeadline").value;

    const projectDescription =
        document.getElementById("projectDescription").value.trim();


    if (
        !projectTitle ||
        !projectBudget ||
        projectBudget <= 0 ||
        !projectDeadline ||
        !projectDescription
    ) {

        alert("Please complete all project details.");

        return;

    }


    /*
       DEMO ONLY:
       No project is created or sent to a database yet.

       The real version will send this information to the backend,
       where the client account and professional will be validated.
    */

    alert(
        `Demo hiring form completed!\n\n` +
        `Professional: ${selectedProfessional.name}\n` +
        `Project: ${projectTitle}\n` +
        `Budget: $${projectBudget}\n` +
        `Deadline: ${projectDeadline}\n\n` +
        `Backend integration is required to submit this project.`
    );

    hireForm.reset();

    closeHiringForm();

});


// =========================================
// 15. SEARCH EVENTS
// =========================================

professionalSearch.addEventListener("input", renderProfessionals);

searchButton.addEventListener("click", renderProfessionals);

professionalSearch.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        renderProfessionals();

    }

});


// =========================================
// 16. FILTER EVENTS
// =========================================

document.querySelectorAll('input[name="experience"]').forEach(input => {

    input.addEventListener("change", renderProfessionals);

});

countryFilter.addEventListener("change", renderProfessionals);
ratingFilter.addEventListener("change", renderProfessionals);
verifiedFilter.addEventListener("change", renderProfessionals);
sortFilter.addEventListener("change", renderProfessionals);


// =========================================
// 17. RESET FILTERS
// =========================================

function clearAllFilters() {

    professionalSearch.value = "";

    document.querySelector(
        'input[name="experience"][value="all"]'
    ).checked = true;

    countryFilter.value = "all";
    ratingFilter.value = "0";
    verifiedFilter.checked = false;
    sortFilter.value = "recommended";

    renderProfessionals();

}


resetFilters.addEventListener("click", clearAllFilters);
clearFilters.addEventListener("click", clearAllFilters);


// =========================================
// 18. PROFILE BUTTON EVENTS
// =========================================

professionalsGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".view-profile-btn");

    if (!button) return;

    openProfile(button.dataset.profileId);

});


// =========================================
// 19. MOBILE NAVIGATION
// =========================================

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {

        icon.classList.replace("fa-bars", "fa-times");

    } else {

        icon.classList.replace("fa-times", "fa-bars");

    }

});


document.querySelectorAll("#navLinks a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    });

});


// =========================================
// 20. MODAL KEYBOARD SUPPORT
// =========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeProfileModal();

        closeHiringForm();

    }

});


// =========================================
// 21. FOOTER YEAR
// =========================================

document.getElementById("copyrightYear").textContent =
    new Date().getFullYear();


// =========================================
// 22. INITIALIZE PAGE
// =========================================

updateCategoryHeading();

renderProfessionals();

console.log(`VORVENA demo profiles loaded: ${professionals.length}`);
