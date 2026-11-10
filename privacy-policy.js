
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // CURRENT FOOTER YEAR
    // =====================================

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // TABLE OF CONTENTS
    // =====================================

    const tocLinks = document.querySelectorAll(
        ".table-of-contents a"
    );

    const sections = document.querySelectorAll(
        ".privacy-section"
    );

    // Smooth navigation
    tocLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) return;

            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);

        });

    });


    // =====================================
    // ACTIVE TABLE OF CONTENTS LINK
    // =====================================

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    tocLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );

                    });

                }

            });

        }, {
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0
        });

        sections.forEach(section => {
            observer.observe(section);
        });

    }


    // =====================================
    // LOGO FALLBACK
    // =====================================

    const logo = document.querySelector(".brand-logo img");

    if (logo) {

        logo.addEventListener("error", () => {

            logo.style.display = "none";

            const fallback = logo.nextElementSibling;

            if (fallback) {
                fallback.style.display = "flex";
            }

        });

    }


    // =====================================
    // FOOTER ACTIVE PAGE
    // =====================================

    const footerLinks = document.querySelectorAll(".footer-links a");

    footerLinks.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === "privacy-policy.html") {
            link.classList.add("active");
        }

    });


    // =====================================
    // RESTORE HASH NAVIGATION
    // =====================================

    if (window.location.hash) {

        setTimeout(() => {

            const target = document.querySelector(
                window.location.hash
            );

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }, 150);

    }

});
