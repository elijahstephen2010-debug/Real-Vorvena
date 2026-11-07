
/* =========================================================
   VORVENA — PROJECT WORKSPACE
   FRONTEND DEMO VERSION

   Features:
   - Role-based workspace access
   - Payment status check
   - Project overview
   - Messaging and file attachments
   - Project file uploads
   - Milestone management
   - Work submissions
   - Client approval and revision requests
   - Activity history
   - Notifications
   - Responsive mobile navigation

   IMPORTANT:
   This version uses localStorage.
   It is a frontend demonstration, NOT production security.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. STORAGE HELPERS
    ===================================================== */

    const getData = (key, fallback = []) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (error) {
            console.error("Storage read error:", error);
            return fallback;
        }
    };

    const saveData = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Storage write error:", error);
            showToast("Storage is full. Remove some files and try again.", "error");
            return false;
        }
    };

    const escapeHTML = (value = "") => {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]);
    };

    const formatDate = value => {
        if (!value) return "Not specified";

        const date = new Date(value + (String(value).length === 10 ? "T00:00:00" : ""));

        if (Number.isNaN(date.getTime())) return "Not specified";

        return date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const formatDateTime = value => {
        if (!value) return "Just now";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Just now";

        return date.toLocaleString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatMoney = value => {
        const amount = Number(value);

        if (!Number.isFinite(amount)) return "—";

        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(amount);
    };

    const makeId = () => {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    };

    const readFile = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error("Unable to read file."));

            reader.readAsDataURL(file);
        });
    };


    /* =====================================================
       2. ELEMENT HELPERS
    ===================================================== */

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value ?? "";
    };

    const setImage = (id, src) => {
        const element = document.getElementById(id);
        if (element && src) element.src = src;
    };

    const showElement = element => {
        if (element) element.style.display = "";
    };

    const hideElement = element => {
        if (element) element.style.display = "none";
    };


    /* =====================================================
       3. TOAST NOTIFICATIONS
    ===================================================== */

    const toast = $("#workspaceToast");
    const toastMessage = $("#workspaceToastMessage");

    let toastTimeout;

    function showToast(message, type = "success") {
        if (!toast || !toastMessage) {
            console.log(message);
            return;
        }

        toastMessage.textContent = message;

        toast.classList.remove("success", "error");
        toast.classList.add(type);

        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }


    /* =====================================================
       4. CURRENT USER AND PROJECT
    ===================================================== */

    const loggedIn = sessionStorage.getItem("vorvenaLoggedIn");
    const currentRole = (
        sessionStorage.getItem("vorvenaLoggedInRole") || ""
    ).toLowerCase();

    const currentEmail = (
        sessionStorage.getItem("vorvenaLoggedInEmail") || ""
    ).toLowerCase();

    if (loggedIn !== "true" || !["client", "professional"].includes(currentRole)) {
        window.location.href = "login.html";
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("projectId");

    const sharedOffers = getData("vorvenaSharedOffers", []);
    const clientOffers = getData("vorvenaClientOffers", []);
    const professionalOffers = getData("vorvenaProfessionalOffers", []);

    let offer =
        sharedOffers.find(item => String(item.id) === String(projectId)) ||
        clientOffers.find(item => String(item.id) === String(projectId)) ||
        professionalOffers.find(item => String(item.id) === String(projectId));

    if (!offer && !projectId) {
        showWorkspaceError("Project not found. Please return to your dashboard.");
        return;
    }

    if (!offer) {
        showWorkspaceError("This project could not be found.");
        return;
    }

    const projectStatus = String(offer.status || "").toLowerCase();

    if (projectStatus !== "accepted") {
        showWorkspaceError("This project has not been accepted yet.");
        return;
    }

    const paymentStatus = String(
        offer.paymentStatus ||
        offer.payment?.status ||
        ""
    ).toLowerCase();

    const paymentVerified =
        offer.paymentVerified === true ||
        offer.paid === true ||
        ["paid", "verified", "success"].includes(paymentStatus);

    if (!paymentVerified) {
        showWorkspaceError(
            "Payment has not been confirmed. The project workspace is locked until payment is verified."
        );
        return;
    }

    function showWorkspaceError(message) {
        document.body.innerHTML = `
            <main style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:25px;
                background:#f4f7fc;
                font-family:'DM Sans',sans-serif;
                text-align:center;
            ">
                <section style="
                    background:#fff;
                    padding:40px;
                    max-width:480px;
                    width:100%;
                    border-radius:18px;
                    box-shadow:0 10px 40px rgba(0,0,0,.07);
                ">
                    <div style="
                        width:65px;
                        height:65px;
                        margin:0 auto 20px;
                        display:grid;
                        place-items:center;
                        border-radius:50%;
                        background:#fff0f1;
                        color:#d94b57;
                        font-size:26px;
                    ">
                        <i class="fa-solid fa-lock"></i>
                    </div>

                    <h2 style="color:#082b68;margin-bottom:12px;">
                        Workspace Locked
                    </h2>

                    <p style="color:#78859b;line-height:1.7;">
                        ${escapeHTML(message)}
                    </p>

                    <button onclick="history.back()" style="
                        margin-top:22px;
                        padding:13px 24px;
                        border:0;
                        border-radius:8px;
                        background:#082b68;
                        color:white;
                        cursor:pointer;
                        font-weight:600;
                    ">
                        Return to Dashboard
                    </button>
                </section>
            </main>
        `;
    }


    /* =====================================================
       5. USER PROFILE INFORMATION
    ===================================================== */

    const clientProfile = getData("vorvenaClientProfile", {});
    const professionalProfile = getData("vorvenaProfessionalProfile", {});

    const clientImage = localStorage.getItem("vorvenaClientProfileImage") || "";
    const professionalImage = localStorage.getItem("vorvenaProfileImage") || "";

    const clientName =
        offer.clientName ||
        clientProfile.fullName ||
        clientProfile.name ||
        "Client";

    const professionalName =
        offer.professionalName ||
        professionalProfile.fullName ||
        professionalProfile.name ||
        "Professional";

    const clientEmail = String(
        offer.clientEmail || clientProfile.email || ""
    ).toLowerCase();

    const professionalEmail = String(
        offer.professionalEmail || professionalProfile.email || ""
    ).toLowerCase();

    const isClient = currentRole === "client";
    const currentUserName = isClient ? clientName : professionalName;

    const otherUserName = isClient ? professionalName : clientName;

    const currentUserImage = isClient ? clientImage : professionalImage;
    const otherUserImage = isClient ? professionalImage : clientImage;

    const currentUserRole = isClient ? "Client" : "Professional";
    const otherUserRole = isClient ? "Professional" : "Client";

    const defaultAvatar = "images/default-avatar.png";

    setText("currentUserName", currentUserName);
    setText("currentUserRole", currentUserRole);

    setImage("currentUserAvatar", currentUserImage || defaultAvatar);

    setText("clientName", clientName);
    setText("professionalName", professionalName);

    setImage("clientAvatar", clientImage || defaultAvatar);
    setImage("professionalAvatar", professionalImage || defaultAvatar);

    setText("messagePartnerName", otherUserName);
    setText("messagePartnerRole", otherUserRole);
    setImage("messagePartnerAvatar", otherUserImage || defaultAvatar);

    setText("chatInfoName", otherUserName);
    setText("chatInfoRole", otherUserRole);
    setImage("chatInfoAvatar", otherUserImage || defaultAvatar);

    setText("chatInfoProject", offer.title || offer.projectTitle || "Project");
    setText("chatInfoStatus", "Project active");

    setText("clientYouLabel", isClient ? "You" : "");
    setText("professionalYouLabel", !isClient ? "You" : "");

    setText("projectMemberRole", currentUserRole);


    /* =====================================================
       6. PROJECT OVERVIEW
    ===================================================== */

    const projectTitle =
        offer.title ||
        offer.projectTitle ||
        "Untitled Project";

    const projectDescription =
        offer.description ||
        offer.projectDescription ||
        "No project description has been added.";

    const projectBudget =
        offer.budget ??
        offer.amount ??
        offer.price ??
        0;

    const projectDeadline =
        offer.deadline ||
        offer.dueDate ||
        "";

    const projectStartDate =
        offer.startDate ||
        offer.acceptedAt ||
        offer.createdAt ||
        "";

    setText("headerProjectTitle", projectTitle);
    setText("sidebarProjectTitle", projectTitle);
    setText("projectTitle", projectTitle);
    setText("projectDescription", projectDescription);

    setText("projectBudget", formatMoney(projectBudget));
    setText("projectDeadline", formatDate(projectDeadline));
    setText("projectStartDate", formatDate(projectStartDate));

    setText("headerProjectStatus", "In Progress");
    setText("projectStatusBadge", "In Progress");

    setText("deadlineDisplay", formatDate(projectDeadline));

    function updateDeadline() {
        const element = $("#deadlineRemaining");
        if (!element) return;

        if (!projectDeadline) {
            element.textContent = "No deadline set";
            return;
        }

        const deadline = new Date(projectDeadline + "T23:59:59");
        const difference = deadline.getTime() - Date.now();

        if (Number.isNaN(deadline.getTime())) {
            element.textContent = "No deadline set";
        } else if (difference < 0) {
            element.textContent = "Deadline passed";
        } else {
            const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
            element.textContent = `${days} day${days === 1 ? "" : "s"} remaining`;
        }
    }

    updateDeadline();


    /* =====================================================
       7. WORKSPACE STORAGE KEYS
    ===================================================== */

    const storageKeys = {
        messages: `vorvenaWorkspaceMessages_${projectId}`,
        files: `vorvenaWorkspaceFiles_${projectId}`,
        milestones: `vorvenaWorkspaceMilestones_${projectId}`,
        submissions: `vorvenaWorkspaceSubmissions_${projectId}`,
        revisions: `vorvenaWorkspaceRevisions_${projectId}`,
        activity: `vorvenaWorkspaceActivity_${projectId}`
    };

    let messages = getData(storageKeys.messages, []);
    let files = getData(storageKeys.files, []);
    let milestones = getData(storageKeys.milestones, []);
    let submissions = getData(storageKeys.submissions, []);
    let revisions = getData(storageKeys.revisions, []);
    let activities = getData(storageKeys.activity, []);

    function persistAll() {
        saveData(storageKeys.messages, messages);
        saveData(storageKeys.files, files);
        saveData(storageKeys.milestones, milestones);
        saveData(storageKeys.submissions, submissions);
        saveData(storageKeys.revisions, revisions);
        saveData(storageKeys.activity, activities);
    }


    /* =====================================================
       8. ACTIVITY LOG
    ===================================================== */

    function addActivity(action, description) {
        activities.unshift({
            id: makeId(),
            action,
            description,
            user: currentUserName,
            role: currentUserRole,
            createdAt: new Date().toISOString()
        });

        activities = activities.slice(0, 100);

        saveData(storageKeys.activity, activities);

        renderActivity();
    }

    function renderActivity() {
        const containers = [
            $("#overviewActivityList"),
            $("#fullActivityList")
        ].filter(Boolean);

        containers.forEach(container => {
            if (!activities.length) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fa-regular fa-clock"></i>
                        <p>No activity yet.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = activities.map(item => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>

                    <div class="activity-content">
                        <strong>${escapeHTML(item.action)}</strong>
                        <p>${escapeHTML(item.description)}</p>
                        <small>
                            ${escapeHTML(item.user || "Workspace member")}
                            · ${formatDateTime(item.createdAt)}
                        </small>
                    </div>
                </div>
            `).join("");
        });
    }


    /* =====================================================
       9. WORKSPACE NAVIGATION
    ===================================================== */

    const sidebar = $(".workspace-sidebar");
    const sections = $$(".workspace-section");
    const sidebarLinks = $$(".sidebar-link");

    function openSection(sectionName) {
        sections.forEach(section => {
            section.classList.toggle(
                "active",
                section.id === sectionName
            );
        });

        sidebarLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.section === sectionName
            );
        });

        if (sidebar) sidebar.classList.remove("mobile-open");

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            openSection(link.dataset.section);
        });
    });

    $$("[data-open-section]").forEach(button => {
        button.addEventListener("click", () => {
            openSection(button.dataset.openSection);
        });
    });

    const mobileToggle = document.createElement("button");

    mobileToggle.className = "workspace-mobile-toggle";
    mobileToggle.type = "button";
    mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    mobileToggle.setAttribute("aria-label", "Open navigation");

    const header = $(".workspace-header");

    if (header && sidebar) {
        header.appendChild(mobileToggle);

        mobileToggle.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });

        document.addEventListener("click", event => {
            if (
                window.innerWidth <= 768 &&
                sidebar.classList.contains("mobile-open") &&
                !sidebar.contains(event.target) &&
                !mobileToggle.contains(event.target)
            ) {
                sidebar.classList.remove("mobile-open");
            }
        });
    }

    const backButton = $("#backToDashboard");

    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = isClient
                ? "client-dashboard.html"
                : "professional-dashboard.html";
        });
    }


    /* =====================================================
       10. MODAL HELPERS
    ===================================================== */

    function openModal(modal) {
        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    $$("[data-close-modal]").forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".workspace-modal");
            closeModal(modal);
        });
    });

    $$(".workspace-modal").forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal(modal);
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            $$(".workspace-modal.active").forEach(closeModal);
        }
    });


    /* =====================================================
       11. MESSAGING
    ===================================================== */

    const messageForm = $("#messageForm");
    const messageInput = $("#messageInput");
    const messageFileInput = $("#messageFileInput");
    const messagesContainer = $("#messagesContainer");

    let pendingMessageFile = null;

    function renderMessages() {
        if (!messagesContainer) return;

        if (!messages.length) {
            messagesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-regular fa-comments"></i>
                    <p>No messages yet. Start the conversation.</p>
                </div>
            `;
        } else {
            messagesContainer.innerHTML = messages.map(message => {
                const ownMessage = message.senderEmail
                    ? message.senderEmail === currentEmail
                    : message.senderRole === currentRole;

                return `
                    <div class="message-item ${ownMessage ? "own-message" : "received-message"}">
                        <div class="message-avatar">
                            <img
                                src="${escapeHTML(message.avatar || defaultAvatar)}"
                                alt=""
                            >
                        </div>

                        <div class="message-body">
                            <div class="message-meta">
                                <strong>${escapeHTML(message.senderName)}</strong>
                                <small>${formatDateTime(message.createdAt)}</small>
                            </div>

                            ${message.text ? `
                                <p>${escapeHTML(message.text)}</p>
                            ` : ""}

                            ${message.attachment ? `
                                <a
                                    class="message-attachment"
                                    href="${escapeHTML(message.attachment.data)}"
                                    download="${escapeHTML(message.attachment.name)}"
                                >
                                    <i class="fa-solid fa-paperclip"></i>
                                    ${escapeHTML(message.attachment.name)}
                                    <small>${escapeHTML(message.attachment.size)}</small>
                                </a>
                            ` : ""}
                        </div>
                    </div>
                `;
            }).join("");
        }

        setText("messageCount", messages.length);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        renderSharedFiles();
    }

    function formatFileSize(bytes) {
        if (!bytes) return "0 KB";

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    function showMessageAttachment(file) {
        pendingMessageFile = file;

        const preview = $("#messageAttachmentPreview");

        if (preview) preview.style.display = "flex";

        setText("messageAttachmentName", file.name);
        setText("messageAttachmentSize", formatFileSize(file.size));
    }

    function clearMessageAttachment() {
        pendingMessageFile = null;

        if (messageFileInput) messageFileInput.value = "";

        hideElement($("#messageAttachmentPreview"));
    }

    $("#attachMessageFile")?.addEventListener("click", () => {
        messageFileInput?.click();
    });

    messageFileInput?.addEventListener("change", () => {
        const file = messageFileInput.files[0];

        if (!file) return;

        if (file.size > 1.5 * 1024 * 1024) {
            showToast("Message attachments must be 1.5 MB or smaller.", "error");
            messageFileInput.value = "";
            return;
        }

        showMessageAttachment(file);
    });

    $("#removeMessageAttachment")?.addEventListener("click", clearMessageAttachment);

    messageForm?.addEventListener("submit", async event => {
        event.preventDefault();

        const text = messageInput?.value.trim() || "";

        if (!text && !pendingMessageFile) {
            showToast("Write a message or attach a file first.", "error");
            return;
        }

        let attachment = null;

        try {
            if (pendingMessageFile) {
                attachment = {
                    name: pendingMessageFile.name,
                    size: formatFileSize(pendingMessageFile.size),
                    type: pendingMessageFile.type,
                    data: await readFile(pendingMessageFile)
                };
            }

            messages.push({
                id: makeId(),
                text,
                attachment,
                senderName: currentUserName,
                senderRole: currentRole,
                senderEmail: currentEmail,
                avatar: currentUserImage || defaultAvatar,
                createdAt: new Date().toISOString()
            });

            if (!saveData(storageKeys.messages, messages)) return;

            if (messageInput) messageInput.value = "";

            clearMessageAttachment();

            renderMessages();

            addActivity(
                "New message",
                `${currentUserName} sent a message.`
            );

        } catch (error) {
            console.error(error);
            showToast("Unable to send this message.", "error");
        }
    });


    /* =====================================================
       12. SHARED PROJECT FILES
    ===================================================== */

    const projectFileInput = $("#projectFileInput");
    const modalFileInput = $("#modalFileInput");

    const MAX_PROJECT_FILE_SIZE = 5 * 1024 * 1024;

    async function uploadProjectFiles(fileList) {
        const selectedFiles = [...fileList];

        if (!selectedFiles.length) return;

        for (const file of selectedFiles) {
            if (file.size > MAX_PROJECT_FILE_SIZE) {
                showToast(`${file.name} is larger than 5 MB.`, "error");
                continue;
            }

            try {
                const data = await readFile(file);

                const newFile = {
                    id: makeId(),
                    name: file.name,
                    size: formatFileSize(file.size),
                    type: file.type,
                    category: getFileCategory(file),
                    data,
                    uploadedBy: currentUserName,
                    uploadedRole: currentRole,
                    uploadedAt: new Date().toISOString()
                };

                files.push(newFile);

                if (!saveData(storageKeys.files, files)) {
                    files.pop();
                    return;
                }

                addActivity(
                    "File uploaded",
                    `${file.name} was uploaded to the project.`
                );

            } catch (error) {
                console.error(error);
                showToast(`Could not upload ${file.name}.`, "error");
            }
        }

        renderFiles();
    }

    function getFileCategory(file) {
        const type = file.type || "";
        const extension = file.name.split(".").pop().toLowerCase();

        if (type.startsWith("image/")) return "images";

        if ([
            "zip", "rar", "7z", "tar", "gz"
        ].includes(extension)) return "archives";

        return "documents";
    }

    $("#openFileUpload")?.addEventListener("click", () => {
        openModal($("#fileUploadModal"));
    });

    $("#confirmFileUpload")?.addEventListener("click", async () => {
        if (!modalFileInput?.files.length) {
            showToast("Choose at least one file.", "error");
            return;
        }

        const button = $("#confirmFileUpload");

        if (button) {
            button.disabled = true;
            button.textContent = "Uploading...";
        }

        await uploadProjectFiles(modalFileInput.files);

        if (button) {
            button.disabled = false;
            button.textContent = "Upload Files";
        }

        if (modalFileInput) modalFileInput.value = "";

        setText("modalSelectedFiles", "No files selected");

        closeModal($("#fileUploadModal"));
    });

    modalFileInput?.addEventListener("change", () => {
        const names = [...modalFileInput.files].map(file => file.name);

        setText(
            "modalSelectedFiles",
            names.length ? names.join(", ") : "No files selected"
        );
    });

    projectFileInput?.addEventListener("change", async () => {
        await uploadProjectFiles(projectFileInput.files);
        projectFileInput.value = "";
    });

    function renderFiles(filter = "all") {
        const container = $("#projectFilesList");

        if (!container) return;

        const filteredFiles = filter === "all"
            ? files
            : files.filter(file => file.category === filter);

        setText("fileCount", files.length);

        if (!filteredFiles.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-regular fa-folder-open"></i>
                    <p>No files found.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredFiles.map(file => `
            <div class="project-file-item">
                <div class="file-icon">
                    <i class="fa-solid ${
                        file.category === "images"
                            ? "fa-file-image"
                            : file.category === "archives"
                                ? "fa-file-zipper"
                                : "fa-file-lines"
                    }"></i>
                </div>

                <div class="file-details">
                    <strong>${escapeHTML(file.name)}</strong>
                    <small>
                        ${escapeHTML(file.size)}
                        · Uploaded by ${escapeHTML(file.uploadedBy)}
                    </small>
                </div>

                <a
                    class="file-download"
                    href="${escapeHTML(file.data)}"
                    download="${escapeHTML(file.name)}"
                    title="Download file"
                >
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        `).join("");
    }

    $$(".file-filter").forEach(button => {
        button.addEventListener("click", () => {
            $$(".file-filter").forEach(item => item.classList.remove("active"));

            button.classList.add("active");

            renderFiles(button.dataset.fileFilter || "all");
        });
    });

    function renderSharedFiles() {
        const container = $("#chatSharedFiles");

        if (!container) return;

        const recentFiles = files.slice(-5).reverse();

        if (!recentFiles.length) {
            container.innerHTML = "<p>No shared files yet.</p>";
            return;
        }

        container.innerHTML = recentFiles.map(file => `
            <a
                href="${escapeHTML(file.data)}"
                download="${escapeHTML(file.name)}"
                class="shared-file-item"
            >
                <i class="fa-solid fa-paperclip"></i>
                ${escapeHTML(file.name)}
            </a>
        `).join("");
    }


    /* =====================================================
       13. MILESTONES
    ===================================================== */

    const milestoneModal = $("#milestoneModal");
    const milestoneForm = $("#milestoneForm");

    $("#addMilestoneButton")?.addEventListener("click", () => {
        if (milestoneForm) milestoneForm.reset();
        openModal(milestoneModal);
    });

    milestoneForm?.addEventListener("submit", event => {
        event.preventDefault();

        const title = $("#milestoneTitle")?.value.trim();
        const description = $("#milestoneDescription")?.value.trim();
        const deadline = $("#milestoneDeadline")?.value;

        if (!title) {
            showToast("Enter a milestone title.", "error");
            return;
        }

        milestones.push({
            id: makeId(),
            title,
            description,
            deadline,
            completed: false,
            createdBy: currentUserName,
            createdAt: new Date().toISOString()
        });

        if (!saveData(storageKeys.milestones, milestones)) return;

        closeModal(milestoneModal);
        milestoneForm.reset();

        addActivity("Milestone added", `${title} was added to the project.`);

        renderMilestones();
    });

    function renderMilestones() {
        const container = $("#milestoneList");

        const completed = milestones.filter(item => item.completed).length;
        const total = milestones.length;
        const remaining = total - completed;

        setText("milestoneTotal", total);
        setText("milestoneCompleted", completed);
        setText("milestoneRemaining", remaining);

        setText("completedMilestones", completed);
        setText("totalMilestones", total);

        const percentage = total
            ? Math.round((completed / total) * 100)
            : 0;

        setText("progressPercentage", `${percentage}%`);

        const progressBar = $("#projectProgressBar");

        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }

        if (!container) return;

        if (!milestones.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-list-check"></i>
                    <p>No milestones added yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = milestones.map(milestone => `
            <div class="milestone-item ${milestone.completed ? "completed" : ""}">
                <div class="milestone-check">
                    <button
                        type="button"
                        class="milestone-toggle"
                        data-milestone-id="${escapeHTML(milestone.id)}"
                        aria-label="${milestone.completed ? "Mark incomplete" : "Mark complete"}"
                    >
                        <i class="fa-solid ${
                            milestone.completed
                                ? "fa-circle-check"
                                : "fa-circle"
                        }"></i>
                    </button>
                </div>

                <div class="milestone-content">
                    <strong>${escapeHTML(milestone.title)}</strong>
                    <p>${escapeHTML(milestone.description || "")}</p>
                    <small>
                        Deadline: ${formatDate(milestone.deadline)}
                    </small>
                </div>

                <span class="milestone-status">
                    ${milestone.completed ? "Completed" : "Pending"}
                </span>
            </div>
        `).join("");

        container.querySelectorAll("[data-milestone-id]").forEach(button => {
            button.addEventListener("click", () => {
                const item = milestones.find(
                    milestone => milestone.id === button.dataset.milestoneId
                );

                if (!item) return;

                item.completed = !item.completed;
                item.completedAt = item.completed
                    ? new Date().toISOString()
                    : null;

                if (!saveData(storageKeys.milestones, milestones)) return;

                addActivity(
                    item.completed ? "Milestone completed" : "Milestone reopened",
                    item.title
                );

                renderMilestones();
            });
        });
    }


    /* =====================================================
       14. WORK SUBMISSIONS
    ===================================================== */

    const submissionModal = $("#submissionModal");
    const submissionForm = $("#submissionForm");
    const submissionFileInput = $("#submissionFileInput");

    let selectedSubmissionFiles = [];

    const openSubmissionButton = $("#openSubmissionModal");

    if (openSubmissionButton && isClient) {
        hideElement(openSubmissionButton);
    }

    openSubmissionButton?.addEventListener("click", () => {
        if (isClient) return;

        selectedSubmissionFiles = [];

        if (submissionForm) submissionForm.reset();

        renderSelectedSubmissionFiles();

        openModal(submissionModal);
    });

    submissionFileInput?.addEventListener("change", () => {
        selectedSubmissionFiles = [...submissionFileInput.files];

        renderSelectedSubmissionFiles();
    });

    function renderSelectedSubmissionFiles() {
        const container = $("#submissionSelectedFiles");

        if (!container) return;

        if (!selectedSubmissionFiles.length) {
            container.textContent = "No files selected";
            return;
        }

        container.innerHTML = selectedSubmissionFiles.map(file => `
            <div class="selected-file">
                <i class="fa-solid fa-file"></i>
                ${escapeHTML(file.name)}
                <small>${formatFileSize(file.size)}</small>
            </div>
        `).join("");
    }

    submissionForm?.addEventListener("submit", async event => {
        event.preventDefault();

        if (isClient) return;

        const title = $("#submissionTitle")?.value.trim();
        const message = $("#submissionMessage")?.value.trim();

        if (!title) {
            showToast("Enter a submission title.", "error");
            return;
        }

        if (!message && !selectedSubmissionFiles.length) {
            showToast("Add a message or attach your completed work.", "error");
            return;
        }

        const attachments = [];

        try {
            for (const file of selectedSubmissionFiles) {
                if (file.size > 5 * 1024 * 1024) {
                    showToast(`${file.name} exceeds the 5 MB limit.`, "error");
                    return;
                }

                attachments.push({
                    name: file.name,
                    size: formatFileSize(file.size),
                    type: file.type,
                    data: await readFile(file)
                });
            }

            submissions.unshift({
                id: makeId(),
                title,
                message,
                attachments,
                submittedBy: currentUserName,
                submittedRole: currentRole,
                status: "Pending review",
                createdAt: new Date().toISOString()
            });

            if (!saveData(storageKeys.submissions, submissions)) return;

            closeModal(submissionModal);
            submissionForm.reset();
            selectedSubmissionFiles = [];

            addActivity(
                "Work submitted",
                `${title} was submitted for client review.`
            );

            renderSubmissions();

            showToast("Your work has been submitted.");

        } catch (error) {
            console.error(error);
            showToast("Unable to submit your work.", "error");
        }
    });

    function renderSubmissions() {
        const container = $("#submissionsList");

        if (!container) return;

        if (!submissions.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-file-circle-check"></i>
                    <p>No work submissions yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = submissions.map(submission => {
            const pending = submission.status === "Pending review";

            const actions = isClient && pending
                ? `
                    <div class="submission-actions">
                        <button
                            type="button"
                            class="approve-submission"
                            data-approve="${escapeHTML(submission.id)}"
                        >
                            <i class="fa-solid fa-check"></i>
                            Approve Work
                        </button>

                        <button
                            type="button"
                            class="request-revision"
                            data-revision="${escapeHTML(submission.id)}"
                        >
                            <i class="fa-solid fa-rotate-left"></i>
                            Request Revision
                        </button>
                    </div>
                `
                : "";

            const attachments = (submission.attachments || []).map(file => `
                <a
                    class="submission-attachment"
                    href="${escapeHTML(file.data)}"
                    download="${escapeHTML(file.name)}"
                >
                    <i class="fa-solid fa-download"></i>
                    ${escapeHTML(file.name)}
                    <small>${escapeHTML(file.size)}</small>
                </a>
            `).join("");

            return `
                <article class="submission-card">
                    <div class="submission-header">
                        <div>
                            <h3>${escapeHTML(submission.title)}</h3>
                            <small>
                                Submitted by ${escapeHTML(submission.submittedBy)}
                                · ${formatDateTime(submission.createdAt)}
                            </small>
                        </div>

                        <span class="submission-status">
                            ${escapeHTML(submission.status)}
                        </span>
                    </div>

                    <p>${escapeHTML(submission.message || "")}</p>

                    <div class="submission-attachments">
                        ${attachments}
                    </div>

                    ${submission.revisionFeedback ? `
                        <div class="revision-feedback">
                            <strong>Revision feedback</strong>
                            <p>${escapeHTML(submission.revisionFeedback)}</p>
                        </div>
                    ` : ""}

                    ${actions}
                </article>
            `;
        }).join("");

        container.querySelectorAll("[data-approve]").forEach(button => {
            button.addEventListener("click", () => {
                reviewSubmission(button.dataset.approve, "approve");
            });
        });

        container.querySelectorAll("[data-revision]").forEach(button => {
            button.addEventListener("click", () => {
                reviewSubmission(button.dataset.revision, "revision");
            });
        });
    }


    /* =====================================================
       15. CLIENT REVIEW AND REVISION REQUESTS
    ===================================================== */

    function reviewSubmission(id, action) {
        if (!isClient) return;

        const submission = submissions.find(item => item.id === id);

        if (!submission || submission.status !== "Pending review") return;

        if (action === "approve") {
            const confirmed = confirm(
                "Are you sure you want to approve this work? This indicates that you have accepted the submitted deliverables."
            );

            if (!confirmed) return;

            submission.status = "Approved";
            submission.reviewedAt = new Date().toISOString();
            submission.reviewedBy = currentUserName;

            saveData(storageKeys.submissions, submissions);

            /*
              BACKEND INTEGRATION REQUIRED:
              The real application must notify the admin and
              initiate the authorized payout workflow here.
              Do not release funds from frontend JavaScript.
            */

            addActivity(
                "Work approved",
                `${submission.title} was approved by the client. Admin payout processing is required.`
            );

            showToast("Work approved. Payout processing will require admin confirmation.");

        } else {
            const feedback = prompt(
                "Explain what needs to be revised:"
            );

            if (feedback === null) return;

            if (!feedback.trim()) {
                showToast("Please provide revision feedback.", "error");
                return;
            }

            submission.status = "Revision requested";
            submission.revisionFeedback = feedback.trim();
            submission.reviewedAt = new Date().toISOString();

            revisions.unshift({
                id: makeId(),
                submissionId: submission.id,
                title: submission.title,
                feedback: feedback.trim(),
                requestedBy: currentUserName,
                createdAt: new Date().toISOString()
            });

            saveData(storageKeys.submissions, submissions);
            saveData(storageKeys.revisions, revisions);

            addActivity(
                "Revision requested",
                `The client requested changes to ${submission.title}.`
            );

            showToast("Revision request sent.");
        }

        renderSubmissions();
        renderRevisions();
    }


    /* =====================================================
       16. REVISION HISTORY
    ===================================================== */

    function renderRevisions() {
        const container = $("#revisionsList");

        if (!container) return;

        if (!revisions.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-rotate-left"></i>
                    <p>No revision requests yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = revisions.map(revision => `
            <div class="revision-item">
                <div class="revision-icon">
                    <i class="fa-solid fa-rotate-left"></i>
                </div>

                <div class="revision-content">
                    <strong>${escapeHTML(revision.title)}</strong>
                    <p>${escapeHTML(revision.feedback)}</p>
                    <small>
                        Requested by ${escapeHTML(revision.requestedBy)}
                        · ${formatDateTime(revision.createdAt)}
                    </small>
                </div>
            </div>
        `).join("");
    }


    /* =====================================================
       17. NOTIFICATIONS
    ===================================================== */

    $("#workspaceNotifications")?.addEventListener("click", () => {
        openSection("activity");

        if (!activities.length) {
            showToast("You have no project activity yet.");
        } else {
            showToast("Showing your latest project activity.");
        }
    });


    /* =====================================================
       18. WORKSPACE LOADER
    ===================================================== */

    const loader = $("#workspaceLoader");

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }


    /* =====================================================
       19. INITIAL RENDER
    ===================================================== */

    renderMessages();
    renderFiles();
    renderSharedFiles();
    renderMilestones();
    renderSubmissions();
    renderRevisions();
    renderActivity();

    hideLoader();


    /* =====================================================
       20. CROSS-TAB DEMO SYNCHRONISATION
    ===================================================== */

    window.addEventListener("storage", event => {
        if (!event.key) return;

        if (event.key === storageKeys.messages) {
            messages = getData(storageKeys.messages, []);
            renderMessages();
        }

        if (event.key === storageKeys.files) {
            files = getData(storageKeys.files, []);
            renderFiles();
            renderSharedFiles();
        }

        if (event.key === storageKeys.milestones) {
            milestones = getData(storageKeys.milestones, []);
            renderMilestones();
        }

        if (event.key === storageKeys.submissions) {
            submissions = getData(storageKeys.submissions, []);
            renderSubmissions();
        }

        if (event.key === storageKeys.revisions) {
            revisions = getData(storageKeys.revisions, []);
            renderRevisions();
        }

        if (event.key === storageKeys.activity) {
            activities = getData(storageKeys.activity, []);
            renderActivity();
        }
    });

});
