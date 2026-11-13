/* =========================================================
   VORVENA ADMIN DASHBOARD
   FRONTEND PREVIEW MODE
   NO BACKEND OR LOGIN REQUIRED

   IMPORTANT: before going live, admin access, user
   actions, payouts and support tickets must be enforced
   by the backend. Nothing here is secure on its own.
========================================================= */

const ADMIN_PREVIEW_MODE = true;

/* Change these two values to switch currency, e.g. USD / en-US */
const CURRENCY = { code: "NGN", locale: "en-NG" };


/* =========================================================
   1. SAMPLE DATA
========================================================= */

const adminData = {

    professionals: [
        {
            id: "PRO-001",
            name: "Daniel Williams",
            email: "daniel@example.com",
            phone: "+1 202 555 0142",
            country: "United States",
            skills: "Full Stack Development, React, Node.js",
            experience: "5 years",
            status: "active",
            verification: "verified",
            projects: 12,
            earnings: 8500
        },
        {
            id: "PRO-002",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "+44 7700 900123",
            country: "United Kingdom",
            skills: "UI/UX Design, Figma, Product Design",
            experience: "4 years",
            status: "active",
            verification: "pending",
            projects: 8,
            earnings: 4200
        },
        {
            id: "PRO-003",
            name: "Michael Chen",
            email: "michael@example.com",
            phone: "+65 8123 4567",
            country: "Singapore",
            skills: "Python, Artificial Intelligence",
            experience: "6 years",
            status: "suspended",
            verification: "verified",
            projects: 15,
            earnings: 12000
        },
        {
            id: "PRO-004",
            name: "Grace Okafor",
            email: "grace@example.com",
            phone: "+234 803 555 0101",
            country: "Nigeria",
            skills: "Frontend Development, JavaScript",
            experience: "3 years",
            status: "active",
            verification: "verified",
            projects: 6,
            earnings: 3500
        },
        {
            id: "PRO-005",
            name: "David Anderson",
            email: "david@example.com",
            phone: "+61 412 345 678",
            country: "Australia",
            skills: "Cybersecurity, Cloud Computing",
            experience: "7 years",
            status: "active",
            verification: "pending",
            projects: 10,
            earnings: 7200
        }
    ],

    clients: [
        {
            id: "CLI-001",
            name: "James Carter",
            email: "james@example.com",
            phone: "+1 415 555 0102",
            country: "United States",
            status: "active",
            projects: 4
        },
        {
            id: "CLI-002",
            name: "Olivia Smith",
            email: "olivia@example.com",
            phone: "+44 7700 900321",
            country: "United Kingdom",
            status: "active",
            projects: 3
        },
        {
            id: "CLI-003",
            name: "Benjamin Lee",
            email: "benjamin@example.com",
            phone: "+65 8123 7890",
            country: "Singapore",
            status: "suspended",
            projects: 2
        },
        {
            id: "CLI-004",
            name: "Amara Eze",
            email: "amara@example.com",
            phone: "+234 806 555 0102",
            country: "Nigeria",
            status: "active",
            projects: 5
        },
        {
            id: "CLI-005",
            name: "Lucas Martin",
            email: "lucas@example.com",
            phone: "+33 612 345 678",
            country: "France",
            status: "active",
            projects: 1
        }
    ],

    projects: [
        {
            id: "PRJ-001",
            title: "E-commerce Website Development",
            client: "James Carter",
            professional: "Daniel Williams",
            amount: 2500,
            status: "in-progress"
        },
        {
            id: "PRJ-002",
            title: "Mobile App UI/UX Design",
            client: "Olivia Smith",
            professional: "Sarah Johnson",
            amount: 1800,
            status: "awaiting-payment"
        },
        {
            id: "PRJ-003",
            title: "AI Customer Support System",
            client: "Amara Eze",
            professional: "Michael Chen",
            amount: 4000,
            status: "awaiting-approval"
        },
        {
            id: "PRJ-004",
            title: "Corporate Website Redesign",
            client: "Benjamin Lee",
            professional: "Grace Okafor",
            amount: 1200,
            status: "completed"
        },
        {
            id: "PRJ-005",
            title: "Cloud Infrastructure Setup",
            client: "Lucas Martin",
            professional: "David Anderson",
            amount: 3200,
            status: "in-progress"
        },
        {
            id: "PRJ-006",
            title: "Portfolio Website",
            client: "James Carter",
            professional: "Grace Okafor",
            amount: 900,
            status: "awaiting-payout"
        }
    ],

    notifications: [
        {
            title: "Payout awaiting review",
            message: "A completed project has been approved by its client.",
            time: "5 minutes ago",
            unread: true
        },
        {
            title: "New professional registered",
            message: "A new professional account has been created.",
            time: "25 minutes ago",
            unread: true
        },
        {
            title: "Verification request",
            message: "A professional has submitted verification information.",
            time: "1 hour ago",
            unread: false
        },
        {
            title: "Project accepted",
            message: "A professional has accepted a client offer.",
            time: "3 hours ago",
            unread: false
        }
    ],

    payouts: [
        {
            professional: "Grace Okafor",
            email: "grace@example.com",
            project: "Portfolio Website",
            amount: 900,
            commission: 135,
            earnings: 765,
            status: "pending"
        },
        {
            professional: "Daniel Williams",
            email: "daniel@example.com",
            project: "E-commerce Website Development",
            amount: 2500,
            commission: 375,
            earnings: 2125,
            status: "pending"
        }
    ],

    conversations: [
        {
            id: "CON-001",
            project: "E-commerce Website Development",
            participants: "James Carter & Daniel Williams",
            messages: [
                {
                    sender: "James Carter",
                    message: "Hello Daniel, how is the project progressing?",
                    time: "10:30 AM",
                    type: "received"
                },
                {
                    sender: "Daniel Williams",
                    message: "The main development is complete. I am working on the final testing.",
                    time: "10:45 AM",
                    type: "sent"
                },
                {
                    sender: "James Carter",
                    message: "Great. Please share the latest preview when ready.",
                    time: "11:02 AM",
                    type: "received"
                }
            ]
        },
        {
            id: "CON-002",
            project: "Mobile App UI/UX Design",
            participants: "Olivia Smith & Sarah Johnson",
            messages: [
                {
                    sender: "Olivia Smith",
                    message: "I have reviewed the first design concept.",
                    time: "9:15 AM",
                    type: "received"
                },
                {
                    sender: "Sarah Johnson",
                    message: "Thank you. I will prepare the updated screens.",
                    time: "9:28 AM",
                    type: "sent"
                }
            ]
        }
    ],

    activity: [
        {
            admin: "Platform Admin",
            action: "Reviewed payout request",
            target: "PRJ-006",
            date: "Today, 10:30 AM"
        },
        {
            admin: "Platform Admin",
            action: "Viewed user account",
            target: "PRO-002",
            date: "Today, 9:45 AM"
        },
        {
            admin: "Platform Admin",
            action: "Reviewed verification",
            target: "PRO-005",
            date: "Yesterday, 3:20 PM"
        }
    ]
};


