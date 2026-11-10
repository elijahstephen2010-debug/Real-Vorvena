
/* =========================================
   VORVENA CONTACT SUPPORT
   FRONTEND PREVIEW VERSION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const supportForm = document.getElementById("supportForm");
    const submitButton = document.getElementById("submitButton");
    const formMessage = document.getElementById("formMessage");

    const messageInput = document.getElementById("message");
    const messageCount = document.getElementById("messageCount");

    const attachmentInput = document.getElementById("attachment");

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    /* =====================================
       FOOTER YEAR
    ===================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* =====================================
       FAQ ACCORDION
    ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Close all other FAQ items
            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherQuestion) {
                    otherQuestion.setAttribute("aria-expanded", "false");
                }

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });

            // Open selected FAQ
            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute("aria-expanded", "true");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

    /* =====================================
       MESSAGE CHARACTER COUNTER
    ===================================== */

    if (messageInput && messageCount) {

        messageInput.addEventListener("input", () => {

            const currentLength = messageInput.value.length;

            messageCount.textContent =
                `${currentLength} / 5000`;

        });

    }

    /* =====================================
       FORM MESSAGE
    ===================================== */

    function showFormMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.className = `form-message ${type}`;

    }

    /* =====================================
       GENERATE UNIQUE TICKET ID
    ===================================== */

    function generateTicketID() {

        const year = new Date().getFullYear();

        const randomNumber =
            Math.floor(100000 + Math.random() * 900000);

        return `VOR-${year}-${randomNumber}`;

    }

    /* =====================================
       GET EXISTING TICKETS
    ===================================== */

    function getSupportTickets() {

        try {

            const savedTickets =
                localStorage.getItem("vorvenaSupportTickets");

            if (!savedTickets) return [];

            const parsedTickets = JSON.parse(savedTickets);

            return Array.isArray(parsedTickets)
                ? parsedTickets
                : [];

        } catch (error) {

            console.error(
                "Could not read support tickets:",
                error
            );

            return [];

        }

    }

    /* =====================================
       SAVE TICKET
    ===================================== */

    function saveSupportTicket(ticket) {

        const existingTickets = getSupportTickets();

        existingTickets.unshift(ticket);

        localStorage.setItem(
            "vorvenaSupportTickets",
            JSON.stringify(existingTickets)
        );

    }

    /* =====================================
       ATTACHMENT VALIDATION
    ===================================== */

    function validateAttachment() {

        const file = attachmentInput.files[0];

        if (!file) return true;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
            "application/pdf"
        ];

        if (!allowedTypes.includes(file.type)) {

            showFormMessage(
                "Please upload a PNG, JPG, WEBP or PDF file.",
                "error"
            );

            return false;

        }

        if (file.size > MAX_FILE_SIZE) {

            showFormMessage(
                "Your attachment must not exceed 5MB.",
                "error"
            );

            return false;

        }

        return true;

    }

    /* =====================================
       FORM SUBMISSION
    ===================================== */

    if (supportForm) {

        supportForm.addEventListener("submit", event => {

            event.preventDefault();

            // Browser validation
            if (!supportForm.reportValidity()) {
                return;
            }

            // Attachment validation
            if (!validateAttachment()) {
                return;
            }

            const consent =
                document.getElementById("consent");

            if (!consent || !consent.checked) {

                showFormMessage(
                    "Please confirm the information before submitting.",
                    "error"
                );

                return;

            }

            submitButton.disabled = true;

            submitButton.textContent = "Submitting request...";

            try {

                const attachment =
                    attachmentInput.files[0] || null;

                const ticketID = generateTicketID();

                const ticket = {

                    id: ticketID,

                    fullName:
                        document.getElementById("fullName").value.trim(),

                    email:
                        document.getElementById("email").value.trim().toLowerCase(),

                    accountType:
                        document.getElementById("accountType").value,

                    category:
                        document.getElementById("category").value,

                    subject:
                        document.getElementById("subject").value.trim(),

                    message:
                        messageInput.value.trim(),

                    attachment: attachment ? {
                        name: attachment.name,
                        size: attachment.size,
                        type: attachment.type
                    } : null,

                    status: "New",

                    priority: "Normal",

                    createdAt: new Date().toISOString(),

                    updatedAt: new Date().toISOString(),

                    replies: []

                };

                // Save ticket for frontend preview
                saveSupportTicket(ticket);

                showFormMessage(
                    `Your support request has been submitted successfully. Your ticket reference is ${ticketID}. Please keep this reference for future communication.`,
                    "success"
                );

                // Reset form
                supportForm.reset();

                if (messageCount) {
                    messageCount.textContent = "0 / 5000";
                }

                // Reset attachment field
                if (attachmentInput) {
                    attachmentInput.value = "";
                }

                // Scroll to confirmation
                formMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            } catch (error) {

                console.error(
                    "Support submission error:",
                    error
                );

                showFormMessage(
                    "We couldn't save your request in this browser. Please try again.",
                    "error"
                );

            } finally {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'Submit support request <span>→</span>';

            }

        });

    }

});
