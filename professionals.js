/* =========================================
   VORVENA PROFESSIONALS PAGE
   FRONTEND DEMO VERSION
   =========================================

   IMPORTANT:
   Sample profiles are demo data, not real registered users.
   Login, hiring offers and payments are demo-only here
   (they live in this browser's storage). In production they
   must be validated and stored by the backend.
*/


// =========================================
// 1. SPECIALTY DATA
// =========================================

const specialties = {
    "fullstack-developer": { title: "Full Stack Developers", category: "Development & IT", description: "Find professionals skilled in building complete web applications." },
    "frontend-developer": { title: "Frontend Developers", category: "Development & IT", description: "Discover developers who create beautiful and responsive interfaces." },
    "backend-developer": { title: "Backend Developers", category: "Development & IT", description: "Find experts who build powerful server-side applications." },
    "mobile-app-developer": { title: "Mobile App Developers", category: "Development & IT", description: "Discover developers who build mobile applications." },
    "wordpress-developer": { title: "WordPress Developers", category: "Development & IT", description: "Find professionals who build and manage WordPress websites." },
    "web-developer": { title: "Web Developers", category: "Development & IT", description: "Find professionals who build and maintain websites and web applications." },
    "qa-engineer": { title: "QA Engineers", category: "Development & IT", description: "Find professionals who test software and help ensure product quality." },
    "software-engineer": { title: "Software Engineers", category: "Development & IT", description: "Explore professionals who develop software solutions." },
    "cybersecurity-specialist": { title: "Cybersecurity Specialists", category: "Development & IT", description: "Find experts who help protect digital systems." },
    "devops-engineer": { title: "DevOps Engineers", category: "Development & IT", description: "Discover professionals who manage deployment and infrastructure." },

    "ui-ux-designer": { title: "UI/UX Designers", category: "Design & Creative", description: "Find designers who create intuitive digital experiences." },
    "graphic-designer": { title: "Graphic Designers", category: "Design & Creative", description: "Discover creative professionals for your visual projects." },
    "brand-designer": { title: "Brand Designers", category: "Design & Creative", description: "Find designers who create memorable brand identities." },
    "motion-designer": { title: "Motion Designers", category: "Design & Creative", description: "Explore professionals who create animated visual content." },
    "video-editor": { title: "Video Editors", category: "Design & Creative", description: "Find skilled video editors for your projects." },
    "3d-designer": { title: "3D Designers", category: "Design & Creative", description: "Discover professionals who create three-dimensional designs." },
    "product-designer": { title: "Product Designers", category: "Design & Creative", description: "Find designers who shape digital and physical products." },
    "illustrator": { title: "Illustrators", category: "Design & Creative", description: "Explore creative illustrators for your next project." },

    "data-analyst": { title: "Data Analysts", category: "Data & Analytics", description: "Find professionals who turn data into useful insights." },
    "data-scientist": { title: "Data Scientists", category: "Data & Analytics", description: "Discover experts in data science and predictive analysis." },
    "machine-learning-engineer": { title: "Machine Learning Engineers", category: "AI & Automation", description: "Find engineers who build machine learning solutions." },
    "ai-engineer": { title: "AI Engineers", category: "AI & Automation", description: "Find engineers who build practical artificial intelligence solutions." },
    "data-engineer": { title: "Data Engineers", category: "Data & Analytics", description: "Find professionals who build data systems and pipelines." },
    "business-intelligence-analyst": { title: "Business Intelligence Analysts", category: "Data & Analytics", description: "Discover analysts who turn business data into insights." },
    "prompt-engineer": { title: "Prompt Engineers", category: "AI & Automation", description: "Find specialists who design and improve prompts for AI tools." },

    "digital-marketer": { title: "Digital Marketers", category: "Digital & Growth", description: "Find professionals who grow businesses online." },
    "seo-specialist": { title: "SEO Specialists", category: "Digital & Growth", description: "Discover experts who improve website search visibility." },
    "social-media-manager": { title: "Social Media Managers", category: "Digital & Growth", description: "Find professionals who manage and grow social media accounts." },
    "content-strategist": { title: "Content Strategists", category: "Digital & Growth", description: "Find specialists who plan and create effective content strategies." },
    "copywriter": { title: "Copywriters", category: "Digital & Growth", description: "Find writers who create persuasive marketing copy." },
    "email-marketing-specialist": { title: "Email Marketing Specialists", category: "Digital & Growth", description: "Discover professionals who build effective email campaigns." },
    "growth-marketer": { title: "Growth Marketers", category: "Digital & Growth", description: "Find experts who help businesses grow." },

    "shopify-developer": { title: "Shopify Developers", category: "Development & IT", description: "Find professionals who build and customise Shopify stores." },
    "webflow-developer": { title: "Webflow Developers", category: "Development & IT", description: "Discover developers who build custom-quality sites in Webflow." },

    "chatbot-developer": { title: "Chatbot Developers", category: "AI & Automation", description: "Find developers who build support and sales chatbots." },
    "ai-integration-developer": { title: "AI Integration Developers", category: "AI & Automation", description: "Discover developers who add AI to the tools you already use." },
    "automation-expert": { title: "Automation Experts", category: "AI & Automation", description: "Find experts who remove repetitive work with automation." },
    "workflow-automation-expert": { title: "n8n & Zapier Experts", category: "AI & Automation", description: "Discover experts who build workflows in n8n, Zapier and similar tools." },
    "ai-video-creator": { title: "AI Video Creators", category: "AI & Automation", description: "Find creators who produce AI-assisted video and edits." },
    "vibe-coder": { title: "Vibe Coders", category: "AI & Automation", description: "Discover builders who ship products fast with AI-assisted coding." },
    "ai-consultant": { title: "AI Consultants", category: "AI & Automation", description: "Find consultants who guide AI strategy and adoption." },

    "data-visualization-specialist": { title: "Data Visualization Specialists", category: "Data & Analytics", description: "Discover specialists who turn data into clear charts and stories." },
    "power-bi-specialist": { title: "Power BI Specialists", category: "Data & Analytics", description: "Find specialists who build reports and dashboards in Power BI." },
    "business-analyst": { title: "Business Analysts", category: "Data & Analytics", description: "Discover analysts who turn business requirements into results." },
    "database-administrator": { title: "Database Administrators", category: "Data & Analytics", description: "Find administrators who keep databases fast, safe and reliable." },
    "web-scraping-expert": { title: "Web Scraping Experts", category: "Data & Analytics", description: "Discover experts who collect data from the web at scale." },
    "quantitative-researcher": { title: "Quantitative Researchers", category: "Data & Analytics", description: "Find researchers who apply statistics to complex problems." },

    "prototyping-specialist": { title: "Prototyping Specialists", category: "Design & Creative", description: "Discover specialists who build clickable prototypes." },
    "presentation-designer": { title: "Presentation Designers", category: "Design & Creative", description: "Find designers who create presentations that persuade." },

    "google-ads-expert": { title: "Google Ads Experts", category: "Digital & Growth", description: "Discover experts who run paid search campaigns that convert." },
    "meta-ads-specialist": { title: "Meta Ads Specialists", category: "Digital & Growth", description: "Find specialists who run Facebook and Instagram ad campaigns." },
    "marketing-automation-consultant": { title: "Marketing Automation Consultants", category: "Digital & Growth", description: "Discover consultants who nurture leads with marketing automation." },
    "lead-generation-specialist": { title: "Lead Generation Specialists", category: "Digital & Growth", description: "Find specialists who fill your sales pipeline." },
    "marketing-strategist": { title: "Marketing Strategists", category: "Digital & Growth", description: "Discover strategists who shape positioning and marketing plans." },

    "virtual-assistant": { title: "Virtual Assistants", category: "Admin & Support", description: "Find assistants who handle day-to-day business support." },
    "data-entry-specialist": { title: "Data Entry Specialists", category: "Admin & Support", description: "Discover specialists who provide fast, accurate data entry." },
    "bookkeeper": { title: "Bookkeepers", category: "Admin & Support", description: "Find bookkeepers who keep your financial records in order." },
    "excel-expert": { title: "Excel Experts", category: "Admin & Support", description: "Discover experts in Excel formulas, models and reports." },
    "customer-service-representative": { title: "Customer Service Representatives", category: "Admin & Support", description: "Find representatives who give customers friendly, quick replies." },
    "appointment-setter": { title: "Appointment Setters", category: "Admin & Support", description: "Discover appointment setters who fill your calendar." },
    "personal-assistant": { title: "Personal Assistants", category: "Admin & Support", description: "Find assistants who manage schedules and errands." },
    "powerpoint-expert": { title: "PowerPoint Experts", category: "Admin & Support", description: "Discover experts who build clean, professional slides." },
    "quickbooks-consultant": { title: "QuickBooks Consultants", category: "Admin & Support", description: "Find consultants who set up and manage QuickBooks accounting." },
    "project-manager": { title: "Project Managers", category: "Admin & Support", description: "Discover project managers who keep work on track." }
};