/* =========================================================
   2. HELPER FUNCTIONS
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => [...document.querySelectorAll(selector)];

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function formatMoney(amount) {
    return new Intl.NumberFormat(CURRENCY.locale, {
        style: "currency",
        currency: CURRENCY.code,
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function statusClass(status) {
    const classes = {
        "active": "status-active",
        "completed": "status-completed",
        "verified": "status-verified",
        "pending": "status-pending",
        "awaiting-payment": "status-awaiting",
        "awaiting-approval": "status-awaiting",
        "awaiting-payout": "status-awaiting",
        "in-progress": "status-progress",
        "suspended": "status-suspended",
        "cancelled": "status-cancelled",
        "flagged": "status-flagged",
        "unverified": "status-unverified",
        "new": "status-new",
        "resolved": "status-resolved"
    };

    return classes[status] || "status-pending";
}

function statusLabel(status) {
    return String(status || "unknown")
        .replaceAll("-", " ");
}

let toastTimer;

function showToast(message) {
    const toast = $("#adminToast");
    const text = $("#adminToastMessage");

    if (!toast || !text) return;

    text.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function hideLoader() {
    const loader = $("#adminLoader");

    if (loader) {
        loader.classList.add("hide");
    }
}

function showModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("active");
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove("active");
    }
}


/* =========================================================
   3. ADMIN PROFILE (NAME AND PHOTO)
========================================================= */

const PROFILE_STORAGE_KEY = "vorvenaAdminProfile";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const ALLOWED_PHOTO_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

/* Built-in default avatar, so no image file is needed */
const DEFAULT_AVATAR =
    "data:image/svg+xml," +
    "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E" +
    "%3Crect width='100' height='100' fill='%23eaf1fc'/%3E" +
    "%3Ccircle cx='50' cy='38' r='18' fill='%23174b9a'/%3E" +
    "%3Cpath d='M14 100c4-24 20-34 36-34s32 10 36 34z' fill='%23174b9a'/%3E" +
    "%3C/svg%3E";

const adminProfile = {
    name: "Platform Administrator",
    email: "admin@vorvena.com",
    avatar: ""
};


function loadAdminProfile() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(PROFILE_STORAGE_KEY) || "null"
        );

        if (saved && typeof saved === "object") {

            if (typeof saved.name === "string" && saved.name.trim()) {
                adminProfile.name = saved.name.trim().slice(0, 60);
            }

            /* only accept photos created by this page */
            if (
                typeof saved.avatar === "string" &&
                saved.avatar.startsWith("data:image/jpeg;base64,")
            ) {
                adminProfile.avatar = saved.avatar;
            }

        }

    } catch (error) {

        console.error("Could not load admin profile:", error);

    }

    applyAdminProfile();

    setText(
        "adminCurrentDate",
        new Intl.DateTimeFormat("en", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date())
    );

}


function saveAdminProfile() {

    try {

        localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify({
                name: adminProfile.name,
                avatar: adminProfile.avatar
            })
        );

        return true;

    } catch (error) {

        console.error("Could not save admin profile:", error);

        showToast("Could not save your profile. Check browser storage.");

        return false;

    }

}


function applyAdminProfile() {

    $$("[data-admin-name]").forEach(element => {
        element.textContent = adminProfile.name;
    });

    $$("[data-admin-avatar]").forEach(image => {
        image.src = adminProfile.avatar || DEFAULT_AVATAR;
    });

    const nameInput = $("#settingsAdminName");

    if (nameInput) {
        nameInput.value = adminProfile.name;
    }

    setText("settingsAdminEmail", "");

    const emailInput = $("#settingsAdminEmail");

    if (emailInput) {
        emailInput.value = adminProfile.email;
    }

    const removeButton = $("#adminPhotoRemoveBtn");

    if (removeButton) {
        removeButton.disabled = !adminProfile.avatar;
    }

}


function showPhotoMessage(message, type = "") {

    const element = $("#adminPhotoMessage");

    if (!element) return;

    element.textContent = message;
    element.className = "photo-message " + type;

}


/* Crop to a square, resize to 256px and re-encode as JPEG.
   Re-encoding also strips anything unsafe from the file. */

function processAdminPhoto(file) {

    return new Promise((resolve, reject) => {

        const objectUrl = URL.createObjectURL(file);

        const image = new Image();

        image.onload = () => {

            try {

                const size = 256;

                const canvas = document.createElement("canvas");
                canvas.width = size;
                canvas.height = size;

                const context = canvas.getContext("2d");

                const side = Math.min(
                    image.naturalWidth,
                    image.naturalHeight
                );

                const startX = (image.naturalWidth - side) / 2;
                const startY = (image.naturalHeight - side) / 2;

                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, size, size);

                context.drawImage(
                    image,
                    startX, startY, side, side,
                    0, 0, size, size
                );

                resolve(canvas.toDataURL("image/jpeg", 0.85));

            } catch (error) {

                reject(error);

            } finally {

                URL.revokeObjectURL(objectUrl);

            }

        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Image could not be read."));
        };

        image.src = objectUrl;

    });

}


