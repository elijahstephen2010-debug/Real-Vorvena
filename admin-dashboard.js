
/* =========================================================
   VORVENA ADMIN DASHBOARD
   FRONTEND PREVIEW MODE
   NO BACKEND OR LOGIN REQUIRED
========================================================= */

const ADMIN_PREVIEW_MODE = true;


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
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(amount);
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
        "unverified": "status-unverified"
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
    modal.classList.remove("active");
}


/* =========================================================
   3. ADMIN PROFILE
========================================================= */

function loadAdminProfile() {
    const name = "Platform Administrator";

    setText("adminName", name);
    setText("sidebarAdminName", name);
    setText("settingsAdminName", name);
    setText("settingsAdminEmail", "admin@vorvena.com");

    const avatar = "images/default-avatar.png";

    ["adminAvatar", "sidebarAdminAvatar"].forEach(id => {
        const image = document.getElementById(id);

        if (image) {
            image.src = avatar;
        }
    });

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


/* =========================================================
   4. DASHBOARD OVERVIEW
========================================================= */

function loadOverview() {

    setText("totalProfessionals", adminData.professionals.length);
    setText("totalClients", adminData.clients.length);

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
   5. NAVIGATION
========================================================= */

function initializeNavigation() {

    $$(".admin-nav-link").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const sectionName = link.dataset.section;

            $$(".admin-nav-link").forEach(item =>
                item.classList.remove("active")
            );

            $$(".admin-section").forEach(section =>
                section.classList.remove("active")
            );

            link.classList.add("active");

            const target = document.getElementById(sectionName);

            if (target) {
                target.classList.add("active");
            }

            closeSidebar();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

    const notificationButton = $("#adminNotificationBtn");

    if (notificationButton) {
        notificationButton.addEventListener("click", () => {
            openSection("notifications");
        });
    }
}


function openSection(sectionName) {

    const link = $(`.admin-nav-link[data-section="${sectionName}"]`);

    if (link) {
        link.click();
    }
}


/* =========================================================
   6. MOBILE SIDEBAR
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
   7. USER MANAGEMENT
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

    const totalClients = adminData.clients.length;
    const totalProfessionals = adminData.professionals.length;

    setText("clientTabCount", totalClients);
    setText("professionalTabCount", totalProfessionals);

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

            <td>${user.projects}</td>

            <td>
                <button class="table-action-btn"
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


function viewUser(id) {

    const user = findUser(id);

    if (!user) return;

    const professional = adminData.professionals.includes(user);

    const content = $("#userDetailsContent");

    if (!content) return;

    content.innerHTML = `

        <h3>${escapeHTML(user.name)}</h3>

        <p><strong>Account ID:</strong> ${escapeHTML(user.id)}</p>

        <p><strong>Email:</strong> ${escapeHTML(user.email)}</p>

        <p><strong>Phone:</strong> ${escapeHTML(user.phone)}</p>

        <p><strong>Country:</strong> ${escapeHTML(user.country)}</p>

        <p><strong>Status:</strong> ${escapeHTML(statusLabel(user.status))}</p>

        <p><strong>Projects:</strong> ${user.projects}</p>

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

            <button class="primary-btn" id="demoSuspendButton">
                ${user.status === "suspended" ? "Reinstate Account" : "Suspend Account"}
            </button>

            <button class="danger-btn" id="demoDeleteButton">
                Delete Account
            </button>

        </div>

    `;

    showModal("userDetailsModal");

    $("#demoSuspendButton")?.addEventListener("click", () => {

        if (user.status === "suspended") {

            user.status = "active";

            showToast("Preview: account reinstated.");

            closeModal($("#userDetailsModal"));

            renderUsers();

            return;
        }

        $("#suspendUserId").value = user.id;

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
   8. USER SEARCH AND FILTERS
========================================================= */

function initializeUserFilters() {

    $("#userSearch")?.addEventListener("input", renderUsers);

    $("#userStatusFilter")?.addEventListener("change", renderUsers);

}


/* =========================================================
   9. SUSPENSION PREVIEW
========================================================= */

function initializeSuspension() {

    const form = $("#suspendUserForm");

    if (!form) return;

    $("#suspensionType")?.addEventListener("change", () => {

        const temporary =
            $("#suspensionType").value === "temporary";

        const duration = $("#suspensionDurationGroup");

        if (duration) {
            duration.style.display = temporary ? "flex" : "none";
        }

    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        const id = $("#suspendUserId").value;

        const user = findUser(id);

        if (!user) return;

        user.status = "suspended";

        closeModal($("#suspendUserModal"));

        form.reset();

        renderUsers();

        showToast("Preview only: account suspended.");

    });

}


/* =========================================================
   10. DELETE ACCOUNT PREVIEW
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

        showToast("Preview only: sample account removed.");

    });

}


/* =========================================================
   11. PROJECT MANAGEMENT
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
                <button class="table-action-btn"
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
   12. PAYOUTS
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
   13. NOTIFICATIONS
========================================================= */

function renderNotifications() {

    const container = $("#adminNotificationList");

    if (!container) return;

    container.innerHTML = adminData.notifications.map((item, index) => `

        <div class="admin-notification-item ${item.unread ? "unread" : ""}">

            <div class="notification-content">

                <strong>${escapeHTML(item.title)}</strong>

                <p>${escapeHTML(item.message)}</p>

                <small>${escapeHTML(item.time)}</small>

                ${
                    item.unread
                    ? `<button class="table-action-btn"
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
   14. CONVERSATION MONITORING
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

    container.innerHTML = conversation.messages.map(message => `

        <div class="admin-message ${message.type}">

            <strong>${escapeHTML(message.sender)}</strong>

            <p>${escapeHTML(message.message)}</p>

            <small>${escapeHTML(message.time)}</small>

        </div>

    `).join("");

    showToast("Preview conversation opened.");

}


function initializeConversations() {

    $("#conversationSearch")?.addEventListener(
        "input",
        renderConversations
    );

}


/* =========================================================
   15. VERIFICATION
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
                <button class="table-action-btn"
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
   16. ACTIVITY LOGS
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
   17. MODAL CLOSING
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

            $$(".admin-modal.active").forEach(closeModal);

        }

    });

}


/* =========================================================
   18. INITIALIZE DASHBOARD
========================================================= */

function initializeAdminDashboard() {

    loadAdminProfile();

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

    initializeModals();

    loadOverview();

    renderUsers();
    renderProjects();
    loadPayouts();

    renderNotifications();
    renderConversations();

    renderVerification();
    renderActivity();

    hideLoader();

    console.log(
        "VORVENA Admin Dashboard loaded in frontend preview mode."
    );

}


/* =========================================================
   19. START
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAdminDashboard
    );

} else {

    initializeAdminDashboard();

}