// =========================================
// 2. SAMPLE PROFILE DATA
// =========================================

const demoFirstNames = [
    "Alex", "Samuel", "Sarah", "Michael", "James", "Grace",
    "Daniel", "Olivia", "David", "Amara", "Chidi", "Fatima",
    "Liam", "Sophia", "Emeka", "Hannah", "Noah", "Zainab",
    "Ethan", "Ngozi", "Lucas", "Maya", "Tunde", "Chloe"
];

const demoLastNames = [
    "Morgan", "Okafor", "Johnson", "Adams", "Wilson", "Williams",
    "Chen", "Brown"
];

function getDemoName(profileNumber) {
    const first = demoFirstNames[profileNumber % demoFirstNames.length];
    const cycle = Math.floor(profileNumber / demoFirstNames.length);
    const last = demoLastNames[(profileNumber + cycle) % demoLastNames.length];
    return first + " " + last;
}

const demoBioTemplates = [
    role => `${role} with years of hands-on experience delivering polished, reliable work for clients around the world.`,
    role => `${role} who enjoys turning clear briefs into practical results, with steady communication from start to finish.`,
    role => `${role} building a track record on VORVENA with careful, on-time work and a focus on what clients need.`
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

const skillLibrary = {
    "fullstack-developer": ["React", "Node.js", "JavaScript", "MongoDB"],
    "frontend-developer": ["HTML", "CSS", "JavaScript", "React"],
    "backend-developer": ["Node.js", "Python", "SQL", "API Development"],
    "mobile-app-developer": ["Flutter", "Dart", "Firebase"],
    "wordpress-developer": ["WordPress", "PHP", "Elementor", "CSS"],
    "web-developer": ["HTML", "CSS", "JavaScript", "Responsive Design"],
    "qa-engineer": ["Software Testing", "Test Automation", "Bug Tracking"],
    "software-engineer": ["Python", "JavaScript", "Git", "Software Design"],
    "cybersecurity-specialist": ["Network Security", "Linux", "Security Auditing"],
    "devops-engineer": ["Docker", "AWS", "Linux", "CI/CD"],

    "ui-ux-designer": ["Figma", "Wireframing", "Prototyping", "Research"],
    "graphic-designer": ["Photoshop", "Illustrator", "Branding"],
    "brand-designer": ["Illustrator", "Logo Design", "Brand Identity"],
    "motion-designer": ["After Effects", "Animation", "Premiere Pro"],
    "video-editor": ["Premiere Pro", "DaVinci Resolve", "Video Editing"],
    "3d-designer": ["Blender", "3D Modelling", "Rendering"],
    "product-designer": ["Figma", "Product Design", "Prototyping"],
    "illustrator": ["Digital Illustration", "Procreate", "Drawing"],

    "data-analyst": ["Python", "SQL", "Power BI", "Excel"],
    "data-scientist": ["Python", "Statistics", "Machine Learning"],
    "machine-learning-engineer": ["Python", "TensorFlow", "PyTorch"],
    "ai-engineer": ["Python", "AI Integration", "APIs"],
    "data-engineer": ["SQL", "Python", "Data Pipelines"],
    "business-intelligence-analyst": ["Power BI", "Excel", "SQL"],
    "prompt-engineer": ["Python", "Automation", "AI Tools"],

    "digital-marketer": ["SEO", "Social Media", "Content Strategy"],
    "seo-specialist": ["SEO", "Keyword Research", "Google Analytics"],
    "social-media-manager": ["Content Planning", "Instagram", "Analytics"],
    "content-strategist": ["Blog Writing", "Research", "Editing"],
    "copywriter": ["Copywriting", "Advertising", "Brand Messaging"],
    "email-marketing-specialist": ["Email Campaigns", "Mailchimp", "Automation"],
    "growth-marketer": ["Growth Strategy", "Analytics", "Marketing"],

    "shopify-developer": ["Shopify", "Liquid", "E-commerce", "Theme Customisation"],
    "webflow-developer": ["Webflow", "CMS", "Responsive Design", "Interactions"],
    "chatbot-developer": ["Chatbots", "Conversational AI", "APIs", "Automation"],
    "ai-integration-developer": ["AI APIs", "Python", "JavaScript", "Integrations"],
    "automation-expert": ["Automation", "APIs", "Scripting", "Workflows"],
    "workflow-automation-expert": ["n8n", "Zapier", "Make", "Workflows"],
    "ai-video-creator": ["AI Video Tools", "Video Editing", "Storytelling"],
    "vibe-coder": ["AI Coding Tools", "Prototyping", "JavaScript", "Rapid Building"],
    "ai-consultant": ["AI Strategy", "Process Automation", "Training", "Research"],
    "data-visualization-specialist": ["Tableau", "Data Storytelling", "Charts", "Dashboards"],
    "power-bi-specialist": ["Power BI", "DAX", "Data Modelling", "Reports"],
    "business-analyst": ["Requirements Analysis", "Process Mapping", "Excel", "Documentation"],
    "database-administrator": ["SQL", "Database Tuning", "Backups", "Security"],
    "web-scraping-expert": ["Python", "Web Scraping", "Data Cleaning", "APIs"],
    "quantitative-researcher": ["Statistics", "Python", "R", "Research"],
    "prototyping-specialist": ["Figma", "Prototyping", "User Flows", "Usability Testing"],
    "presentation-designer": ["PowerPoint", "Keynote", "Slide Design", "Storytelling"],
    "google-ads-expert": ["Google Ads", "Keyword Research", "Conversion Tracking", "Analytics"],
    "meta-ads-specialist": ["Meta Ads", "Audience Targeting", "Ad Creative", "Analytics"],
    "marketing-automation-consultant": ["HubSpot", "Email Flows", "Lead Nurturing", "CRM"],
    "lead-generation-specialist": ["Lead Generation", "Outreach", "CRM", "Prospecting"],
    "marketing-strategist": ["Marketing Strategy", "Positioning", "Market Research", "Planning"],
    "virtual-assistant": ["Scheduling", "Email Management", "Research", "Communication"],
    "data-entry-specialist": ["Data Entry", "Accuracy", "Excel", "Typing Speed"],
    "bookkeeper": ["Bookkeeping", "Reconciliation", "Invoicing", "Excel"],
    "excel-expert": ["Excel", "Formulas", "Pivot Tables", "Financial Models"],
    "customer-service-representative": ["Customer Support", "Live Chat", "Email Support", "Communication"],
    "appointment-setter": ["Cold Calling", "Scheduling", "CRM", "Communication"],
    "personal-assistant": ["Calendar Management", "Travel Planning", "Organisation", "Communication"],
    "powerpoint-expert": ["PowerPoint", "Slide Design", "Presentations", "Infographics"],
    "quickbooks-consultant": ["QuickBooks", "Bookkeeping", "Accounting Set-up", "Reporting"],
    "project-manager": ["Project Planning", "Agile", "Team Coordination", "Risk Management"]
};


// Generate exactly 3 sample profiles per specialty.

const DEMO_PROFILES_PER_SPECIALTY = 3;

// ✅ FIX: Sample profiles now show by default so the page is never empty.
// To hide them in production, open with  ?preview=real
// (or change this line to `!== "samples"` if you prefer the old behaviour).
const SHOW_SAMPLE_PROFILES =
    new URLSearchParams(window.location.search).get("preview") !== "real";

const professionals = [];

let profileId = 1;

Object.keys(specialties).forEach((specialty, specialtyIndex) => {

    const specialtyInfo = specialties[specialty];
    const role = specialtyInfo.title.replace(/s$/, "");

    for (let i = 0; i < DEMO_PROFILES_PER_SPECIALTY; i++) {

        const name = getDemoName(specialtyIndex * DEMO_PROFILES_PER_SPECIALTY + i);

        professionals.push({
            id: profileId++,
            name,
            role,
            specialty,
            country: countries[(specialtyIndex + i) % countries.length],
            rating: 0,
            jobs: 0,
            verified: false,
            isDemo: true,
            experience: experienceLevels[i],
            bio: demoBioTemplates[i](role),
            skills: skillLibrary[specialty] || ["Communication", "Problem Solving"],
            initials: name.split(" ").map(part => part[0]).join("")
        });

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
const selectedSpecialty = (urlParams.get("category") || "").trim().toLowerCase();

const currentSpecialty = specialties[selectedSpecialty] || null;

let selectedProfessional = null;


// =========================================
// 4B. REGISTERED PROFESSIONALS
// =========================================

const DIRECTORY_KEY = "vorvenaProfessionalDirectory";

function escapeHTML(value) {
    return String(value === null || value === undefined ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getSuspendedProfessionalIds() {

    const blocked = new Set();

    try {

        const accounts = JSON.parse(localStorage.getItem("vorvenaAccounts") || "{}") || {};

        Object.values(accounts).forEach(account => {

            if (
                account &&
                account.status &&
                account.status !== "active" &&
                account.profile &&
                account.profile.professionalId
            ) {
                blocked.add(account.profile.professionalId);
            }

        });

    } catch (error) { /* ignore */ }

    return blocked;

}

function buildRegisteredProfile(card, photo) {

    const name = String(card.name).trim();

    const rawSkills = Array.isArray(card.skills)
        ? card.skills
        : String(card.skills || "").split(",");

    const skills = rawSkills
        .map(skill => String(skill).trim())
        .filter(Boolean)
        .slice(0, 8);

    const rawExperience = String(card.experience || "").toLowerCase();

    const experience =
        rawExperience === "expert" || rawExperience === "experienced"
            ? "expert"
            : rawExperience === "intermediate"
                ? "intermediate"
                : "entry";

    return {
        id: card.professionalId,
        professionalId: card.professionalId,
        name,
        role: card.role || specialties[card.specialty].title.replace(/s$/, ""),
        specialty: card.specialty,
        country: card.country || "",
        rating: 0,
        jobs: 0,
        verified: Boolean(card.skillProofPassed),
        experience,
        bio: card.bio || "New professional on VORVENA.",
        skills: skills.length ? skills : (skillLibrary[card.specialty] || ["Communication", "Problem Solving"]),
        initials: name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase(),
        photo: typeof photo === "string" && photo.indexOf("data:image/") === 0 ? photo : "",
        isRegistered: true
    };

}

function getRegisteredProfessionals() {

    let directory = [];

    try {
        directory = JSON.parse(localStorage.getItem(DIRECTORY_KEY) || "[]");
    } catch (error) {
        directory = [];
    }

    if (!Array.isArray(directory)) directory = [];

    const blocked = getSuspendedProfessionalIds();
    const seen = new Set();
    const registered = [];

    directory.forEach(card => {

        if (
            !card ||
            !card.professionalId ||
            !card.name ||
            !specialties[card.specialty] ||
            blocked.has(card.professionalId) ||
            seen.has(card.professionalId)
        ) {
            return;
        }

        seen.add(card.professionalId);
        registered.push(buildRegisteredProfile(card, card.photo));

    });

    try {

        const accounts = JSON.parse(localStorage.getItem("vorvenaAccounts") || "{}") || {};

        Object.keys(accounts).forEach(email => {

            const account = accounts[email];
            const profile = account && account.profile;

            if (
                !account ||
                account.role !== "professional" ||
                !account.onboardingComplete ||
                (account.status && account.status !== "active") ||
                !profile ||
                !profile.professionalId ||
                !(profile.fullName || account.fullName) ||
                !specialties[profile.specialty] ||
                blocked.has(profile.professionalId) ||
                seen.has(profile.professionalId)
            ) {
                return;
            }

            seen.add(profile.professionalId);

            let photo = "";

            try {
                photo = localStorage.getItem("vorvenaAccountImage:" + email) || "";
            } catch (error) { /* ignore */ }

            registered.push(buildRegisteredProfile({
                professionalId: profile.professionalId,
                name: profile.fullName || account.fullName,
                specialty: profile.specialty,
                role: profile.role,
                country: profile.country,
                bio: profile.bio,
                skills: profile.skills,
                experience: profile.experience,
                skillProofPassed: profile.skillProofPassed
            }, photo));

        });

    } catch (error) { /* ignore */ }

    return registered;

}

// ✅ FIX: Always show sample profiles alongside real ones (unless ?preview=real).
// Real professionals appear first, then samples fill up to a minimum of 3 cards.
function getAllProfessionals(onlySpecialty) {

    const registered = getRegisteredProfessionals();
    const pool = [];

    const slugs = onlySpecialty ? [onlySpecialty] : Object.keys(specialties);

    slugs.forEach(specialty => {

        const real = registered.filter(person => person.specialty === specialty);

        const samples = SHOW_SAMPLE_PROFILES
            ? professionals
                .filter(person => person.specialty === specialty)
                .slice(0, Math.max(0, DEMO_PROFILES_PER_SPECIALTY - real.length))
            : [];

        pool.push(...real, ...samples);

    });

    return pool;

}

function avatarHTML(person) {

    if (person.photo) {
        return `<img src="${escapeHTML(person.photo)}" alt="${escapeHTML(person.name)}">`;
    }

    return escapeHTML(person.initials);

}

function ratingText(person) {
    return person.rating > 0 ? person.rating.toFixed(1) : "New";
}

const baseCountryValues = new Set([...countryFilter.options].map(option => option.value));

function syncCountryOptions() {

    const needed = new Set(
        getRegisteredProfessionals()
            .map(person => person.country)
            .filter(Boolean)
    );

    [...countryFilter.options].forEach(option => {

        if (!baseCountryValues.has(option.value) && !needed.has(option.value)) {

            if (countryFilter.value === option.value) {
                countryFilter.value = "all";
            }

            option.remove();

        }

    });

    const present = new Set([...countryFilter.options].map(option => option.value));

    needed.forEach(country => {

        if (!present.has(country)) {

            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countryFilter.appendChild(option);

        }

    });

}


// =========================================
// 5. AUTHENTICATION  (✅ FIX: more forgiving)
// =========================================
// Reads login state from localStorage OR sessionStorage and accepts
// any of the common role-key names your login page may use.

function readStoredObject(key) {

    const sources = [localStorage, sessionStorage];

    for (const storage of sources) {

        try {

            const value = storage.getItem(key);

            if (!value) continue;

            const parsed = JSON.parse(value);

            if (parsed && typeof parsed === "object") {
                return parsed;
            }

        } catch (error) {
            console.warn(`Could not read ${key}.`);
        }

    }

    return null;

}

// ✅ FIX: read a key from either storage
function readStoredValue(key) {
    try {
        const ls = localStorage.getItem(key);
        if (ls !== null && ls !== "") return ls;
    } catch (e) { /* ignore */ }
    try {
        const ss = sessionStorage.getItem(key);
        if (ss !== null && ss !== "") return ss;
    } catch (e) { /* ignore */ }
    return null;
}

function getCurrentUser() {

    // ✅ FIX: check both storages
    const loggedInRaw =
        readStoredValue("vorvenaLoggedIn") ||
        readStoredValue("isLoggedIn") ||
        readStoredValue("loggedIn");

    const sessionRole = String(
        readStoredValue("vorvenaLoggedInRole") ||
        readStoredValue("userRole") ||
        readStoredValue("role") ||
        ""
    ).toLowerCase().trim();

    const sessionEmail =
        readStoredValue("vorvenaLoggedInEmail") ||
        readStoredValue("userEmail") ||
        "";

    const clientProfile = readStoredObject("vorvenaClientProfile");
    const professionalProfile = readStoredObject("vorvenaProfessionalProfile");

    const loggedIn = loggedInRaw === "true" || loggedInRaw === true;

    if (loggedIn && sessionRole === "client") {
        return {
            ...(clientProfile || {}),
            role: "client",
            email: sessionEmail || clientProfile?.email || ""
        };
    }

    if (loggedIn && sessionRole === "professional") {
        return {
            ...(professionalProfile || {}),
            role: "professional",
            email: sessionEmail || professionalProfile?.email || ""
        };
    }

    // Fallback: some login flows only write the profile objects.
    if (clientProfile && (clientProfile.role === "client" || clientProfile.userRole === "client")) {
        return { ...clientProfile, role: "client" };
    }
    if (professionalProfile && (professionalProfile.role === "professional" || professionalProfile.userRole === "professional")) {
        return { ...professionalProfile, role: "professional" };
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
    if (!["client", "professional"].includes(role)) return false;

    return true;

}


function isClient() {

    return isLoggedIn() && getUserRole(getCurrentUser()) === "client";

}


function isProfessional() {

    return isLoggedIn() && getUserRole(getCurrentUser()) === "professional";

}


// =========================================
// 6. NAVIGATION AUTHENTICATION
// =========================================

function getPagePrefix() {

    const loginLink = document.querySelector(".nav-login");
    if (!loginLink) return "../";

    const href = loginLink.getAttribute("href") || "";
    const lastSlash = href.lastIndexOf("/");

    return lastSlash >= 0 ? href.substring(0, lastSlash + 1) : "";

}


function getPageLink(filename) {
    return `${getPagePrefix()}${filename}`;
}


function updateNavigation() {

    const loginButton = document.querySelector(".nav-login");
    const signupButton = document.querySelector(".nav-signup");

    let dashboardLink = document.getElementById("navDashboardLink");

    if (!isLoggedIn()) {

        if (loginButton) loginButton.style.display = "";
        if (signupButton) signupButton.style.display = "";
        if (dashboardLink) dashboardLink.remove();

        return;

    }

    if (loginButton) loginButton.style.display = "none";
    if (signupButton) signupButton.style.display = "none";

    if (!dashboardLink && navLinks) {

        dashboardLink = document.createElement("a");
        dashboardLink.id = "navDashboardLink";
        navLinks.appendChild(dashboardLink);

    }

    if (!dashboardLink) return;

    if (isClient()) {
        dashboardLink.href = getPageLink("client-dashboard.html");
        dashboardLink.textContent = "My Dashboard";
    } else if (isProfessional()) {
        dashboardLink.href = getPageLink("professional-dashboard.html");
        dashboardLink.textContent = "My Dashboard";
    }

    dashboardLink.classList.add("nav-dashboard-link");

}


// =========================================
// 7. UPDATE PAGE CATEGORY
// =========================================

function updateCategoryHeading() {

    if (!currentSpecialty) {

        categoryTitle.textContent = "Choose a Specialty";

        categoryDescription.textContent =
            "Open a specialty from Explore to view matching professionals.";

        breadcrumbCategory.textContent = "Professionals";

        if (emptyState) {

            emptyState.classList.add("show");

            const emptyTitle = emptyState.querySelector("h3");
            const emptyText = emptyState.querySelector("p");

            if (emptyTitle) emptyTitle.textContent = "No specialty selected";
            if (emptyText) {
                emptyText.textContent =
                    "Return to Explore and choose a professional category.";
            }

        }

        return;

    }

    categoryTitle.textContent = currentSpecialty.title;
    categoryDescription.textContent = currentSpecialty.description;
    breadcrumbCategory.textContent = currentSpecialty.title;

}


// =========================================
// 8. FILTER PROFESSIONALS
// =========================================

function getFilteredProfessionals() {

    if (!currentSpecialty) return [];

    let filtered = getAllProfessionals(selectedSpecialty);

    const searchTerm = professionalSearch.value.trim().toLowerCase();

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

    const selectedExperience = document.querySelector(
        'input[name="experience"]:checked'
    )?.value || "all";

    if (selectedExperience !== "all") {
        filtered = filtered.filter(person =>
            person.experience === selectedExperience
        );
    }

    if (countryFilter.value !== "all") {
        filtered = filtered.filter(person =>
            person.country === countryFilter.value
        );
    }

    const minimumRating = Number(ratingFilter.value);

    if (minimumRating > 0) {
        filtered = filtered.filter(person =>
            person.rating >= minimumRating
        );
    }

    if (verifiedFilter.checked) {
        filtered = filtered.filter(person =>
            person.verified
        );
    }

    if (sortFilter.value === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (sortFilter.value === "jobs") {
        filtered.sort((a, b) => b.jobs - a.jobs);
    }

    return filtered;

}


// =========================================
// 9. DISPLAY PROFESSIONAL CARDS
// =========================================

function renderProfessionals() {

    const filtered = getFilteredProfessionals();

    professionalsGrid.innerHTML = "";

    resultsCount.textContent =
        `Showing ${filtered.length} professional${filtered.length === 1 ? "" : "s"}`;

    if (filtered.length === 0) {

        emptyState.classList.add("show");

        if (currentSpecialty) {

            const emptyTitle = emptyState.querySelector("h3");
            const emptyText = emptyState.querySelector("p");
            const term = professionalSearch.value.trim();

            const nobodyYet = getAllProfessionals(selectedSpecialty).length === 0;

            if (emptyTitle) {
                emptyTitle.textContent = nobodyYet
                    ? "No professionals here yet"
                    : "No professionals found";
            }

            if (emptyText && nobodyYet) {
                emptyText.textContent =
                    `No ${currentSpecialty.title} have joined yet. Please check back soon or explore another specialty.`;
            } else if (emptyText) {
                emptyText.textContent = term
                    ? `No ${currentSpecialty.title} match "${term}" with your current filters. Try a different search or clear the filters.`
                    : `No ${currentSpecialty.title} match your current filters. Try adjusting or clearing them.`;
            }

        }

        return;

    }

    emptyState.classList.remove("show");

    filtered.forEach(person => {

        const card = document.createElement("article");
        card.className = "professional-card";

        const verificationBadge = person.verified
            ? `<span class="verified-badge" title="SkillProof passed">
                    <i class="fas fa-check"></i>
               </span>`
            : "";

        const statsHTML = person.isDemo
            ? `<span class="professional-stat">
                    <i class="fas fa-flask"></i>
                    Sample profile
               </span>`
            : `<span class="professional-stat">
                    <i class="fas fa-star"></i>
                    ${ratingText(person)}
               </span>

               <span class="professional-stat">
                    <i class="fas fa-briefcase"></i>
                    ${person.jobs} jobs
               </span>`;

        card.innerHTML = `
            <div class="professional-card-top">

                <div class="professional-avatar">
                    ${avatarHTML(person)}
                </div>

                <div class="professional-info">

                    <h3>
                        ${escapeHTML(person.name)}
                        ${verificationBadge}
                    </h3>

                    <span class="professional-role">
                        ${escapeHTML(person.role)}
                    </span>

                </div>

            </div>

            <div class="professional-location">
                <i class="fas fa-map-marker-alt"></i>
                ${escapeHTML(person.country || "Location not shared")}
            </div>

            <p class="professional-bio">
                ${escapeHTML(person.bio)}
            </p>

            <div class="professional-stats">

                ${statsHTML}

            </div>

            <div class="professional-card-bottom">

                <span class="experience-tag">
                    ${formatExperience(person.experience)}
                </span>

                <button
                    class="view-profile-btn"
                    type="button"
                    data-profile-id="${escapeHTML(person.id)}"
                >
                    View Profile
                </button>

            </div>
        `;

        professionalsGrid.appendChild(card);

    });

}



function formatExperience(experience) {
    const labels = {
        entry: "Entry Level",
        intermediate: "Intermediate",
        expert: "Expert"
    };

    return escapeHTML(labels[experience] || experience || "Not specified");
}


// =========================================
// 11. CHECK REGISTERED PROFESSIONAL
// =========================================
// ✅ FIX: Sample profiles are now "hireable" too, so the demo flow works.
// Real professionals are still preferred when both exist.

function isRegisteredProfessional(person) {
    if (!person) return false;

    // Real professional record
    if (person.isDemo !== true && person.demo !== true) {
        return Boolean(person.professionalId || person.userId || person.email);
    }

    // Sample profile — allow hiring in the demo.
    return true;
}


// =========================================
// 12. OPEN PROFESSIONAL PROFILE
// =========================================

function openProfile(professionalId) {
    const person = getAllProfessionals(selectedSpecialty).find(
        item => String(item.id) === String(professionalId)
    );

    if (!person) return;

    selectedProfessional = person;

    const verificationBadge = person.verified
        ? `<span class="verified-badge">
                <i class="fas fa-check"></i>
           </span>`
        : "";

    const skillsHTML = (Array.isArray(person.skills) ? person.skills : [])
        .map(skill =>
            `<span class="experience-tag">${escapeHTML(skill)}</span>`
        )
        .join("");

    const rating = Number(person.rating);
    const jobs = Number(person.jobs);

    const statsHTML = person.isDemo
        ? `<span class="professional-stat">
                <i class="fas fa-flask"></i>
                Sample profile (demo)
           </span>`
        : `<span class="professional-stat">
                <i class="fas fa-star"></i>
                ${Number.isFinite(rating) && rating > 0
                    ? rating.toFixed(1) + " Rating"
                    : "New on VORVENA"}
           </span>

           <span class="professional-stat">
                <i class="fas fa-briefcase"></i>
                ${Number.isFinite(jobs) ? jobs : 0} Completed Jobs
           </span>`;

    modalProfileContent.innerHTML = `
        <div class="professional-avatar modal-avatar">
            ${avatarHTML(person)}
        </div>

        <h2>
            ${escapeHTML(person.name)}
            ${verificationBadge}
        </h2>

        <p class="professional-role">
            ${escapeHTML(person.role)}
        </p>

        <p class="professional-location">
            <i class="fas fa-map-marker-alt"></i>
            ${escapeHTML(person.country || "Location not shared")}
        </p>

        <div class="professional-stats">

            ${statsHTML}

        </div>

        <h3 class="modal-section-title">About Me</h3>

        <p class="professional-bio modal-bio">
            ${escapeHTML(person.bio || "No biography provided yet.")}
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
// 13. CONTROL PROFILE ACCESS
// =========================================

function updateProfileAccess() {

    if (!isLoggedIn()) {

        authContent.innerHTML = `
            <span class="auth-label">JOIN VORVENA</span>

            <h2>Ready to hire?</h2>

            <p>
                Create an account or sign in to hire talented
                professionals and manage your projects.
            </p>

            <a href="${getPageLink("client-signup.html")}" class="auth-option">
                <i class="fas fa-envelope"></i>
                Continue with Email
            </a>

            <button type="button" class="auth-option" id="googleAuthButton">
                <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
                    <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"/>
                    <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"/>
                    <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
                    <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"/>
                </svg>
                Sign in with Google
            </button>

            <p class="auth-google-note" id="googleAuthNote" role="status" style="display:none"></p>

            <p class="auth-terms">
                Already have an account?
                <a href="${getPageLink("login.html")}">Log In</a>
            </p>
        `;

        document.getElementById("googleAuthButton")
            .addEventListener("click", function () {
                const note = document.getElementById("googleAuthNote");
                note.textContent = "Google sign-in is not connected yet.";
                note.style.display = "block";
            });

        return;
    }


    if (isClient()) {

        // ✅ FIX: clients can hire sample profiles too (demo mode).
        if (!isRegisteredProfessional(selectedProfessional)) {

            authContent.innerHTML = `
                <span class="auth-label">PROFILE UNAVAILABLE</span>
                <h2>Can't hire this profile</h2>
                <p>This profile cannot be hired right now.</p>
            `;

            return;
        }

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


    if (isProfessional()) {

        authContent.innerHTML = `
            <span class="auth-label">PROFESSIONAL ACCOUNT</span>

            <h2>Welcome back.</h2>

            <p>
                You're signed in as a professional.
                Hiring other professionals is available through a client account.
            </p>

            <a href="${getPageLink("professional-dashboard.html")}" class="auth-option">
                <i class="fas fa-th-large"></i>
                My Dashboard
            </a>
        `;

    }
}


// =========================================
// 14. CLOSE PROFILE MODAL
// =========================================

function closeProfileModal() {

    profileModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    selectedProfessional = null;

}

closeModal.addEventListener("click", closeProfileModal);
modalOverlay.addEventListener("click", closeProfileModal);


// =========================================
// 15. OPEN HIRING FORM
// =========================================

function openHiringForm() {

    if (!isClient()) {

        closeProfileModal();
        window.location.href = getPageLink("login.html");
        return;

    }

    if (!selectedProfessional) return;

    // ✅ FIX: sample profiles are allowed in demo mode.
    if (!isRegisteredProfessional(selectedProfessional)) {
        alert("Hiring is unavailable for this profile.");
        return;
    }

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
// 16. SHARED HIRING OFFERS
// =========================================

const SHARED_OFFERS_KEY = "vorvenaSharedOffers";
const CURRENCY_SYMBOL = "$";


function getSharedOffers() {

    try {

        const offers = JSON.parse(
            localStorage.getItem(SHARED_OFFERS_KEY) || "[]"
        );

        return Array.isArray(offers) ? offers : [];

    } catch (error) {

        console.error("Could not read shared hiring offers.", error);
        return [];

    }

}


function saveSharedOffers(offers) {

    try {

        localStorage.setItem(
            SHARED_OFFERS_KEY,
            JSON.stringify(offers)
        );

        return true;

    } catch (error) {

        console.error("Could not save shared hiring offers.", error);
        return false;

    }

}


function getClientDetails() {

    const user = getCurrentUser() || {};
    const profile = readStoredObject("vorvenaClientProfile") || {};

    const email =
        user.email ||
        readStoredValue("vorvenaLoggedInEmail") ||
        profile.email ||
        "";

    const name =
        user.fullName ||
        user.name ||
        profile.fullName ||
        profile.name ||
        readStoredValue("vorvenaFullName") ||
        "VORVENA Client";

    return {
        name,
        email: String(email).trim().toLowerCase()
    };

}


// =========================================
// 17. HIRING FORM SUBMISSION
// =========================================

hireForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!isClient()) {

        alert("Please sign in with a client account to continue.");
        window.location.href = getPageLink("login.html");
        return;

    }

    if (!selectedProfessional) {

        alert("Please select a professional first.");
        return;

    }

    if (!isRegisteredProfessional(selectedProfessional)) {

        alert("You cannot send hiring offers to this profile.");
        closeHiringForm();
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
        !Number.isFinite(projectBudget) ||
        projectBudget <= 0 ||
        !projectDeadline ||
        !projectDescription
    ) {

        alert("Please complete all project details.");
        return;

    }


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${projectDeadline}T00:00:00`);

    if (
        Number.isNaN(selectedDate.getTime()) ||
        selectedDate < today
    ) {

        alert("Please choose a valid future project deadline.");
        return;

    }


    const client = getClientDetails();

    const newOffer = {

        id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

        professionalName: selectedProfessional.name,
        professionalRole: selectedProfessional.role,

        professionalEmail: selectedProfessional.email || "",

        professionalId:
            selectedProfessional.professionalId ||
            selectedProfessional.userId ||
            "",

        professionalDemoId: selectedProfessional.id,
        professionalSpecialty: selectedProfessional.specialty,

        title: projectTitle,
        budget: `${CURRENCY_SYMBOL}${projectBudget.toLocaleString("en-US")}`,
        deadline: projectDeadline,
        description: projectDescription,

        clientName: client.name,
        clientEmail: client.email,

        status: "pending",
        createdAt: new Date().toISOString()

    };


    const previousSharedOffers = getSharedOffers();
    const saved = saveSharedOffers([newOffer, ...previousSharedOffers]);

    if (!saved) {

        alert(
            "Your offer could not be saved. Please check your browser storage and try again."
        );

        return;

    }


    try {

        const existingClientOffers = JSON.parse(
            localStorage.getItem("vorvenaClientOffers") || "[]"
        );

        const clientOffers = Array.isArray(existingClientOffers)
            ? existingClientOffers
            : [];

        clientOffers.unshift(newOffer);

        localStorage.setItem(
            "vorvenaClientOffers",
            JSON.stringify(clientOffers)
        );

    } catch (error) {

        console.error("Could not update the client offer list.", error);
        saveSharedOffers(previousSharedOffers);

        alert(
            "Your offer could not be completed, so nothing was sent. " +
            "Please check your browser storage and try again."
        );

        return;

    }


    alert(
        `Hiring offer submitted successfully!\n\n` +
        `Professional: ${selectedProfessional.name}\n` +
        `Project: ${projectTitle}\n` +
        `Budget: ${CURRENCY_SYMBOL}${projectBudget.toLocaleString("en-US")}\n` +
        `Deadline: ${projectDeadline}\n\n` +
        `Your offer has been saved.`
    );

    hireForm.reset();
    closeHiringForm();

});


// =========================================
// 17B. SEARCH EVENTS
// =========================================

professionalSearch.addEventListener("input", renderProfessionals);
searchButton.addEventListener("click", renderProfessionals);

professionalSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        renderProfessionals();
    }
});


// =========================================
// 18. FILTER EVENTS
// =========================================

document.querySelectorAll('input[name="experience"]').forEach(input => {
    input.addEventListener("change", renderProfessionals);
});

countryFilter.addEventListener("change", renderProfessionals);
ratingFilter.addEventListener("change", renderProfessionals);
verifiedFilter.addEventListener("change", renderProfessionals);
sortFilter.addEventListener("change", renderProfessionals);


// =========================================
// 19. RESET FILTERS
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
// 20. PROFILE BUTTON EVENTS
// =========================================

professionalsGrid.addEventListener("click", function (event) {

    const button = event.target.closest(".view-profile-btn");
    if (!button) return;

    openProfile(button.dataset.profileId);

});


// =========================================
// 21. MOBILE NAVIGATION
// =========================================

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.replace("fa-bars", "fa-times");
    } else {
        icon.classList.replace("fa-times", "fa-bars");
    }

});