function initializeAdminProfile() {

    const input = $("#adminPhotoInput");
    const uploadButton = $("#adminPhotoUploadBtn");
    const removeButton = $("#adminPhotoRemoveBtn");
    const form = $("#adminProfileForm");

    /* clicking the header profile opens Settings */
    $("#adminProfileBtn")?.addEventListener("click", () => {
        openSection("settings");
    });

    uploadButton?.addEventListener("click", () => {
        input?.click();
    });

    input?.addEventListener("change", async () => {

        const file = input.files && input.files[0];

        if (!file) return;

        if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
            showPhotoMessage(
                "Please choose a JPG, PNG or WEBP image.",
                "error"
            );
            input.value = "";
            return;
        }

        if (file.size > MAX_PHOTO_SIZE) {
            showPhotoMessage(
                "That image is too large. The maximum size is 5 MB.",
                "error"
            );
            input.value = "";
            return;
        }

        showPhotoMessage("Processing photo...");

        try {

            const previousAvatar = adminProfile.avatar;

            adminProfile.avatar = await processAdminPhoto(file);

            if (!saveAdminProfile()) {
                adminProfile.avatar = previousAvatar;
                showPhotoMessage("The photo could not be saved.", "error");
                return;
            }

            applyAdminProfile();

            showPhotoMessage("Profile photo updated.", "success");

            showToast("Profile photo updated.");

            logActivity("Updated profile photo", "Admin profile");

        } catch (error) {

            console.error("Photo processing error:", error);

            showPhotoMessage(
                "That file could not be used. Try a different image.",
                "error"
            );

        } finally {

            input.value = "";

        }

    });

    removeButton?.addEventListener("click", () => {

        if (!adminProfile.avatar) return;

        adminProfile.avatar = "";

        if (!saveAdminProfile()) return;

        applyAdminProfile();

        showPhotoMessage("Profile photo removed.", "success");

        showToast("Profile photo removed.");

        logActivity("Removed profile photo", "Admin profile");

    });

    form?.addEventListener("submit", event => {

        event.preventDefault();

        const name = ($("#settingsAdminName")?.value || "").trim();

        if (name.length < 2) {
            showToast("Please enter a name with at least 2 characters.");
            $("#settingsAdminName")?.focus();
            return;
        }

        adminProfile.name = name.slice(0, 60);

        if (!saveAdminProfile()) return;

        applyAdminProfile();

        showToast("Profile saved.");

        logActivity("Updated admin name", "Admin profile");

    });

}


/* =========================================================
   4. ACTIVITY LOG HELPER
========================================================= */

function logActivity(action, target) {

    adminData.activity.unshift({
        admin: adminProfile.name,
        action,
        target,
        date: "Today, " + new Intl.DateTimeFormat("en", {
            hour: "numeric",
            minute: "2-digit"
        }).format(new Date())
    });

    renderActivity();

}


/* =========================================================
   5. DASHBOARD OVERVIEW
========================================================= */

function loadOverview() {

    setText("totalProfessionals", adminData.professionals.length);
    setText("totalClients", adminData.clients.length);

    /* sample numbers: replace with real data from the backend */
    setText("onlineProfessionals", 3);
    setText("onlineClients", 2);

    setText("totalProjects", adminData.projects.length);

    setText(
        "activeProjects",
        adminData.projects.filter(project =>
            project.status === "in-progress"
        ).length
    );

    setText(
        "pendingProjects",
        adminData.projects.filter(project =>
            ["awaiting-payment", "awaiting-approval", "awaiting-payout"]
                .includes(project.status)
        ).length
    );

    setText(
        "completedProjects",
        adminData.projects.filter(project =>
            project.status === "completed"
        ).length
    );

    renderRecentProjects();
    renderRecentNotifications();
}


function renderRecentProjects() {

    const container = $("#recentProjectsTable");

    if (!container) return;

    container.innerHTML = adminData.projects.slice(0, 4).map(project => `
        <div class="recent-project-item">
            <div>
                <strong>${escapeHTML(project.title)}</strong>
                <small>${escapeHTML(project.client)}</small>
            </div>

            <span class="status-badge ${statusClass(project.status)}">
                ${escapeHTML(statusLabel(project.status))}
            </span>
        </div>
    `).join("");
}


function renderRecentNotifications() {

    const container = $("#recentNotifications");

    if (!container) return;

    container.innerHTML = adminData.notifications.slice(0, 4).map(item => `
        <div class="recent-notification-item">
            <strong>${escapeHTML(item.title)}</strong>
            <p>${escapeHTML(item.message)}</p>
            <small>${escapeHTML(item.time)}</small>
        </div>
    `).join("");
}


/* =========================================================
   6. NAVIGATION
========================================================= */

function showSection(sectionName) {

    const target = document.getElementById(sectionName);

    const link = $(`.admin-nav-link[data-section="${sectionName}"]`);

    if (!target || !link) return false;

    $$(".admin-nav-link").forEach(item =>
        item.classList.remove("active")
    );

    $$(".admin-section").forEach(section =>
        section.classList.remove("active")
    );

    link.classList.add("active");
    target.classList.add("active");

    return true;
}


function initializeNavigation() {

    $$(".admin-nav-link").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const sectionName = link.dataset.section;

            if (!showSection(sectionName)) return;

            history.replaceState(null, "", "#" + sectionName);

            closeSidebar();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

    $("#adminNotificationBtn")?.addEventListener("click", () => {
        openSection("notifications");
    });

    /* remember the section after a refresh */
    const startSection = window.location.hash.replace("#", "");

    if (startSection) {
        showSection(startSection);
    }

}


function openSection(sectionName) {

    const link = $(`.admin-nav-link[data-section="${sectionName}"]`);

    if (link) {
        link.click();
    }
}


/* =========================================================
   7. MOBILE SIDEBAR
========================================================= */

function initializeMobileMenu() {

    const button = $("#mobileMenuBtn");
    const sidebar = $("#adminSidebar");

    if (!button || !sidebar) return;

    button.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    document.addEventListener("click", event => {

        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !button.contains(event.target)
        ) {
            closeSidebar();
        }

    });
}


function closeSidebar() {
    $("#adminSidebar")?.classList.remove("open");
}


/* =========================================================
   8. USER MANAGEMENT
========================================================= */

let currentUserType = "clients";

function getCurrentUsers() {
    return currentUserType === "clients"
        ? adminData.clients
        : adminData.professionals;
}


function initializeUserTabs() {

    $$(".user-tab").forEach(tab => {

        tab.addEventListener("click", () => {

            $$(".user-tab").forEach(item =>
                item.classList.remove("active")
            );

            tab.classList.add("active");

            currentUserType = tab.dataset.userTab;

            renderUsers();

        });

    });

}


