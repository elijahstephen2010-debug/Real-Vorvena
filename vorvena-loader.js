/* =========================================
   VORVENA - REUSABLE CIRCULAR LOADER
========================================= */

(() => {
    // Same logo file the navbar uses. If it is not found,
    // the loader tries the next one in this list.
    const LOGO_PATHS = [
        "assets/vorvena_logo_transparent (1).png",
        "assets/vorvena_logo_transparent.png"
    ];

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
                <img alt="VORVENA" loading="eager" decoding="sync">
            </div>
        `;

        // SET THE LOGO WITH A FALLBACK IF THE FIRST FILE IS MISSING
        const logoImg = loader.querySelector("img");
        let logoIndex = 0;

        logoImg.addEventListener("error", () => {
            logoIndex += 1;

            if (logoIndex < LOGO_PATHS.length) {
                logoImg.src = encodeURI(LOGO_PATHS[logoIndex]);
            }
        });

        logoImg.src = encodeURI(LOGO_PATHS[0]);

        document.body.appendChild(loader);
    }

    function showLoader() {
        createLoader();

        clearTimeout(hideTimer);
        loader.classList.add("active");
    }

    function hideLoader() {
        clearTimeout(hideTimer);

        if (!loader) return;

        loader.classList.remove("active");
    }

    // MAKE LOADER CONTROLS AVAILABLE
    window.VORVENA = window.VORVENA || {};
    window.VORVENA.showLoader = showLoader;
    window.VORVENA.hideLoader = hideLoader;

    // ENTRANCE SCREEN: ONLY ON THE FIRST PAGE OF A VISIT
    // The big entrance loader (#intro) plays once when someone enters
    // the site. On every other page, only the small page loader is used.
    // introPlaying is true only while the entrance screen is really being shown,
    // so the small spinner never appears on top of it.
    let introPlaying = false;

    try {
        const intro = document.getElementById("intro");

        if (sessionStorage.getItem("vorvenaIntroSeen") === "true") {
            if (intro) intro.style.display = "none";
        } else {
            sessionStorage.setItem("vorvenaIntroSeen", "true");
            introPlaying = Boolean(intro);
        }
    } catch (error) {
        // If storage is blocked, the entrance screen just plays as normal.
    }

    // DETECT BROWSER HISTORY NAVIGATION
    const navigationEntry =
        performance.getEntriesByType("navigation")[0];

    const isHistoryNavigation =
        navigationEntry &&
        navigationEntry.type === "back_forward";

    // A refresh is not a page change, so it never shows the spinner
    const isReload =
        navigationEntry &&
        navigationEntry.type === "reload";

    // SHOW LOADER WHEN ARRIVING THROUGH NORMAL NAVIGATION
    if (
        sessionStorage.getItem("vorvenaPageTransition") === "true" &&
        !isHistoryNavigation &&
        !isReload &&
        !introPlaying
    ) {
        sessionStorage.removeItem("vorvenaPageTransition");

        showLoader();

        if (document.readyState === "complete") {
            hideTimer = setTimeout(hideLoader, 400);
        } else {
            window.addEventListener("load", () => {
                hideTimer = setTimeout(hideLoader, 400);
            }, { once: true });
        }
    } else if (isHistoryNavigation || isReload || introPlaying) {
        // Clear any leftover marker so it cannot trigger the spinner later
        sessionStorage.removeItem("vorvenaPageTransition");
    }

    // FIX BACK/FORWARD BUTTON LOADER ISSUE
    window.addEventListener("pageshow", (event) => {

        const navigation =
            performance.getEntriesByType("navigation")[0];

        const returnedFromHistory =
            event.persisted ||
            (navigation && navigation.type === "back_forward");

        if (returnedFromHistory) {
            sessionStorage.removeItem("vorvenaPageTransition");
            hideLoader();
        }

    });

    // SHOW LOADER BEFORE NORMAL INTERNAL PAGE NAVIGATION
    document.addEventListener("click", (event) => {

        const link = event.target.closest("a[href]");

        if (!link) return;

        // Another handler already took over this click (no page change)
        if (event.defaultPrevented) return;

        // New tab / new window clicks do not change this page
        if (
            event.ctrlKey || event.metaKey ||
            event.shiftKey || event.altKey ||
            event.button !== 0
        ) return;

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

        // "/", "/index.html" and "/about", "/about.html" are the same page.
        // A link to the same page (with or without #section) does not reload
        // it, so no spinner and no leftover marker.
        const samePage = path =>
            (path.replace(/index\.html$/, "").replace(/\.html$/, "") || "/");

        if (
            samePage(destination.pathname) === samePage(window.location.pathname) &&
            destination.search === window.location.search
        ) return;

        sessionStorage.setItem("vorvenaPageTransition", "true");
        showLoader();

        // Safety net: if the page does not actually change, never leave the
        // spinner covering the screen or a marker waiting for the next refresh.
        hideTimer = setTimeout(() => {
            sessionStorage.removeItem("vorvenaPageTransition");
            hideLoader();
        }, 8000);

    });

    // CONNECT EXISTING JAVASCRIPT NAVIGATION FUNCTIONS
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