document.querySelectorAll("#navLinks a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }

    });

});


// =========================================
// 22. MODAL KEYBOARD SUPPORT
// =========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProfileModal();
        closeHiringForm();
    }

});


// =========================================
// 23. REFRESH AUTH AND OFFERS
// =========================================

window.addEventListener("storage", function (event) {

    if (
        event.key === "vorvenaSharedOffers" ||
        event.key === "vorvenaLoggedIn" ||
        event.key === "vorvenaLoggedInRole" ||
        event.key === "vorvenaLoggedInEmail"
    ) {

        updateNavigation();

        if (profileModal.classList.contains("show")) {
            updateProfileAccess();
        }

    }

});


window.addEventListener("focus", function () {

    updateNavigation();

    if (profileModal.classList.contains("show")) {
        updateProfileAccess();
    }

});


// =========================================
// 23B. REFRESH THE LIST WHEN PROFESSIONALS CHANGE
// =========================================

window.addEventListener("storage", function (event) {

    if (
        event.key === DIRECTORY_KEY ||
        event.key === "vorvenaAccounts"
    ) {

        syncCountryOptions();
        renderProfessionals();

    }

});

window.addEventListener("pageshow", function (event) {

    if (event.persisted) {
        syncCountryOptions();
        renderProfessionals();
    }

});


// =========================================
// 24. FOOTER YEAR
// =========================================

document.getElementById("copyrightYear").textContent =
    new Date().getFullYear();


// =========================================
// 25. INITIALIZE PAGE
// =========================================

updateNavigation();
updateCategoryHeading();
syncCountryOptions();
renderProfessionals();

console.log(`VORVENA profiles loaded: ${professionals.length} sample, ${getRegisteredProfessionals().length} registered`);