function renderUsers() {

    const body = $("#usersTableBody");

    if (!body) return;

    const search = ($("#userSearch")?.value || "").toLowerCase();

    const statusFilter = $("#userStatusFilter")?.value || "all";

    const users = getCurrentUsers().filter(user => {

        const matchesSearch = [
            user.name,
            user.email,
            user.id,
            user.country
        ].join(" ").toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === "all" || user.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    setText("clientTabCount", adminData.clients.length);
    setText("professionalTabCount", adminData.professionals.length);

    if (!users.length) {
        body.innerHTML = `
            <tr>
                <td colspan="7">No matching users found.</td>
            </tr>
        `;
        return;
    }

    body.innerHTML = users.map(user => `

        <tr>

            <td>
                <div class="table-user">
                    <strong>${escapeHTML(user.name)}</strong>
                    <small>${escapeHTML(user.id)}</small>
                </div>
            </td>

            <td>${escapeHTML(user.email)}</td>
            <td>${escapeHTML(user.phone)}</td>
            <td>${escapeHTML(user.country)}</td>

            <td>
                <span class="status-badge ${statusClass(user.status)}">
                    ${escapeHTML(statusLabel(user.status))}
                </span>
            </td>

            <td>${Number(user.projects) || 0}</td>

            <td>
                <button class="table-action-btn" type="button"
                    data-user-id="${escapeHTML(user.id)}">
                    View
                </button>
            </td>

        </tr>

    `).join("");

    body.querySelectorAll("[data-user-id]").forEach(button => {

        button.addEventListener("click", () => {
            viewUser(button.dataset.userId);
        });

    });

}


function findUser(id) {

    return [
        ...adminData.clients,
        ...adminData.professionals
    ].find(user => user.id === id);

}


function syncSuspensionDuration() {

    const type = $("#suspensionType")?.value;

    const duration = $("#suspensionDurationGroup");

    if (duration) {
        duration.style.display = type === "permanent" ? "none" : "flex";
    }

}


function viewUser(id) {

    const user = findUser(id);

    if (!user) return;

    const professional = adminData.professionals.includes(user);

    const content = $("#userDetailsContent");

    if (!content) return;

    const suspensionHTML = user.suspension
        ? `
            <p><strong>Suspension:</strong>
                ${escapeHTML(
                    user.suspension.type === "permanent"
                        ? "Permanent"
                        : `Temporary (${Number(user.suspension.days) || 0} days)`
                )}
            </p>
            <p><strong>Reason:</strong> ${escapeHTML(user.suspension.reason)}</p>
        `
        : "";

    content.innerHTML = `

        <h3>${escapeHTML(user.name)}</h3>

        <p><strong>Account ID:</strong> ${escapeHTML(user.id)}</p>

        <p><strong>Email:</strong> ${escapeHTML(user.email)}</p>

        <p><strong>Phone:</strong> ${escapeHTML(user.phone)}</p>

        <p><strong>Country:</strong> ${escapeHTML(user.country)}</p>

        <p><strong>Status:</strong> ${escapeHTML(statusLabel(user.status))}</p>

        ${suspensionHTML}

        <p><strong>Projects:</strong> ${Number(user.projects) || 0}</p>

        ${
            professional
            ? `
                <p><strong>Skills:</strong> ${escapeHTML(user.skills)}</p>
                <p><strong>Experience:</strong> ${escapeHTML(user.experience)}</p>
                <p><strong>Verification:</strong> ${escapeHTML(user.verification)}</p>
                <p><strong>Total Earnings:</strong> ${formatMoney(user.earnings)}</p>
            `
            : ""
        }

        <div class="user-detail-actions">

            <button class="primary-btn" type="button" id="demoSuspendButton">
                ${user.status === "suspended" ? "Reinstate Account" : "Suspend Account"}
            </button>

            <button class="danger-btn" type="button" id="demoDeleteButton">
                Delete Account
            </button>

        </div>

    `;

    showModal("userDetailsModal");

    logActivity("Viewed user account", user.id);

    $("#demoSuspendButton")?.addEventListener("click", () => {

        if (user.status === "suspended") {

            user.status = "active";

            delete user.suspension;

            showToast("Preview: account reinstated.");

            logActivity("Reinstated account", user.id);

            closeModal($("#userDetailsModal"));

            renderUsers();

            return;
        }

        const form = $("#suspendUserForm");

        form?.reset();

        $("#suspendUserId").value = user.id;

        syncSuspensionDuration();

        closeModal($("#userDetailsModal"));

        showModal("suspendUserModal");

    });

    $("#demoDeleteButton")?.addEventListener("click", () => {

        $("#deleteUserId").value = user.id;

        closeModal($("#userDetailsModal"));

        showModal("deleteUserModal");

    });

}


/* =========================================================
   9. USER SEARCH AND FILTERS
========================================================= */

function initializeUserFilters() {

    $("#userSearch")?.addEventListener("input", renderUsers);

    $("#userStatusFilter")?.addEventListener("change", renderUsers);

}


/* =========================================================
   10. SUSPENSION PREVIEW
========================================================= */

function initializeSuspension() {

    const form = $("#suspendUserForm");

    if (!form) return;

    $("#suspensionType")?.addEventListener("change", syncSuspensionDuration);

    form.addEventListener("submit", event => {

        event.preventDefault();

        const id = $("#suspendUserId").value;

        const user = findUser(id);

        if (!user) return;

        const type = $("#suspensionType").value;

        const reason = $("#suspensionReason").value.trim();

        if (!reason) {
            showToast("Please enter a reason for the suspension.");
            $("#suspensionReason").focus();
            return;
        }

        user.status = "suspended";

        user.suspension = {
            type,
            days: type === "temporary"
                ? Number($("#suspensionDuration").value)
                : null,
            reason,
            date: new Date().toISOString()
        };

        closeModal($("#suspendUserModal"));

        form.reset();

        syncSuspensionDuration();

        renderUsers();

        logActivity("Suspended account", user.id);

        showToast("Preview only: account suspended.");

    });

}


/* =========================================================
   11. DELETE ACCOUNT PREVIEW
========================================================= */

function initializeDelete() {

    $("#confirmDeleteUser")?.addEventListener("click", () => {

        const id = $("#deleteUserId").value;

        const user = findUser(id);

        if (!user) return;

        if (!window.confirm(
            `Remove ${user.name} from this preview?`
        )) {
            return;
        }

        const collection = adminData.clients.includes(user)
            ? adminData.clients
            : adminData.professionals;

        const index = collection.indexOf(user);

        if (index !== -1) {
            collection.splice(index, 1);
        }

        closeModal($("#deleteUserModal"));

        renderUsers();

        loadOverview();

        renderVerification();

        logActivity("Deleted account", id);

        showToast("Preview only: sample account removed.");

    });

}


/* =========================================================
   12. PROJECT MANAGEMENT
========================================================= */

let currentProjectFilter = "all";

function renderProjects() {

    const body = $("#projectsTableBody");

    if (!body) return;

    const search = ($("#projectSearch")?.value || "").toLowerCase();

    const projects = adminData.projects.filter(project => {

        const matchesFilter =
            currentProjectFilter === "all" ||
            project.status === currentProjectFilter;

        const matchesSearch = [
            project.title,
            project.client,
            project.professional,
            project.id
        ].join(" ").toLowerCase().includes(search);

        return matchesFilter && matchesSearch;

    });

    if (!projects.length) {
        body.innerHTML = `
            <tr><td colspan="6">No matching projects found.</td></tr>
        `;
        return;
    }

    body.innerHTML = projects.map(project => `

        <tr>

            <td>
                <div class="table-user">
                    <strong>${escapeHTML(project.title)}</strong>
                    <small>${escapeHTML(project.id)}</small>
                </div>
            </td>

            <td>${escapeHTML(project.client)}</td>

            <td>${escapeHTML(project.professional)}</td>

            <td>${formatMoney(project.amount)}</td>

            <td>
                <span class="status-badge ${statusClass(project.status)}">
                    ${escapeHTML(statusLabel(project.status))}
                </span>
            </td>

            <td>
                <button class="table-action-btn" type="button"
                    data-project-id="${escapeHTML(project.id)}">
                    Details
                </button>
            </td>

        </tr>

    `).join("");

    body.querySelectorAll("[data-project-id]").forEach(button => {

        button.addEventListener("click", () => {
            viewProject(button.dataset.projectId);
        });

    });

}


function viewProject(id) {

    const project = adminData.projects.find(item => item.id === id);

    if (!project) return;

    const content = $("#projectDetailsContent");

    if (!content) return;

    content.innerHTML = `

        <h3>${escapeHTML(project.title)}</h3>

        <p><strong>Project ID:</strong> ${escapeHTML(project.id)}</p>

        <p><strong>Client:</strong> ${escapeHTML(project.client)}</p>

        <p><strong>Professional:</strong> ${escapeHTML(project.professional)}</p>

        <p><strong>Project Budget:</strong> ${formatMoney(project.amount)}</p>

        <p><strong>VORVENA Commission (15%):</strong> ${formatMoney(project.amount * 0.15)}</p>

        <p><strong>Professional Earnings (85%):</strong> ${formatMoney(project.amount * 0.85)}</p>

        <p><strong>Status:</strong> ${escapeHTML(statusLabel(project.status))}</p>

    `;

    showModal("projectDetailsModal");

}


function initializeProjectFilters() {

    $$(".project-tab").forEach(tab => {

        tab.addEventListener("click", () => {

            $$(".project-tab").forEach(item =>
                item.classList.remove("active")
            );

            tab.classList.add("active");

            currentProjectFilter = tab.dataset.projectFilter;

            renderProjects();

        });

    });

    $("#projectSearch")?.addEventListener("input", renderProjects);

}


/* =========================================================
   13. PAYOUTS
========================================================= */

function loadPayouts() {

    const total = adminData.payouts.reduce(
        (sum, payout) => sum + payout.amount, 0
    );

    const commission = adminData.payouts.reduce(
        (sum, payout) => sum + payout.commission, 0
    );

    const earnings = adminData.payouts.reduce(
        (sum, payout) => sum + payout.earnings, 0
    );

    const pending = adminData.payouts.filter(
        payout => payout.status === "pending"
    ).length;

    setText("totalPayments", formatMoney(total));
    setText("totalCommission", formatMoney(commission));
    setText("totalProfessionalEarnings", formatMoney(earnings));

    setText("pendingPayouts", pending);
    setText("payoutAlertCount", pending);
    setText("sidebarPayoutCount", pending);

    const payoutBadge = $("#sidebarPayoutCount");

    if (payoutBadge) {
        payoutBadge.style.display = pending > 0 ? "inline-flex" : "none";
    }

    const body = $("#payoutsTableBody");

    if (!body) return;

    body.innerHTML = adminData.payouts.map(payout => `

        <tr>

            <td><strong>${escapeHTML(payout.professional)}</strong></td>

            <td>${escapeHTML(payout.email)}</td>

            <td>${escapeHTML(payout.project)}</td>

            <td>${formatMoney(payout.amount)}</td>

            <td>${formatMoney(payout.commission)}</td>

            <td>${formatMoney(payout.earnings)}</td>

            <td>
                <span class="status-badge ${statusClass(payout.status)}">
                    ${escapeHTML(payout.status)}
                </span>
            </td>

        </tr>

    `).join("");

}


/* =========================================================
   14. NOTIFICATIONS
========================================================= */

function updateNotificationIndicator() {

    const indicator = $("#notificationIndicator");

    if (!indicator) return;

    const hasUnread = adminData.notifications.some(
        item => item.unread
    );

    indicator.classList.toggle("hidden", !hasUnread);

}


function renderNotifications() {

    const container = $("#adminNotificationList");

    updateNotificationIndicator();

    if (!container) return;

    if (!adminData.notifications.length) {
        container.innerHTML = `
            <p class="empty-state">No notifications yet.</p>
        `;
        return;
    }

    container.innerHTML = adminData.notifications.map((item, index) => `

        <div class="admin-notification-item ${item.unread ? "unread" : ""}">

            <div class="notification-content">

                <strong>${escapeHTML(item.title)}</strong>

                <p>${escapeHTML(item.message)}</p>

                <small>${escapeHTML(item.time)}</small>

                ${
                    item.unread
                    ? `<button class="table-action-btn" type="button"
                        data-read-index="${index}">
                        Mark as read
                    </button>`
                    : ""
                }

            </div>

        </div>

    `).join("");

    container.querySelectorAll("[data-read-index]").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.readIndex);

            adminData.notifications[index].unread = false;

            renderNotifications();

            showToast("Preview notification marked as read.");

        });

    });

}


