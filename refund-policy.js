
document.addEventListener("DOMContentLoaded", function () {

    // AUTOMATIC FOOTER YEAR
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // LOGO FALLBACK
    const logoImages = document.querySelectorAll(".brand-logo img");

    logoImages.forEach(function (image) {

        image.addEventListener("error", function () {
            image.style.display = "none";
        });

    });


    // TABLE OF CONTENTS
    const tocLinks = document.querySelectorAll(".toc a");

    const sections = document.querySelectorAll(".policy-section[id]");


    // SMOOTH SCROLL
    tocLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }

        });

    });


    // ACTIVE TABLE OF CONTENTS LINK
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    tocLinks.forEach(function (link) {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + currentId
                        );

                    });

                }

            });

        }, {
            root: null,
            rootMargin: "-15% 0px -70% 0px",
            threshold: 0
        });


        sections.forEach(function (section) {
            observer.observe(section);
        });

    }


    // OPEN SECTION IF PAGE LOADS WITH A HASH
    if (window.location.hash) {

        const target = document.querySelector(window.location.hash);

        if (target) {

            setTimeout(function () {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 300);

        }

    }

});
