
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
    "web-developer": {
        title: "Web Developers",
        category: "Dev & IT",
        description: "Find professionals who build and maintain websites and web applications."
    },
    "qa-engineer": {
        title: "QA Engineers",
        category: "Dev & IT",
        description: "Find professionals who test software and help ensure product quality."
    },
    "software-engineer": {
        title: "Software Engineers",
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
    "brand-designer": {
        title: "Brand Designers",
        category: "Design & Creative",
        description: "Find designers who create memorable brand identities."
    },
    "motion-designer": {
        title: "Motion Designers",
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
    "ai-engineer": {
        title: "AI Engineers",
        category: "Data & AI",
        description: "Find engineers who build practical artificial intelligence solutions."
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
    "prompt-engineer": {
        title: "Prompt Engineers",
        category: "Data & AI",
        description: "Find specialists who design and improve prompts for AI tools."
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
    "content-strategist": {
        title: "Content Strategists",
        category: "Digital & Growth",
        description: "Find specialists who plan and create effective content strategies."
    },
    "copywriter": {
        title: "Copywriters",
        category: "Digital & Growth",
        description: "Find writers who create persuasive marketing copy."
    },
    "email-marketing-specialist": {
        title: "Email Marketing Specialists",
        category: "Digital & Growth",
        description: "Discover professionals who build effective email campaigns."
    },
    "growth-marketer": {
        title: "Growth Marketers",
        category: "Digital & Growth",
        description: "Find experts who help businesses grow."
    },

    "shopify-developer": {
        title: "Shopify Developers",
        category: "Dev & IT",
        description: "Find professionals who build and customise Shopify stores."
    },

    "webflow-developer": {
        title: "Webflow Developers",
        category: "Dev & IT",
        description: "Discover developers who build custom-quality sites in Webflow."
    },

    "chatbot-developer": {
        title: "Chatbot Developers",
        category: "Data & AI",
        description: "Find developers who build support and sales chatbots."
    },

    "ai-integration-developer": {
        title: "AI Integration Developers",
        category: "Data & AI",
        description: "Discover developers who add AI to the tools you already use."
    },

    "automation-expert": {
        title: "Automation Experts",
        category: "Data & AI",
        description: "Find experts who remove repetitive work with automation."
    },

    "workflow-automation-expert": {
        title: "n8n & Zapier Experts",
        category: "Data & AI",
        description: "Discover experts who build workflows in n8n, Zapier and similar tools."
    },

    "ai-video-creator": {
        title: "AI Video Creators",
        category: "Data & AI",
        description: "Find creators who produce AI-assisted video and edits."
    },

    "vibe-coder": {
        title: "Vibe Coders",
        category: "Data & AI",
        description: "Discover builders who ship products fast with AI-assisted coding."
    },

    "ai-consultant": {
        title: "AI Consultants",
        category: "Data & AI",
        description: "Find consultants who guide AI strategy and adoption."
    },

    "data-visualization-specialist": {
        title: "Data Visualization Specialists",
        category: "Data & AI",
        description: "Discover specialists who turn data into clear charts and stories."
    },

    "power-bi-specialist": {
        title: "Power BI Specialists",
        category: "Data & AI",
        description: "Find specialists who build reports and dashboards in Power BI."
    },

    "business-analyst": {
        title: "Business Analysts",
        category: "Data & AI",
        description: "Discover analysts who turn business requirements into results."
    },

    "database-administrator": {
        title: "Database Administrators",
        category: "Data & AI",
        description: "Find administrators who keep databases fast, safe and reliable."
    },

    "web-scraping-expert": {
        title: "Web Scraping Experts",
        category: "Data & AI",
        description: "Discover experts who collect data from the web at scale."
    },

    "quantitative-researcher": {
        title: "Quantitative Researchers",
        category: "Data & AI",
        description: "Find researchers who apply statistics to complex problems."
    },

    "prototyping-specialist": {
        title: "Prototyping Specialists",
        category: "Design & Creative",
        description: "Discover specialists who build clickable prototypes."
    },

    "presentation-designer": {
        title: "Presentation Designers",
        category: "Design & Creative",
        description: "Find designers who create presentations that persuade."
    },

    "google-ads-expert": {
        title: "Google Ads Experts",
        category: "Digital & Growth",
        description: "Discover experts who run paid search campaigns that convert."
    },

    "meta-ads-specialist": {
        title: "Meta Ads Specialists",
        category: "Digital & Growth",
        description: "Find specialists who run Facebook and Instagram ad campaigns."
    },

    "marketing-automation-consultant": {
        title: "Marketing Automation Consultants",
        category: "Digital & Growth",
        description: "Discover consultants who nurture leads with marketing automation."
    },

    "lead-generation-specialist": {
        title: "Lead Generation Specialists",
        category: "Digital & Growth",
        description: "Find specialists who fill your sales pipeline."
    },

    "marketing-strategist": {
        title: "Marketing Strategists",
        category: "Digital & Growth",
        description: "Discover strategists who shape positioning and marketing plans."
    },

    "virtual-assistant": {
        title: "Virtual Assistants",
        category: "Admin & Support",
        description: "Find assistants who handle day-to-day business support."
    },

    "data-entry-specialist": {
        title: "Data Entry Specialists",
        category: "Admin & Support",
        description: "Discover specialists who provide fast, accurate data entry."
    },

    "bookkeeper": {
        title: "Bookkeepers",
        category: "Admin & Support",
        description: "Find bookkeepers who keep your financial records in order."
    },

    "excel-expert": {
        title: "Excel Experts",
        category: "Admin & Support",
        description: "Discover experts in Excel formulas, models and reports."
    },

    "customer-service-representative": {
        title: "Customer Service Representatives",
        category: "Admin & Support",
        description: "Find representatives who give customers friendly, quick replies."
    },

    "appointment-setter": {
        title: "Appointment Setters",
        category: "Admin & Support",
        description: "Discover appointment setters who fill your calendar."
    },

    "personal-assistant": {
        title: "Personal Assistants",
        category: "Admin & Support",
        description: "Find assistants who manage schedules and errands."
    },

    "powerpoint-expert": {
        title: "PowerPoint Experts",
        category: "Admin & Support",
        description: "Discover experts who build clean, professional slides."
    },

    "quickbooks-consultant": {
        title: "QuickBooks Consultants",
        category: "Admin & Support",
        description: "Find consultants who set up and manage QuickBooks accounting."
    },

    "project-manager": {
        title: "Project Managers",
        category: "Admin & Support",
        description: "Discover project managers who keep work on track."
    }
};


// =========================================
// 2. DEMO PROFILE DATA
// =========================================

// Every demo profile gets its own name, so no person repeats across
// sub-categories. 24 first names x 8 surnames, picked with a fixed step so
// all 192 (64 sub-categories x 3) combinations are different.
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
    // profileNumber is 0-191. 192 = 24 x 8, and 24 and 8 share a factor,
    // so the surname moves by one every full cycle of first names to keep
    // every pair different.
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


// Generate exactly 3 demo profiles per specialty (the starter profiles that
// keep every sub-category looking the same until real professionals join).

const DEMO_PROFILES_PER_SPECIALTY = 3;

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
            rating: ratings[i],
            jobs: completedJobs[i],
            verified: i !== 2,
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
// When a professional finishes onboarding, a safe public card is saved in
// "vorvenaProfessionalDirectory" (see professional-onboarding.js). This reads
// those cards and shows each one under the sub-category the professional
// picked, ahead of the demo profiles.
// BACKEND: replace with  GET /api/professionals?specialty=<slug>

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

// Turns one saved record (a directory card, or a finished professional
// account) into the same profile shape the demo profiles use, so a real
// professional's card looks exactly like every other card.
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

    // 1. Public cards saved when a professional finished onboarding.
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

    // 2. Safety net: a professional who finished onboarding always appears
    //    under the sub-category they picked, even if their public card was
    //    lost (for example after clearing part of the browser storage).
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

// What each sub-category shows: real professionals first, then starter
// profiles only as needed so the sub-category always has at least 3 people.
// 1 real professional + 2 starters, 2 real + 1 starter, 3 or more real and no
// starters. Real professionals are never hidden.
function getAllProfessionals() {

    const registered = getRegisteredProfessionals();
    const pool = [];

    Object.keys(specialties).forEach(specialty => {

        const real = registered.filter(person => person.specialty === specialty);

        const starters = professionals
            .filter(person => person.specialty === specialty)
            .slice(0, Math.max(0, DEMO_PROFILES_PER_SPECIALTY - real.length));

        pool.push(...real, ...starters);

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

// Adds a country to the filter if a registered professional is from somewhere not listed.
function syncCountryOptions() {

    const known = new Set([...countryFilter.options].map(option => option.value));

    getRegisteredProfessionals().forEach(person => {

        if (person.country && !known.has(person.country)) {

            const option = document.createElement("option");
            option.value = person.country;
            option.textContent = person.country;
            countryFilter.appendChild(option);
            known.add(person.country);

        }

    });

}


// =========================================
// 5. AUTHENTICATION
// =========================================

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


function getCurrentUser() {

    // Use the same login session keys as the VORVENA dashboards.

    const loggedIn = sessionStorage.getItem("vorvenaLoggedIn") === "true";

    const sessionRole = (
        sessionStorage.getItem("vorvenaLoggedInRole") || ""
    ).toLowerCase().trim();

    const sessionEmail =
        sessionStorage.getItem("vorvenaLoggedInEmail") || "";

    const clientProfile = readStoredObject("vorvenaClientProfile");
    const professionalProfile = readStoredObject("vorvenaProfessionalProfile");

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

    // Fallback for existing user-object authentication.

    const possibleKeys = [
        "vorvenaUser",
        "currentUser",
        "user"
    ];

    for (const key of possibleKeys) {

        const user = readStoredObject(key);

        if (user) return user;

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

    if (!["client", "professional"].includes(role)) {
        return false;
    }

    // A valid VORVENA login session is the primary authentication check.
    const validSession =
        sessionStorage.getItem("vorvenaLoggedIn") === "true" &&
        sessionStorage.getItem("vorvenaLoggedInRole") === role;

    if (validSession) return true;

    // Fallback for user objects used by earlier frontend pages.
    return (
        user.isVerified !== false &&
        user.emailVerified !== false &&
        user.phoneVerified !== false
    );

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

    // Hide authentication buttons for every logged-in account.

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

            emptyState.textContent =
                "No specialty selected. Return to Explore and choose a professional category.";

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

    let filtered = getAllProfessionals().filter(person =>
        person.specialty === selectedSpecialty
    );

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

        return;

    }

    emptyState.classList.remove("show");

    filtered.forEach(person => {

        const card = document.createElement("article");

        card.className = "professional-card";

        const verificationBadge = person.verified
            ? `<span class="verified-badge" title="${person.isRegistered ? "SkillProof passed" : "Demo verified status"}">
                    <i class="fas fa-check"></i>
               </span>`
            : "";

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

                <span class="professional-stat">
                    <i class="fas fa-star"></i>
                    ${ratingText(person)}
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
                    data-profile-id="${escapeHTML(person.id)}"
                >
                    View Profile
                </button>

            </div>
        `;

        professionalsGrid.appendChild(card);

    });

}


// =========================================
// 10. FORMAT EXPERIENCE
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
// 11. OPEN PROFESSIONAL PROFILE
// =========================================

function openProfile(professionalId) {

    const person = getAllProfessionals().find(
        item => String(item.id) === String(professionalId)
    );

    if (!person) return;

    selectedProfessional = person;

    const verificationBadge = person.verified
        ? `<span class="verified-badge">
                <i class="fas fa-check"></i>
           </span>`
        : "";

    const skillsHTML = person.skills.map(skill =>
        `<span class="experience-tag">${escapeHTML(skill)}</span>`
    ).join("");

    modalProfileContent.innerHTML = `
        <div class="professional-avatar modal-avatar">
            ${avatarHTML(person)}
        </div>

        <h2>
            ${escapeHTML(person.name)}
            ${verificationBadge}
        </h2>

        <p class="professional-role">${escapeHTML(person.role)}</p>

        <p class="professional-location">
            <i class="fas fa-map-marker-alt"></i>
            ${escapeHTML(person.country || "Location not shared")}
        </p>

        <div class="professional-stats">

            <span class="professional-stat">
                <i class="fas fa-star"></i>
                ${person.rating > 0 ? person.rating.toFixed(1) + " Rating" : "New on VORVENA"}
            </span>

            <span class="professional-stat">
                <i class="fas fa-briefcase"></i>
                ${person.jobs} Completed Jobs
            </span>

        </div>

        <h3 class="modal-section-title">About Me</h3>

        <p class="professional-bio modal-bio">
            ${escapeHTML(person.bio)}
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
// 12. CONTROL PROFILE ACCESS
// =========================================

function updateProfileAccess() {

    // Visitor: can view profiles but must sign in to hire.

    if (!isLoggedIn()) {

        authContent.innerHTML = `
            <span class="auth-label">JOIN VORVENA</span>

            <h2>Ready to hire?</h2>

            <p>
                Create an account or sign in to hire talented
                professionals and manage your projects.
            </p>

            <a href="${getPageLink("signup.html")}" class="auth-option">
                <i class="fab fa-google"></i>
                Continue with Google
            </a>

            <a href="${getPageLink("signup.html")}" class="auth-option">
                <i class="fab fa-apple"></i>
                Continue with Apple
            </a>

            <a href="${getPageLink("client-signup.html")}" class="auth-option">
                <i class="fas fa-envelope"></i>
                Continue with Email
            </a>

            <p class="auth-terms">
                Already have an account?
                <a href="${getPageLink("login.html")}">Log In</a>
            </p>
        `;

        return;

    }


    // Client: can hire professionals.

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


    // Professional: can view profiles but cannot hire.

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
// 13. CLOSE PROFILE MODAL
// =========================================

function closeProfileModal() {

    profileModal.classList.remove("show");

    document.body.classList.remove("modal-open");

    selectedProfessional = null;

}

closeModal.addEventListener("click", closeProfileModal);
modalOverlay.addEventListener("click", closeProfileModal);


// =========================================
// 14. OPEN HIRING FORM
// =========================================

function openHiringForm() {

    if (!isClient()) {

        closeProfileModal();

        window.location.href = getPageLink("login.html");

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
// 15. SHARED HIRING OFFERS
// =========================================

const SHARED_OFFERS_KEY = "vorvenaSharedOffers";


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
        sessionStorage.getItem("vorvenaLoggedInEmail") ||
        profile.email ||
        "";

    const name =
        user.fullName ||
        user.name ||
        profile.fullName ||
        profile.name ||
        sessionStorage.getItem("vorvenaFullName") ||
        "VORVENA Client";

    return {
        name,
        email: String(email).trim().toLowerCase()
    };

}


// =========================================
// 16. HIRING FORM SUBMISSION
// =========================================

hireForm.addEventListener("submit", function(event) {

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


    // Do not allow a deadline in the past.

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${projectDeadline}T00:00:00`);

    if (selectedDate < today) {

        alert("Please choose a future project deadline.");

        return;

    }


    const client = getClientDetails();

    const newOffer = {

        id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

        professionalName: selectedProfessional.name,
        professionalRole: selectedProfessional.role,

        // Demo profiles do not have registered account emails or IDs.
        // These fields will be populated when real profiles come from the backend.
        professionalEmail: selectedProfessional.email || "",
        professionalId:
            selectedProfessional.professionalId ||
            selectedProfessional.userId ||
            "",

        professionalDemoId: selectedProfessional.id,
        professionalSpecialty: selectedProfessional.specialty,

        title: projectTitle,
        budget: `$${projectBudget.toLocaleString("en-US")}`,
        deadline: projectDeadline,
        description: projectDescription,

        clientName: client.name,
        clientEmail: client.email,

        status: "pending",
        createdAt: new Date().toISOString()

    };


    const sharedOffers = getSharedOffers();

    sharedOffers.unshift(newOffer);

    const saved = saveSharedOffers(sharedOffers);

    if (!saved) {

        alert(
            "Your offer could not be saved. Please check your browser storage and try again."
        );

        return;

    }


    // Keep the client dashboard offer list in sync.

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

        console.warn("The shared offer was saved, but the client offer list could not be updated.", error);

    }


    alert(
        `Hiring offer submitted successfully!\n\n` +
        `Professional: ${selectedProfessional.name}\n` +
        `Project: ${projectTitle}\n` +
        `Budget: $${projectBudget.toLocaleString("en-US")}\n` +
        `Deadline: ${projectDeadline}\n\n` +
        `Your offer has been saved.`
    );

    hireForm.reset();

    closeHiringForm();

});


// =========================================
// 17. SEARCH EVENTS
// =========================================

professionalSearch.addEventListener("input", renderProfessionals);

searchButton.addEventListener("click", renderProfessionals);

professionalSearch.addEventListener("keydown", function(event) {

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

professionalsGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".view-profile-btn");

    if (!button) return;

    openProfile(button.dataset.profileId);

});


// =========================================
// 21. MOBILE NAVIGATION
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

        if (icon) {

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

        }

    });

});


// =========================================
// 22. MODAL KEYBOARD SUPPORT
// =========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeProfileModal();

        closeHiringForm();

    }

});


// =========================================
// 23. REFRESH AUTH AND OFFERS
// =========================================

// Update navigation if login state changes in another tab.

window.addEventListener("storage", function(event) {

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


// Recheck authentication when the user returns to this page.

window.addEventListener("focus", function() {

    updateNavigation();

    if (profileModal.classList.contains("show")) {
        updateProfileAccess();
    }

});


// =========================================
// 23B. REFRESH THE LIST WHEN PROFESSIONALS CHANGE
// =========================================

// A professional who joins or edits their profile in another tab, or whose
// account status changes, shows up here without needing a manual reload.

window.addEventListener("storage", function(event) {

    if (
        event.key === DIRECTORY_KEY ||
        event.key === "vorvenaAccounts"
    ) {

        syncCountryOptions();

        renderProfessionals();

    }

});

window.addEventListener("pageshow", function(event) {

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

console.log(`VORVENA profiles loaded: ${professionals.length} demo, ${getRegisteredProfessionals().length} registered`);