function initializeNotifications() {

    $("#markAllNotificationsRead")?.addEventListener("click", () => {

        adminData.notifications.forEach(item => {
            item.unread = false;
        });

        renderNotifications();

        showToast("Preview notifications marked as read.");

    });

}


/* =========================================================
   15. CONVERSATION MONITORING
========================================================= */

function renderConversations() {

    const container = $("#conversationList");

    if (!container) return;

    const search = (
        $("#conversationSearch")?.value || ""
    ).toLowerCase();

    const conversations = adminData.conversations.filter(conversation => {

        return [
            conversation.project,
            conversation.participants
        ].join(" ").toLowerCase().includes(search);

    });

    setText("conversationCount", conversations.length);

    if (!conversations.length) {
        container.innerHTML = `
            <p class="empty-state">No conversations found.</p>
        `;
        return;
    }

    container.innerHTML = conversations.map(conversation => `

        <button class="conversation-item"
            type="button"
            data-conversation-id="${escapeHTML(conversation.id)}">

            <strong>${escapeHTML(conversation.project)}</strong>

            <span>${escapeHTML(conversation.participants)}</span>

        </button>

    `).join("");

    container.querySelectorAll("[data-conversation-id]").forEach(button => {

        button.addEventListener("click", () => {

            openConversation(button.dataset.conversationId);

        });

    });

}


