
/* =========================================
   VORVENA - REUSABLE CIRCULAR LOADER
========================================= */

(() => {
    const LOGO_PATH = "assets/vorvena_logo_transparent.png";

    let loader;
    let hideTimer;

    function createLoader() {
        if (loader) return;

        loader = document.createElement("div");
        loader.className = "vorvena-page-loader";
        loader.setAttribute("aria-label", "Loading");
        loader.setAttribute("role", "status");

        loader.innerHTML = `
            <div class="vorvena-loader-ring"></div>
            <div class="vorvena-loader-logo">
                <img src="${LOGO_PATH}" alt="VORVENA">
            </div>
        `;

        document.body.appendChild(loader);
    }

    function showLoader() {
        createLoader();

        clearTimeout(hideTimer);
        loader.classList.add("active");
    }

    function hideLoader() {
        if (!loader) return;

        loader.classList.remove("active");
    }

    // Make loader controls available to other page scripts.
    window.VORVENA = window.VORVENA || {};
    window.VORVENA.showLoader = showLoader;
    window.VORVENA.hideLoader = hideLoader;

    // Show loader when arriving from another page.
    if (sessionStorage.getItem("vorvenaPageTransition") === "true") {
        sessionStorage.removeItem("vorvenaPageTransition");

        showLoader();

        if (document.readyState === "complete") {
            hideTimer = setTimeout(hideLoader, 400);
        } else {
            window.addEventListener("load", () => {
                hideTimer = setTimeout(hideLoader, 400);
            }, { once: true });
        }
    }

    // Show loader before normal internal page navigation.
    document.addEventListener("click", event => {
        const link = event.target.closest("a[href]");

        if (!link) return;

        if (
            link.target === "_blank" ||
            link.hasAttribute("download")
        ) return;

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("javascript:") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) return;

        const destination = new URL(link.href, window.location.href);

        if (destination.origin !== window.location.origin) return;

        if (
            destination.pathname === window.location.pathname &&
            destination.search === window.location.search
        ) return;

        sessionStorage.setItem("vorvenaPageTransition", "true");
        showLoader();
    });

    // Connect VORVENA's existing JavaScript navigation functions.
    document.addEventListener("DOMContentLoaded", () => {
        const originalNavigate = window.VORVENA.navigate;
        const originalOpenSignup = window.VORVENA.openSignup;
        const originalOpenLogin = window.VORVENA.openLogin;

        if (typeof originalNavigate === "function") {
            window.VORVENA.navigate = function (page) {
                sessionStorage.setItem("vorvenaPageTransition", "true");
                showLoader();
                return originalNavigate.apply(this, arguments);
            };
        }

        if (typeof originalOpenSignup === "function") {
            window.VORVENA.openSignup = function (role) {
                sessionStorage.setItem("vorvenaPageTransition", "true");
                showLoader();
                return originalOpenSignup.apply(this, arguments);
            };
        }

        if (typeof originalOpenLogin === "function") {
            window.VORVENA.openLogin = function () {
                sessionStorage.setItem("vorvenaPageTransition", "true");
                showLoader();
                return originalOpenLogin.apply(this, arguments);
            };
        }
    });

})();
