
/* =========================================
   VORVENA TERMS OF SERVICE
   JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       FOOTER YEAR
       ===================================== */

    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =====================================
       TABLE OF CONTENTS ACTIVE LINK
       ===================================== */

    const sections = document.querySelectorAll(".terms-section");
    const tocLinks = document.querySelectorAll(
        ".table-of-contents a"
    );

    if (sections.length && tocLinks.length) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.id;

                        tocLinks.forEach((link) => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${sectionId}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                root: null,
                rootMargin: "-15% 0px -70% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

    }


    /* =====================================
       SMOOTH TABLE OF CONTENTS NAVIGATION
       ===================================== */

    tocLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);

        });

    });


    /* =====================================
       CURRENT PAGE FOOTER LINK
       ===================================== */

    const footerLinks = document.querySelectorAll(".footer-links a");

    footerLinks.forEach((link) => {

        const currentPage = window.location.pathname
            .split("/")
            .pop();

        const linkPage = link.getAttribute("href");

        if (currentPage === linkPage) {
            link.classList.add("current-page");
        }

    });


    /* =====================================
       LOGO FALLBACK
       ===================================== */

    const logoImages = document.querySelectorAll(".brand-logo img");

    logoImages.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const fallback = image.nextElementSibling;

            if (fallback) {
                fallback.style.display = "flex";
            }

        });

    });


});