function openConversation(id) {

    const conversation = adminData.conversations.find(
        item => item.id === id
    );

    if (!conversation) return;

    setText("conversationProjectTitle", conversation.project);

    setText("conversationParticipants", conversation.participants);

    const container = $("#adminMessagesContainer");

    if (!container) return;

    container.innerHTML = conversation.messages.map(message => `

        <div class="admin-message ${message.type === "sent" ? "sent" : "received"}">

            <strong>${escapeHTML(message.sender)}</strong>

            <p>${escapeHTML(message.message)}</p>

            <small>${escapeHTML(message.time)}</small>

        </div>

    `).join("");

    /* every conversation view is recorded */
    logActivity("Viewed conversation", conversation.id);

    showToast("Preview conversation opened.");

}


function initializeConversations() {

    $("#conversationSearch")?.addEventListener(
        "input",
        renderConversations
    );

}


/* =========================================================
   16. VERIFICATION
========================================================= */

function renderVerification() {

    const body = $("#verificationTableBody");

    if (!body) return;

    const search = (
        $("#verificationSearch")?.value || ""
    ).toLowerCase();

    const filter = $("#verificationFilter")?.value || "all";

    const professionals = adminData.professionals.filter(user => {

        const matchesSearch = [
            user.name,
            user.email,
            user.country
        ].join(" ").toLowerCase().includes(search);

        const matchesFilter =
            filter === "all" || user.verification === filter;

        return matchesSearch && matchesFilter;

    });

    if (!professionals.length) {
        body.innerHTML = `
            <tr><td colspan="5">No matching records.</td></tr>
        `;
        return;
    }

    body.innerHTML = professionals.map(user => `

        <tr>

            <td><strong>${escapeHTML(user.name)}</strong></td>

            <td>${escapeHTML(user.email)}</td>

            <td>${escapeHTML(user.country)}</td>

            <td>
                <span class="status-badge ${statusClass(user.verification)}">
                    ${escapeHTML(user.verification)}
                </span>
            </td>

            <td>
                <button class="table-action-btn" type="button"
                    data-verification-id="${escapeHTML(user.id)}">
                    Review
                </button>
            </td>

        </tr>

    `).join("");

    body.querySelectorAll("[data-verification-id]").forEach(button => {

        button.addEventListener("click", () => {

            const user = findUser(button.dataset.verificationId);

            if (!user) return;

            logActivity("Reviewed verification", user.id);

            showToast(
                `Preview: reviewing ${user.name}'s verification.`
            );

        });

    });

}


function initializeVerification() {

    $("#verificationSearch")?.addEventListener(
        "input",
        renderVerification
    );

    $("#verificationFilter")?.addEventListener(
        "change",
        renderVerification
    );

}


/* =========================================================
   17. ACTIVITY LOGS
========================================================= */

function renderActivity() {

    const body = $("#adminActivityTable");

    if (!body) return;

    const search = (
        $("#activitySearch")?.value || ""
    ).toLowerCase();

    const activities = adminData.activity.filter(item => {

        return [
            item.admin,
            item.action,
            item.target,
            item.date
        ].join(" ").toLowerCase().includes(search);

    });

    if (!activities.length) {
        body.innerHTML = `
            <tr><td colspan="4">No matching activity.</td></tr>
        `;
        return;
    }

    body.innerHTML = activities.map(item => `

        <tr>
            <td>${escapeHTML(item.admin)}</td>
            <td>${escapeHTML(item.action)}</td>
            <td>${escapeHTML(item.target)}</td>
            <td>${escapeHTML(item.date)}</td>
        </tr>

    `).join("");

}


function initializeActivity() {

    $("#activitySearch")?.addEventListener("input", renderActivity);

}


/* =========================================================
   18. SUPPORT TICKETS
========================================================= */

const SUPPORT_STORAGE_KEY = "vorvenaSupportTickets";

let supportTickets = [];
let currentSupportTicketId = null;


/* LOAD TICKETS */

function loadSupportTickets() {

    try {

        const savedTickets = localStorage.getItem(SUPPORT_STORAGE_KEY);

        supportTickets = savedTickets
            ? JSON.parse(savedTickets)
            : [];

        if (!Array.isArray(supportTickets)) {
            supportTickets = [];
        }

    } catch (error) {

        console.error("Could not load support tickets:", error);

        supportTickets = [];

    }

    renderSupportTickets();

}


/* SAVE TICKETS */

function saveSupportTickets() {

    try {

        localStorage.setItem(
            SUPPORT_STORAGE_KEY,
            JSON.stringify(supportTickets)
        );

        return true;

    } catch (error) {

        console.error("Could not save support tickets:", error);

        showToast("Could not save the ticket. Check browser storage.");

        return false;

    }

}


