
/* =========================================
   VORVENA PROJECT WORKSPACE
   Shared Client + Professional Workspace

   FRONTEND DEMO VERSION

   IMPORTANT:
   Real-time messaging, secure file storage,
   payment verification and authorization
   must be handled by the backend.
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. STORAGE KEYS
    ===================================== */

    const STORAGE = {
        sharedOffers: "vorvenaSharedOffers",
        clientOffers: "vorvenaClientOffers",
        professionalOffers: "vorvenaProfessionalOffers",

        professionalProfile: "vorvenaProfessionalProfile",
        clientProfile: "vorvenaClientProfile",

        professionalImage: "vorvenaProfileImage",
        clientImage: "vorvenaClientProfileImage",

        messages: "vorvenaWorkspaceMessages",
        files: "vorvenaWorkspaceFiles",
        milestones: "vorvenaWorkspaceMilestones",
        submissions: "vorvenaWorkspaceSubmissions",
        revisions: "vorvenaWorkspaceRevisions",
        activity: "vorvenaWorkspaceActivity"
    };


    /* =====================================
       2. GENERAL HELPERS
    ===================================== */

    const getElement = id => document.getElementById(id);

    function readStorage(key, fallback = []) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value ?? fallback;
        } catch {
            return fallback;
        }
    }

    function saveStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Storage error:", error);
            showToast("Storage limit reached. Try a smaller file.");
            return false;
        }
    }

    function safeText(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function formatDate(value) {
        if (!value) return "Not set";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Not set";

        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function formatTime(value) {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "";

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function formatMoney(value) {
        const amount = Number(value);

        if (!Number.isFinite(amount)) return "—";

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(amount);
    }

    function formatFileSize(bytes) {
        if (!bytes) return "0 KB";

        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(1) + " KB";
        }

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }

    function showToast(message) {
        const toast = getElement("workspaceToast");
        const toastMessage = getElement("workspaceToastMessage");

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    let toastTimer;


    /* =====================================
       3. CURRENT USER
    ===================================== */

    const isLoggedIn = sessionStorage.getItem("vorvenaLoggedIn");
    const currentRole = (
        sessionStorage.getItem("vorvenaLoggedInRole") || ""
    ).toLowerCase();

    const currentEmail = (
        sessionStorage.getItem("vorvenaLoggedInEmail") || ""
    ).toLowerCase();

    if (isLoggedIn !== "true" || !["client", "professional"].includes(currentRole)) {
        window.location.href = "login.html";
        return;
    }

    const currentUser = {
        role: currentRole,
        email: currentEmail
    };


    /* =====================================
       4. PROFILE INFORMATION
    ===================================== */

    const professionalProfile = readStorage(
        STORAGE.professionalProfile,
        {}
    );

    const clientProfile = readStorage(
        STORAGE.clientProfile,
        {}
    );

    function getProfileName(profile, fallback) {
        return (
            profile.fullName ||
            profile.fullname ||
            profile.name ||
            profile.firstName ||
            profile.username ||
            fallback
        );
    }

    function getProfileEmail(profile) {
        return String(
            profile.email ||
            profile.userEmail ||
            ""
        ).toLowerCase();
    }

    function getCurrentProfile() {
        if (currentRole === "professional") {
            return professionalProfile;
        }

        return clientProfile;
    }

    function getCurrentUserName() {
        const profile = getCurrentProfile();

        return getProfileName(
            profile,
            currentRole === "professional" ? "Professional" : "Client"
        );
    }

    function getCurrentUserImage() {
        if (currentRole === "professional") {
            return (
                localStorage.getItem(STORAGE.professionalImage) ||
                professionalProfile.profileImage ||
                professionalProfile.photo ||
                "images/default-avatar.png"
            );
        }

        return (
            localStorage.getItem(STORAGE.clientImage) ||
            clientProfile.profileImage ||
            clientProfile.photo ||
            "images/default-avatar.png"
        );
    }

    function getProfileForRole(role) {
        return role === "professional"
            ? professionalProfile
            : clientProfile;
    }

    function getImageForRole(role, profile) {
        if (role === "professional") {
            return (
                localStorage.getItem(STORAGE.professionalImage) ||
                profile.profileImage ||
                profile.photo ||
                "images/default-avatar.png"
            );
        }

        return (
            localStorage.getItem(STORAGE.clientImage) ||
            profile.profileImage ||
            profile.photo ||
            "images/default-avatar.png"
        );
    }


    /* =====================================
       5. PROJECT IDENTIFICATION
    ===================================== */

    const params = new URLSearchParams(window.location.search);

    const requestedProjectId = params.get("projectId");

    const allOffers = [
        ...readStorage(STORAGE.sharedOffers, []),
        ...readStorage(STORAGE.clientOffers, []),
        ...readStorage(STORAGE.professionalOffers, [])
    ];

    const uniqueOffers = [
        ...new Map(
            allOffers
                .filter(offer => offer && typeof offer === "object")
                .map(offer => [String(offer.id || offer.offerId), offer])
        ).values()
    ];

    function getOfferId(offer) {
        return String(offer.id || offer.offerId || "");
    }

    function findProject() {
        let project = null;

        if (requestedProjectId) {
            project = uniqueOffers.find(
                offer => getOfferId(offer) === String(requestedProjectId)
            );
        } else {
            project = uniqueOffers.find(offer => {
                return offer.status === "accepted" &&
                    isOfferForCurrentUser(offer);
            });
        }

        return project;
    }

    function isOfferForCurrentUser(offer) {
        if (currentRole === "client") {
            const email = String(
                offer.clientEmail || offer.hiringEmail || ""
            ).toLowerCase();

            return !email || !currentEmail || email === currentEmail;
        }

        const email = String(
            offer.professionalEmail || ""
        ).toLowerCase();

        if (email && currentEmail) {
            return email === currentEmail;
        }

        return true;
    }

    const project = findProject();

    if (!project) {
        showProjectError(
            "Project not found",
            "We couldn't find a project connected to your account."
        );
        return;
    }

    if (project.status !== "accepted") {
        showProjectError(
            "Project not available",
            "This project must be accepted before a workspace can be opened."
        );
        return;
    }


    /* =====================================
       6. PAYMENT ACCESS CHECK
    ===================================== */

    function isPaymentVerified(offer) {
        const paymentStatus = String(
            offer.paymentStatus ||
            offer.payment?.status ||
            ""
        ).toLowerCase();

        return (
            offer.paymentVerified === true ||
            offer.paid === true ||
            paymentStatus === "paid" ||
            paymentStatus === "verified" ||
            paymentStatus === "success"
        );
    }

    if (!isPaymentVerified(project)) {
        showWorkspaceLock();
        return;
    }

    function showWorkspaceLock() {
        const lock = document.createElement("div");

        lock.id = "workspacePaymentLock";

        lock.style.cssText = `
            position:fixed;
            inset:0;
            z-index:10000;
            background:rgba(4,27,67,.78);
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
            backdrop-filter:blur(5px);
        `;

        lock.innerHTML = `
            <div style="
                width:100%;
                max-width:430px;
                background:white;
                padding:35px 25px;
                border-radius:15px;
                text-align:center;
                box-shadow:0 20px 60px rgba(0,0,0,.2);
            ">
                <div style="
                    width:65px;
                    height:65px;
                    border-radius:50%;
                    background:#fff8e8;
                    color:#c48a20;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:25px;
                    margin:0 auto 20px;
                ">
                    <i class="fa-solid fa-lock"></i>
                </div>

                <h2 style="
                    color:#041b43;
                    font-size:20px;
                    margin-bottom:10px;
                ">
                    Workspace Locked
                </h2>

                <p style="
                    color:#78859b;
                    font-size:12px;
                    line-height:1.8;
                    margin-bottom:22px;
                ">
                    This project workspace will become available
                    after VORVENA verifies the client's payment.
                </p>

                <button id="lockBackButton" style="
                    border:0;
                    background:#082b68;
                    color:white;
                    padding:13px 22px;
                    border-radius:8px;
                    font-size:11px;
                    font-weight:700;
                    cursor:pointer;
                ">
                    Return to Dashboard
                </button>
            </div>
        `;

        document.body.appendChild(lock);

        document.getElementById("lockBackButton").addEventListener(
            "click",
            returnToDashboard
        );
    }

    function showProjectError(title, message) {
        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:25px;
                background:#f4f7fc;
                font-family:'DM Sans',sans-serif;
            ">
                <div style="
                    max-width:430px;
                    background:white;
                    padding:35px;
                    border-radius:14px;
                    text-align:center;
                    border:1px solid #e8edf5;
                ">
                    <h2 style="color:#041b43;margin-bottom:12px;">
                        ${safeText(title)}
                    </h2>

                    <p style="
                        color:#78859b;
                        font-size:12px;
                        line-height:1.8;
                        margin-bottom:20px;
                    ">
                        ${safeText(message)}
                    </p>

                    <button id="projectErrorBack" style="
                        background:#082b68;
                        color:white;
                        border:0;
                        padding:12px 20px;
                        border-radius:8px;
                        cursor:pointer;
                    ">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        `;

        document.getElementById("projectErrorBack").addEventListener(
            "click",
            returnToDashboard
        );
    }


    /* =====================================
       7. PROJECT DATA
    ===================================== */

    const projectId = getOfferId(project);

    const projectTitle = (
        project.projectTitle ||
        project.title ||
        project.jobTitle ||
        "Project Workspace"
    );

    const projectDescription = (
        project.description ||
        project.projectDescription ||
        project.details ||
        "Project requirements and information."
    );

    const projectBudget = (
        project.budget ||
        project.amount ||
        project.projectBudget ||
        0
    );

    const projectDeadline = (
        project.deadline ||
        project.dueDate ||
        project.projectDeadline ||
        ""
    );

    const projectStartDate = (
        project.acceptedAt ||
        project.createdAt ||
        project.date ||
        ""
    );


    /* =====================================
       8. PARTICIPANT INFORMATION
    ===================================== */

    const clientName = (
        project.clientName ||
        project.hiringName ||
        getProfileName(clientProfile, "Client")
    );

    const professionalName = (
        project.professionalName ||
        project.freelancerName ||
        getProfileName(professionalProfile, "Professional")
    );

    const clientAvatar = (
        project.clientImage ||
        project.clientPhoto ||
        getImageForRole("client", clientProfile)
    );

    const professionalAvatar = (
        project.professionalImage ||
        project.professionalPhoto ||
        getImageForRole("professional", professionalProfile)
    );

    const partnerRole = currentRole === "client"
        ? "Professional"
        : "Client";

    const partnerName = currentRole === "client"
        ? professionalName
        : clientName;

    const partnerAvatar = currentRole === "client"
        ? professionalAvatar
        : clientAvatar;

    const currentUserName = getCurrentUserName();
    const currentUserAvatar = getCurrentUserImage();


    /* =====================================
       9. INITIALIZE PROFILE INFORMATION
    ===================================== */

    function setImage(id, source) {
        const image = getElement(id);

        if (!image) return;

        image.src = source || "images/default-avatar.png";

        image.onerror = () => {
            image.onerror = null;
            image.src = "images/default-avatar.png";
        };
    }

    function initializeProjectInformation() {

        document.title = projectTitle + " | VORVENA";

        getElement("headerProjectTitle").textContent = projectTitle;
        getElement("sidebarProjectTitle").textContent = projectTitle;

        getElement("projectTitle").textContent = projectTitle;
        getElement("projectDescription").textContent = projectDescription;

        getElement("projectBudget").textContent = formatMoney(projectBudget);

        getElement("projectDeadline").textContent = formatDate(projectDeadline);

        getElement("projectStartDate").textContent = formatDate(projectStartDate);

        getElement("projectMemberRole").textContent =
            currentRole === "client" ? "Client" : "Professional";

        getElement("currentUserName").textContent = currentUserName;

        getElement("currentUserRole").textContent =
            currentRole === "client" ? "Client" : "Professional";

        getElement("clientName").textContent = clientName;
        getElement("professionalName").textContent = professionalName;

        getElement("messagePartnerName").textContent = partnerName;
        getElement("messagePartnerRole").textContent = partnerRole;

        getElement("chatInfoName").textContent = partnerName;
        getElement("chatInfoRole").textContent = partnerRole;

        getElement("chatInfoProject").textContent = projectTitle;

        getElement("chatInfoStatus").textContent = "In Progress";

        setImage("currentUserAvatar", currentUserAvatar);

        setImage("clientAvatar", clientAvatar);
        setImage("professionalAvatar", professionalAvatar);

        setImage("messagePartnerAvatar", partnerAvatar);
        setImage("chatInfoAvatar", partnerAvatar);

        getElement(
            currentRole === "client"
                ? "clientYouLabel"
                : "professionalYouLabel"
        ).textContent = "YOU";

        getElement(
            currentRole === "client"
                ? "professionalYouLabel"
                : "clientYouLabel"
        ).textContent = "";

        getElement("headerProjectStatus").innerHTML = `
            <span class="status-dot"></span>
            <span>In Progress</span>
        `;

        getElement("projectStatusBadge").textContent = "In Progress";

        updateDeadline();
    }


    /* =====================================
       10. DEADLINE
    ===================================== */

    function updateDeadline() {

        const deadlineDisplay = getElement("deadlineDisplay");
        const remaining = getElement("deadlineRemaining");

        deadlineDisplay.textContent = formatDate(projectDeadline);

        if (!projectDeadline) {
            remaining.textContent = "No deadline specified.";
            return;
        }

        const difference = new Date(projectDeadline) - new Date();

        const days = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        if (days < 0) {
            remaining.textContent = "The project deadline has passed.";
        } else if (days === 0) {
            remaining.textContent = "Deadline is today.";
        } else {
            remaining.textContent = days + " days remaining.";
        }
    }


    /* =====================================
       11. PROJECT STORAGE
    ===================================== */

    function projectStorageKey(base) {
        return base + "_" + projectId;
    }

    function getProjectData(base) {
        return readStorage(projectStorageKey(base), []);
    }

    function saveProjectData(base, data) {
        return saveStorage(projectStorageKey(base), data);
    }


    /* =====================================
       12. NAVIGATION
    ===================================== */

    function openSection(sectionId) {

        const target = getElement(sectionId);

        if (!target) return;

        document.querySelectorAll(".workspace-section").forEach(section => {
            section.classList.remove("active");
        });

        document.querySelectorAll(".sidebar-link").forEach(button => {
            button.classList.remove("active");
        });

        target.classList.add("active");

        const activeButton = document.querySelector(
            `.sidebar-link[data-section="${sectionId}"]`
        );

        if (activeButton) {
            activeButton.classList.add("active");
        }

        document.querySelector(".workspace-sidebar")
            ?.classList.remove("mobile-open");

        if (sectionId === "messages") renderMessages();
        if (sectionId === "files") renderFiles();
        if (sectionId === "milestones") renderMilestones();
        if (sectionId === "submissions") renderSubmissions();
        if (sectionId === "revisions") renderRevisions();
        if (sectionId === "activity") renderActivity();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    document.querySelectorAll(".sidebar-link").forEach(button => {
        button.addEventListener("click", () => {
            openSection(button.dataset.section);
        });
    });

    document.querySelectorAll("[data-open-section]").forEach(button => {
        button.addEventListener("click", () => {
            openSection(button.dataset.openSection);
        });
    });


    /* =====================================
       13. DASHBOARD NAVIGATION
    ===================================== */

    function returnToDashboard() {
        window.location.href = currentRole === "client"
            ? "client-dashboard.html"
            : "professional-dashboard.html";
    }

    getElement("backToDashboard").addEventListener(
        "click",
        event => {
            event.preventDefault();
            returnToDashboard();
        }
    );


    /* =====================================
       14. MODAL MANAGEMENT
    ===================================== */

    function openModal(id) {
        const modal = getElement(id);

        if (modal) modal.classList.add("show");
    }

    function closeModal(id) {
        const modal = getElement(id);

        if (modal) modal.classList.remove("show");
    }

    document.querySelectorAll("[data-close-modal]").forEach(button => {
        button.addEventListener("click", () => {
            closeModal(button.dataset.closeModal);
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".workspace-modal.show").forEach(modal => {
                modal.classList.remove("show");
            });
        }
    });


    /* =====================================
       15. ACTIVITY HISTORY
    ===================================== */

    function addActivity(message, icon = "fa-circle-info") {

        const activities = getProjectData(STORAGE.activity);

        activities.unshift({
            id: Date.now().toString(),
            message,
            icon,
            user: currentUserName,
            role: currentRole,
            createdAt: new Date().toISOString()
        });

        saveProjectData(STORAGE.activity, activities);

        renderActivity();
    }

    function renderActivity() {

        const activities = getProjectData(STORAGE.activity);

        const containers = [
            getElement("fullActivityList"),
            getElement("overviewActivityList")
        ];

        containers.forEach(container => {

            if (!container) return;

            if (!activities.length) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fa-regular fa-clock"></i>
                        <h3>No activity recorded</h3>
                        <p>Project updates will appear here.</p>
                    </div>
                `;
                return;
            }

            const limit = container.id === "overviewActivityList"
                ? 4
                : activities.length;

            container.innerHTML = activities.slice(0, limit).map(item => `
                <div class="activity-item">

                    <div class="activity-icon">
                        <i class="fa-solid ${safeText(item.icon)}"></i>
                    </div>

                    <div class="activity-content">

                        <p>
                            <strong>${safeText(item.user)}</strong>
                            ${safeText(item.message)}
                        </p>

                        <span>
                            ${formatDate(item.createdAt)}
                            · ${formatTime(item.createdAt)}
                        </span>

                    </div>

                </div>
            `).join("");
        });
    }


    /* =====================================
       16. MESSAGING SYSTEM
       FRONTEND DEMO
    ===================================== */

    let selectedMessageFiles = [];

    function getMessages() {
        return getProjectData(STORAGE.messages);
    }

    function renderMessages() {

        const container = getElement("messagesContainer");
        const messages = getMessages();

        if (!messages.length) {
            container.innerHTML = `
                <div class="message-empty-state">

                    <div class="empty-message-icon">
                        <i class="fa-regular fa-comments"></i>
                    </div>

                    <h3>Start the conversation</h3>

                    <p>
                        Send a message to your project partner.
                        Your project communication will appear here.
                    </p>

                </div>
            `;

            getElement("messageCount").textContent = "0";
            return;
        }

        container.innerHTML = messages.map(message => {

            const ownMessage = message.senderEmail
                ? message.senderEmail.toLowerCase() === currentEmail
                : message.senderRole === currentRole;

            const attachments = (message.attachments || []).map(file => `
                <div class="message-file-card">

                    <i class="fa-solid ${getFileIcon(file.name)}"></i>

                    <div class="message-file-info">
                        <strong>${safeText(file.name)}</strong>
                        <span>${formatFileSize(file.size)}</span>
                    </div>

                    ${
                        file.data
                        ? `<a href="${file.data}" download="${safeText(file.name)}" aria-label="Download file">
                            <i class="fa-solid fa-download"></i>
                           </a>`
                        : ""
                    }

                </div>
            `).join("");

            return `
                <div class="message-row ${ownMessage ? "own-message" : ""}">

                    <img
                        src="${safeText(message.senderImage || "images/default-avatar.png")}"
                        alt="${safeText(message.senderName)}"
                        onerror="this.src='images/default-avatar.png'"
                    >

                    <div class="message-bubble-wrap">

                        <span class="message-sender-name">
                            ${safeText(message.senderName)}
                        </span>

                        ${
                            message.text
                            ? `<div class="message-bubble">${safeText(message.text)}</div>`
                            : ""
                        }

                        ${attachments}

                        <span class="message-time">
                            ${formatTime(message.createdAt)}
                        </span>

                    </div>

                </div>
            `;
        }).join("");

        getElement("messageCount").textContent = messages.length;

        container.scrollTop = container.scrollHeight;

        renderSharedFiles();
    }


    /* =====================================
       17. MESSAGE FILE SELECTION
    ===================================== */

    const messageFileInput = getElement("messageFileInput");

    getElement("attachMessageFile").addEventListener("click", () => {
        messageFileInput.click();
    });

    messageFileInput.addEventListener("change", () => {

        const selected = Array.from(messageFileInput.files || []);

        selectedMessageFiles = [
            ...selectedMessageFiles,
            ...selected
        ];

        showMessageAttachmentPreview();

        messageFileInput.value = "";
    });

    function showMessageAttachmentPreview() {

        const preview = getElement("messageAttachmentPreview");

        if (!selectedMessageFiles.length) {
            preview.hidden = true;
            return;
        }

        preview.hidden = false;

        const names = selectedMessageFiles.map(file => file.name);

        getElement("messageAttachmentName").textContent =
            names.join(", ");

        getElement("messageAttachmentSize").textContent =
            selectedMessageFiles.length + " file(s) selected";
    }

    getElement("removeMessageAttachment").addEventListener("click", () => {

        selectedMessageFiles = [];

        showMessageAttachmentPreview();
    });


    /* =====================================
       18. SEND MESSAGE
    ===================================== */

    function readFile(file) {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = () => resolve({
                name: file.name,
                size: file.size,
                type: file.type,
                data: reader.result
            });

            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    }

    getElement("messageForm").addEventListener("submit", async event => {

        event.preventDefault();

        const input = getElement("messageInput");

        const text = input.value.trim();

        if (!text && !selectedMessageFiles.length) {
            showToast("Write a message or attach a file.");
            return;
        }

        const sendButton = event.submitter;

        if (sendButton) sendButton.disabled = true;

        try {

            const attachments = [];

            for (const file of selectedMessageFiles) {

                if (file.size > 1.5 * 1024 * 1024) {
                    showToast("For this demo, message attachments must be under 1.5 MB each.");
                    return;
                }

                attachments.push(await readFile(file));
            }

            const messages = getMessages();

            messages.push({
                id: Date.now().toString(),
                text,
                attachments,

                senderName: currentUserName,
                senderRole: currentRole,
                senderEmail: currentEmail,
                senderImage: currentUserAvatar,

                createdAt: new Date().toISOString()
            });

            if (!saveProjectData(STORAGE.messages, messages)) return;

            input.value = "";
            selectedMessageFiles = [];

            showMessageAttachmentPreview();

            renderMessages();

            addActivity(
                "sent a project message.",
                "fa-comment"
            );

        } catch (error) {

            console.error(error);

            showToast("Unable to attach the selected file.");

        } finally {

            if (sendButton) sendButton.disabled = false;
        }
    });


    /* =====================================
       19. FILE HELPERS
    ===================================== */

    function getFileIcon(name = "") {

        const extension = name.split(".").pop().toLowerCase();

        const icons = {
            pdf: "fa-file-pdf",
            doc: "fa-file-word",
            docx: "fa-file-word",
            xls: "fa-file-excel",
            xlsx: "fa-file-excel",
            ppt: "fa-file-powerpoint",
            pptx: "fa-file-powerpoint",
            zip: "fa-file-zipper",
            rar: "fa-file-zipper",
            jpg: "fa-file-image",
            jpeg: "fa-file-image",
            png: "fa-file-image",
            gif: "fa-file-image",
            webp: "fa-file-image",
            mp4: "fa-file-video",
            mp3: "fa-file-audio",
            txt: "fa-file-lines"
        };

        return icons[extension] || "fa-file";
    }

    function getFileCategory(file) {

        const extension = file.name.split(".").pop().toLowerCase();

        if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
            return "images";
        }

        if (["zip", "rar", "7z"].includes(extension)) {
            return "archives";
        }

        return "documents";
    }


    /* =====================================
       20. PROJECT FILE UPLOAD
    ===================================== */

    let selectedProjectFiles = [];

    getElement("openFileUpload").addEventListener("click", () => {
        openModal("fileUploadModal");
    });

    getElement("modalFileInput").addEventListener("change", event => {

        selectedProjectFiles = Array.from(event.target.files || []);

        renderSelectedFiles(
            "modalSelectedFiles",
            selectedProjectFiles
        );
    });

    function renderSelectedFiles(containerId, files) {

        const container = getElement(containerId);

        container.innerHTML = files.map(file => `
            <div class="selected-file-item">
                <i class="fa-solid ${getFileIcon(file.name)}"></i>
                <span>
                    ${safeText(file.name)}
                    (${formatFileSize(file.size)})
                </span>
            </div>
        `).join("");
    }

    getElement("confirmFileUpload").addEventListener("click", async () => {

        if (!selectedProjectFiles.length) {
            showToast("Select at least one file.");
            return;
        }

        const existingFiles = getProjectData(STORAGE.files);

        try {

            const newFiles = [];

            for (const file of selectedProjectFiles) {

                if (file.size > 1.5 * 1024 * 1024) {
                    showToast("For this demo, files must be under 1.5 MB each.");
                    return;
                }

                const data = await readFile(file);

                newFiles.push({
                    id: Date.now().toString() + Math.random(),
                    ...data,

                    category: getFileCategory(file),

                    uploadedBy: currentUserName,
                    uploaderRole: currentRole,
                    uploaderEmail: currentEmail,

                    createdAt: new Date().toISOString()
                });
            }

            if (!saveProjectData(
                STORAGE.files,
                [...existingFiles, ...newFiles]
            )) return;

            selectedProjectFiles = [];

            getElement("modalFileInput").value = "";

            getElement("modalSelectedFiles").innerHTML = "";

            closeModal("fileUploadModal");

            renderFiles();

            renderSharedFiles();

            addActivity(
                "uploaded project file(s).",
                "fa-file-arrow-up"
            );

            showToast("Files added to the project.");

        } catch (error) {

            console.error(error);

            showToast("Unable to upload these files.");
        }
    });


    /* =====================================
       21. RENDER PROJECT FILES
    ===================================== */

    let currentFileFilter = "all";

    function renderFiles() {

        const files = getProjectData(STORAGE.files);

        const filtered = currentFileFilter === "all"
            ? files
            : files.filter(file => file.category === currentFileFilter);

        getElement("fileCount").textContent =
            files.length + (files.length === 1 ? " file" : " files");

        const container = getElement("projectFilesList");

        if (!filtered.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-regular fa-folder-open"></i>
                    <h3>No files found</h3>
                    <p>Files shared in this project will appear here.</p>
                </div>
            `;

        } else {

            container.innerHTML = filtered.map(file => `

                <div class="file-item">

                    <div class="file-type-icon ${
                        file.category === "images" ? "image" :
                        file.name.toLowerCase().endsWith(".pdf") ? "pdf" : ""
                    }">
                        <i class="fa-solid ${getFileIcon(file.name)}"></i>
                    </div>

                    <div class="file-item-info">

                        <strong>${safeText(file.name)}</strong>

                        <span>
                            ${formatFileSize(file.size)}
                            · Uploaded by ${safeText(file.uploadedBy)}
                            · ${formatDate(file.createdAt)}
                        </span>

                    </div>

                    <div class="file-item-actions">

                        ${
                            file.data
                            ? `<a href="${file.data}" download="${safeText(file.name)}" title="Download">
                                <i class="fa-solid fa-download"></i>
                               </a>`
                            : ""
                        }

                    </div>

                </div>

            `).join("");
        }

        renderSharedFiles();
    }

    document.querySelectorAll("[data-file-filter]").forEach(button => {

        button.addEventListener("click", () => {

            currentFileFilter = button.dataset.fileFilter;

            document.querySelectorAll("[data-file-filter]").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            renderFiles();
        });
    });


    /* =====================================
       22. SHARED FILES IN MESSAGES
    ===================================== */

    function renderSharedFiles() {

        const files = getProjectData(STORAGE.files);

        const container = getElement("chatSharedFiles");

        if (!files.length) {

            container.innerHTML = `
                <div class="empty-state compact-empty">
                    <i class="fa-regular fa-folder-open"></i>
                    <p>No shared files yet.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = files.slice(-4).reverse().map(file => `

            <div class="file-item">

                <div class="file-type-icon">
                    <i class="fa-solid ${getFileIcon(file.name)}"></i>
                </div>

                <div class="file-item-info">
                    <strong>${safeText(file.name)}</strong>
                    <span>${formatFileSize(file.size)}</span>
                </div>

                ${
                    file.data
                    ? `<a href="${file.data}" download="${safeText(file.name)}" aria-label="Download file">
                        <i class="fa-solid fa-download"></i>
                       </a>`
                    : ""
                }

            </div>

        `).join("");
    }


    /* =====================================
       23. MILESTONES
    ===================================== */

    function renderMilestones() {

        const milestones = getProjectData(STORAGE.milestones);

        const completed = milestones.filter(
            item => item.completed
        ).length;

        const remaining = milestones.length - completed;

        getElement("milestoneTotal").textContent = milestones.length;
        getElement("milestoneCompleted").textContent = completed;
        getElement("milestoneRemaining").textContent = remaining;

        getElement("completedMilestones").textContent =
            completed + " milestones completed";

        getElement("totalMilestones").textContent =
            milestones.length + " total";

        const percentage = milestones.length
            ? Math.round((completed / milestones.length) * 100)
            : 0;

        getElement("progressPercentage").textContent = percentage + "%";

        getElement("projectProgressBar").style.width =
            percentage + "%";

        const container = getElement("milestoneList");

        if (!milestones.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-list-check"></i>
                    <h3>No milestones added</h3>
                    <p>Project milestones will appear here.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = milestones.map(item => `

            <div class="milestone-item">

                <div class="milestone-indicator ${
                    item.completed ? "completed" : ""
                }">
                    <i class="fa-solid ${
                        item.completed ? "fa-check" : "fa-list-check"
                    }"></i>
                </div>

                <div class="milestone-content">

                    <strong>${safeText(item.title)}</strong>

                    <p>${safeText(item.description || "No description provided.")}</p>

                    <div class="milestone-meta">

                        <span>
                            <i class="fa-regular fa-calendar"></i>
                            ${formatDate(item.deadline)}
                        </span>

                        <span>
                            ${item.completed ? "Completed" : "In progress"}
                        </span>

                    </div>

                </div>

                <div class="milestone-actions">

                    ${
                        !item.completed
                        ? `<button data-complete-milestone="${safeText(item.id)}">
                            Mark Complete
                           </button>`
                        : `<span style="color:#159b68;font-size:9px;font-weight:700;">
                            Completed
                           </span>`
                    }

                </div>

            </div>

        `).join("");
    }

    getElement("addMilestoneButton").addEventListener("click", () => {

        if (currentRole !== "client") {
            showToast("Only the client can add milestones in this demo.");
            return;
        }

        openModal("milestoneModal");
    });

    getElement("milestoneForm").addEventListener("submit", event => {

        event.preventDefault();

        const title = getElement("milestoneTitle").value.trim();

        const description = getElement("milestoneDescription").value.trim();

        const deadline = getElement("milestoneDeadline").value;

        if (!title || !deadline) return;

        const milestones = getProjectData(STORAGE.milestones);

        milestones.push({
            id: Date.now().toString(),
            title,
            description,
            deadline,
            completed: false,
            createdBy: currentUserName,
            createdAt: new Date().toISOString()
        });

        if (!saveProjectData(STORAGE.milestones, milestones)) return;

        event.target.reset();

        closeModal("milestoneModal");

        renderMilestones();

        addActivity(
            "created a project milestone.",
            "fa-list-check"
        );

        showToast("Milestone added.");
    });

    getElement("milestoneList").addEventListener("click", event => {

        const button = event.target.closest("[data-complete-milestone]");

        if (!button) return;

        const id = button.dataset.completeMilestone;

        const milestones = getProjectData(STORAGE.milestones);

        const item = milestones.find(
            milestone => milestone.id === id
        );

        if (!item) return;

        item.completed = true;
        item.completedAt = new Date().toISOString();

        if (!saveProjectData(STORAGE.milestones, milestones)) return;

        renderMilestones();

        addActivity(
            "completed a project milestone.",
            "fa-check-circle"
        );

        showToast("Milestone completed.");
    });


    /* =====================================
       24. WORK SUBMISSIONS
    ===================================== */

    let selectedSubmissionFiles = [];

    getElement("openSubmissionModal").addEventListener("click", () => {

        if (currentRole !== "professional") {
            showToast("Only the professional can submit completed work.");
            return;
        }

        openModal("submissionModal");
    });

    getElement("submissionFileInput").addEventListener("change", event => {

        selectedSubmissionFiles = Array.from(event.target.files || []);

        renderSelectedFiles(
            "submissionSelectedFiles",
            selectedSubmissionFiles
        );
    });

    getElement("submissionForm").addEventListener("submit", async event => {

        event.preventDefault();

        if (currentRole !== "professional") return;

        const title = getElement("submissionTitle").value.trim();

        const message = getElement("submissionMessage").value.trim();

        if (!title) {
            showToast("Enter a submission title.");
            return;
        }

        if (!message && !selectedSubmissionFiles.length) {
            showToast("Add a message or attach your completed work.");
            return;
        }

        try {

            const attachments = [];

            for (const file of selectedSubmissionFiles) {

                if (file.size > 1.5 * 1024 * 1024) {
                    showToast("For this demo, files must be under 1.5 MB each.");
                    return;
                }

                attachments.push(await readFile(file));
            }

            const submissions = getProjectData(STORAGE.submissions);

            submissions.push({
                id: Date.now().toString(),
                title,
                message,
                attachments,

                submittedBy: currentUserName,
                submittedAt: new Date().toISOString(),

                status: "Under Review"
            });

            if (!saveProjectData(STORAGE.submissions, submissions)) return;

            event.target.reset();

            selectedSubmissionFiles = [];

            getElement("submissionSelectedFiles").innerHTML = "";

            closeModal("submissionModal");

            renderSubmissions();

            addActivity(
                "submitted completed work for review.",
                "fa-cloud-arrow-up"
            );

            showToast("Work submitted.");

        } catch (error) {

            console.error(error);

            showToast("Unable to submit the selected files.");
        }
    });


    function renderSubmissions() {

        const submissions = getProjectData(STORAGE.submissions);

        const container = getElement("submissionsList");

        if (!submissions.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-file-circle-check"></i>
                    <h3>No submissions yet</h3>
                    <p>Work submitted for review will appear here.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = submissions.map(item => `

            <div class="submission-item">

                <div class="submission-icon">
                    <i class="fa-solid fa-file-circle-check"></i>
                </div>

                <div class="submission-info">

                    <strong>${safeText(item.title)}</strong>

                    <p>
                        ${safeText(item.message || "Completed work submitted.")}
                        · ${formatDate(item.submittedAt)}
                    </p>

                    ${
                        (item.attachments || []).map(file => `
                            <a
                                href="${file.data}"
                                download="${safeText(file.name)}"
                                style="display:inline-block;margin-top:8px;color:#174b9a;font-size:9px;"
                            >
                                <i class="fa-solid fa-download"></i>
                                ${safeText(file.name)}
                            </a>
                        `).join("<br>")
                    }

                </div>

                <span class="submission-status">
                    ${safeText(item.status)}
                </span>

            </div>

        `).join("");
    }


    /* =====================================
       25. REVISIONS
    ===================================== */

    function renderRevisions() {

        const revisions = getProjectData(STORAGE.revisions);

        const container = getElement("revisionsList");

        if (!revisions.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-rotate"></i>
                    <h3>No revisions requested</h3>
                    <p>Revision requests will appear here.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = revisions.map(item => `

            <div class="revision-item">

                <strong>${safeText(item.title)}</strong>

                <p>${safeText(item.message)}</p>

                <p>
                    Requested by ${safeText(item.requestedBy)}
                    · ${formatDate(item.createdAt)}
                </p>

                <span class="submission-status">
                    ${safeText(item.status)}
                </span>

            </div>

        `).join("");
    }


    /* =====================================
       26. REVIEW AND REVISION ACTIONS
    ===================================== */

    function reviewSubmission(submissionId, decision) {

        if (currentRole !== "client") {
            showToast("Only the client can review submissions.");
            return;
        }

        const submissions = getProjectData(STORAGE.submissions);

        const submission = submissions.find(
            item => item.id === submissionId
        );

        if (!submission) return;

        submission.status = decision;

        submission.reviewedAt = new Date().toISOString();

        if (!saveProjectData(STORAGE.submissions, submissions)) return;

        renderSubmissions();

        if (decision === "Revision Requested") {

            const revisions = getProjectData(STORAGE.revisions);

            revisions.push({
                id: Date.now().toString(),
                title: submission.title,
                message: "Please review the requested changes with your client.",
                requestedBy: currentUserName,
                createdAt: new Date().toISOString(),
                status: "Open"
            });

            saveProjectData(STORAGE.revisions, revisions);

            renderRevisions();

            addActivity(
                "requested revisions on a work submission.",
                "fa-rotate"
            );

            showToast("Revision requested.");

        } else {

            addActivity(
                "approved a work submission.",
                "fa-circle-check"
            );

            showToast("Submission approved.");
        }
    }

    getElement("submissionsList").addEventListener("click", event => {

        const button = event.target.closest("[data-submission-action]");

        if (!button) return;

        reviewSubmission(
            button.dataset.submissionId,
            button.dataset.submissionAction
        );
    });


    /* =====================================
       27. NOTIFICATIONS BUTTON
    ===================================== */

    getElement("workspaceNotifications").addEventListener("click", () => {

        showToast("Workspace notifications will be connected to the backend.");
    });


    /* =====================================
       28. MOBILE SIDEBAR
    ===================================== */

    const sidebar = document.querySelector(".workspace-sidebar");

    const headerLeft = document.querySelector(".header-left");

    if (window.innerWidth <= 768 && headerLeft) {

        const menuButton = document.createElement("button");

        menuButton.type = "button";
        menuButton.className = "header-icon-btn";
        menuButton.setAttribute("aria-label", "Open navigation");

        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';

        headerLeft.prepend(menuButton);

        menuButton.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });
    }


    /* =====================================
       29. REFRESH PROJECT DATA
    ===================================== */

    window.addEventListener("storage", event => {

        if (!event.key) return;

        if (
            event.key.includes("WorkspaceMessages") ||
            event.key.includes("WorkspaceFiles") ||
            event.key.includes("WorkspaceMilestones") ||
            event.key.includes("WorkspaceSubmissions") ||
            event.key.includes("WorkspaceRevisions") ||
            event.key.includes("WorkspaceActivity")
        ) {
            renderMessages();
            renderFiles();
            renderMilestones();
            renderSubmissions();
            renderRevisions();
            renderActivity();
        }
    });


    /* =====================================
       30. INITIALIZE WORKSPACE
    ===================================== */

    function initializeWorkspace() {

        initializeProjectInformation();

        renderMessages();

        renderFiles();

        renderMilestones();

        renderSubmissions();

        renderRevisions();

        renderActivity();

        const loader = getElement("workspaceLoader");

        if (loader) {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 500);
        }

        console.log("VORVENA workspace initialized.");
        console.log("Project:", projectId);
        console.log("Logged-in role:", currentRole);
    }

    initializeWorkspace();

});