/* FORMAT TICKET DATE */

function formatTicketDate(dateValue) {

    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);

}


/* NORMALISE STATUS ("In Progress" -> "in-progress") */

function normalizeStatus(status, fallback = "new") {

    return String(status || fallback)
        .toLowerCase()
        .trim()
        .replaceAll(" ", "-");

}


/* SUPPORT STATUS CLASS */

function supportStatusClass(status) {

    const classes = {
        "new": "status-new",
        "in-progress": "status-in-progress",
        "resolved": "status-resolved"
    };

    return classes[normalizeStatus(status)] || "status-new";

}


/* UPDATE SUPPORT COUNTS */

function updateSupportCounts() {

    const countByStatus = status => supportTickets.filter(ticket =>
        normalizeStatus(ticket.status) === status
    ).length;

    const newCount = countByStatus("new");

    setText("totalSupportTickets", supportTickets.length);
    setText("newSupportTickets", newCount);
    setText("inProgressSupportTickets", countByStatus("in-progress"));
    setText("resolvedSupportTickets", countByStatus("resolved"));

    setText("supportTicketCount", newCount);

    const sidebarCount = $("#supportTicketCount");

    if (sidebarCount) {
        sidebarCount.style.display = newCount > 0 ? "inline-flex" : "none";
    }

}


/* RENDER SUPPORT TICKET TABLE */

function renderSupportTickets() {

    const body = $("#supportTicketsTableBody");

    updateSupportCounts();

    if (!body) return;

    const search = (
        $("#supportTicketSearch")?.value || ""
    ).trim().toLowerCase();

    const filter = normalizeStatus(
        $("#supportTicketStatusFilter")?.value,
        "all"
    );

    const filteredTickets = supportTickets.filter(ticket => {

        const matchesStatus =
            filter === "all" || normalizeStatus(ticket.status) === filter;

        const searchableText = [
            ticket.id,
            ticket.fullName,
            ticket.email,
            ticket.accountType,
            ticket.category,
            ticket.subject,
            ticket.message
        ].join(" ").toLowerCase();

        return matchesStatus && searchableText.includes(search);

    });

    if (!filteredTickets.length) {

        body.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        ${
                            supportTickets.length
                                ? "No support tickets match your search."
                                : "No support tickets have been submitted yet."
                        }
                    </div>
                </td>
            </tr>
        `;

        return;
    }

    /* column order matches the table header:
       ID, User, Category, Subject, Date, Status, Action */

    body.innerHTML = filteredTickets.map(ticket => {

        const status = ticket.status || "New";

        return `

            <tr>

                <td>
                    <strong>${escapeHTML(ticket.id || "N/A")}</strong>
                </td>

                <td>
                    <div class="table-user">
                        <strong>${escapeHTML(ticket.fullName || "Unknown user")}</strong>
                        <small>${escapeHTML(ticket.email || "")}</small>
                    </div>
                </td>

                <td>${escapeHTML(ticket.category || "General")}</td>

                <td>${escapeHTML(ticket.subject || "No subject")}</td>

                <td>${escapeHTML(formatTicketDate(ticket.createdAt))}</td>

                <td>
                    <span class="status-badge ${supportStatusClass(status)}">
                        ${escapeHTML(status)}
                    </span>
                </td>

                <td>
                    <button
                        class="table-action-btn"
                        type="button"
                        data-support-ticket-id="${escapeHTML(ticket.id)}">
                        View
                    </button>
                </td>

            </tr>

        `;

    }).join("");

    body.querySelectorAll("[data-support-ticket-id]").forEach(button => {

        button.addEventListener("click", () => {

            openSupportTicket(button.dataset.supportTicketId);

        });

    });

}


/* FIND SUPPORT TICKET */

function findSupportTicket(ticketId) {

    return supportTickets.find(ticket =>
        String(ticket.id) === String(ticketId)
    );

}


/* FORMAT FILE SIZE */

function formatFileSize(bytes) {

    const size = Number(bytes);

    if (!Number.isFinite(size) || size <= 0) {
        return "Size unavailable";
    }

    if (size < 1024) {
        return `${size} bytes`;
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;

}


/* OPEN TICKET DETAILS */

function openSupportTicket(ticketId) {

    const ticket = findSupportTicket(ticketId);

    if (!ticket) return;

    currentSupportTicketId = ticketId;

    const content = $("#supportTicketDetailsContent");

    if (!content) return;

    const attachment = ticket.attachment;

    const attachmentHTML = attachment
        ? `
            <div class="support-detail-group">
                <label>Attachment</label>
                <p>${escapeHTML(attachment.name || "Uploaded file")}</p>
                <p>
                    ${escapeHTML(attachment.type || "File")}
                    ${
                        attachment.size
                            ? ` · ${escapeHTML(formatFileSize(attachment.size))}`
                            : ""
                    }
                </p>
                <p class="settings-note">
                    This preview stores attachment details only.
                    The actual uploaded file is not available here.
                </p>
            </div>
        `
        : `
            <div class="support-detail-group">
                <label>Attachment</label>
                <p>No attachment provided.</p>
            </div>
        `;

    const replies = Array.isArray(ticket.replies)
        ? ticket.replies
        : [];

    const repliesHTML = replies.length
        ? replies.map(reply => `
            <div class="support-detail-group">
                <label>
                    ${escapeHTML(reply.sender || "Support")}
                    · ${escapeHTML(formatTicketDate(reply.createdAt))}
                </label>
                <div class="support-ticket-message">
                    ${escapeHTML(reply.message || "")}
                </div>
            </div>
        `).join("")
        : `
            <p class="empty-state">
                No replies have been added to this ticket.
            </p>
        `;

    const currentStatus = normalizeStatus(ticket.status);

    content.innerHTML = `

        <div class="support-detail-group">
            <label>Ticket ID</label>
            <p>${escapeHTML(ticket.id)}</p>
        </div>

        <div class="support-detail-group">
            <label>Submitted by</label>
            <p>${escapeHTML(ticket.fullName || "Not provided")}</p>
        </div>

        <div class="support-detail-group">
            <label>Email address</label>
            <p>${escapeHTML(ticket.email || "Not provided")}</p>
        </div>

        <div class="support-detail-group">
            <label>Account type</label>
            <p>${escapeHTML(ticket.accountType || "Not provided")}</p>
        </div>

        <div class="support-detail-group">
            <label>Category</label>
            <p>${escapeHTML(ticket.category || "General")}</p>
        </div>

        <div class="support-detail-group">
            <label>Subject</label>
            <p>${escapeHTML(ticket.subject || "No subject")}</p>
        </div>

        <div class="support-detail-group">
            <label>Message</label>
            <div class="support-ticket-message">${escapeHTML(ticket.message || "No message provided.")}</div>
        </div>

        ${attachmentHTML}

        <div class="support-detail-group">
            <label>Submitted</label>
            <p>${escapeHTML(formatTicketDate(ticket.createdAt))}</p>
        </div>

        <div class="support-detail-group">
            <label>Last updated</label>
            <p>${escapeHTML(formatTicketDate(ticket.updatedAt || ticket.createdAt))}</p>
        </div>

        <div class="support-detail-group">
            <label for="supportTicketStatusUpdate">Current status</label>

            <select id="supportTicketStatusUpdate">
                <option value="New" ${currentStatus === "new" ? "selected" : ""}>New</option>
                <option value="In Progress" ${currentStatus === "in-progress" ? "selected" : ""}>In Progress</option>
                <option value="Resolved" ${currentStatus === "resolved" ? "selected" : ""}>Resolved</option>
            </select>

            <div>
                <button
                    type="button"
                    class="primary-btn"
                    id="saveSupportTicketStatus">
                    Update Status
                </button>
            </div>
        </div>

        <div class="support-detail-group">
            <label>Conversation history</label>
            ${repliesHTML}
        </div>

        <div class="support-detail-group">
            <label for="supportAdminReply">Admin reply</label>

            <textarea
                id="supportAdminReply"
                rows="4"
                maxlength="3000"
                placeholder="Write a response to this support ticket..."></textarea>

            <div>
                <button
                    type="button"
                    class="primary-btn"
                    id="sendSupportAdminReply">
                    Save Reply
                </button>
            </div>

            <p class="settings-note">
                Preview only: this saves the reply in this browser.
                It does not send an email to the user.
            </p>
        </div>

    `;

    showModal("supportTicketDetailsModal");

    initializeSupportTicketActions(ticketId);

}


/* UPDATE TICKET STATUS AND SAVE ADMIN REPLIES */

function initializeSupportTicketActions(ticketId) {

    const statusButton = $("#saveSupportTicketStatus");
    const replyButton = $("#sendSupportAdminReply");

    statusButton?.addEventListener("click", () => {

        const ticket = findSupportTicket(ticketId);

        if (!ticket) return;

        const newStatus = $("#supportTicketStatusUpdate")?.value;

        if (!newStatus) return;

        ticket.status = newStatus;
        ticket.updatedAt = new Date().toISOString();

        if (!saveSupportTickets()) return;

        renderSupportTickets();

        logActivity("Updated ticket status", String(ticket.id));

        showToast("Support ticket status updated.");

        openSupportTicket(ticketId);

    });


    replyButton?.addEventListener("click", () => {

        const ticket = findSupportTicket(ticketId);

        if (!ticket) return;

        const replyInput = $("#supportAdminReply");

        const message = replyInput?.value.trim();

        if (!message) {

            showToast("Please write a reply first.");

            replyInput?.focus();

            return;
        }

        if (!Array.isArray(ticket.replies)) {
            ticket.replies = [];
        }

        ticket.replies.push({
            sender: "VORVENA Support Team",
            message,
            createdAt: new Date().toISOString()
        });

        ticket.updatedAt = new Date().toISOString();

        if (!saveSupportTickets()) return;

        renderSupportTickets();

        logActivity("Replied to ticket", String(ticket.id));

        showToast("Admin reply saved in preview.");

        openSupportTicket(ticketId);

    });

}


/* SUPPORT SEARCH AND FILTERS */

function initializeSupportFilters() {

    $("#supportTicketSearch")?.addEventListener(
        "input",
        renderSupportTickets
    );

    $("#supportTicketStatusFilter")?.addEventListener(
        "change",
        renderSupportTickets
    );

}


/* LISTEN FOR CHANGES FROM ANOTHER TAB */

function initializeSupportStorageListener() {

    window.addEventListener("storage", event => {

        if (event.key === SUPPORT_STORAGE_KEY) {

            loadSupportTickets();

            showToast("Support tickets refreshed.");

        }

    });

}


/* INITIALIZE SUPPORT TICKETS */

function initializeSupportTickets() {

    initializeSupportFilters();

    initializeSupportStorageListener();

    loadSupportTickets();

}


/* =========================================================
   19. MODAL CLOSING
========================================================= */

function initializeModals() {

    $$("[data-close-modal]").forEach(button => {

        button.addEventListener("click", () => {

            const modal = button.closest(".admin-modal");

            if (modal) {
                closeModal(modal);
            }

        });

    });

    $$(".admin-modal").forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal(modal);
            }

        });

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            $$(".admin-modal.active").forEach(modal => closeModal(modal));

        }

    });

}


/* =========================================================
   20. INITIALIZE DASHBOARD
========================================================= */

function initializeAdminDashboard() {

    try {

        loadAdminProfile();
        initializeAdminProfile();

        initializeNavigation();
        initializeMobileMenu();

        initializeUserTabs();
        initializeUserFilters();

        initializeSuspension();
        initializeDelete();

        initializeProjectFilters();

        initializeNotifications();
        initializeConversations();

        initializeVerification();
        initializeActivity();

        initializeSupportTickets();

        initializeModals();

        loadOverview();

        renderUsers();
        renderProjects();
        loadPayouts();

        renderNotifications();
        renderConversations();

        renderVerification();
        renderActivity();

        syncSuspensionDuration();

        console.log(
            "VORVENA Admin Dashboard loaded in frontend preview mode."
        );

    } catch (error) {

        console.error("Admin dashboard failed to start:", error);

    } finally {

        /* the loader always hides, even if something above fails */
        hideLoader();

    }

}


/* =========================================================
   21. START
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAdminDashboard
    );

} else {

    initializeAdminDashboard();

}