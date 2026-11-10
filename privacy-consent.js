
/* =========================================
   VORVENA - PRIVACY CONSENT SYSTEM
   COMPLETE VERSION
========================================= */

(function () {

    "use strict";

    // =====================================
    // CONFIGURATION
    // =====================================

    const POLICY_VERSION = "1.0";
    const STORAGE_KEY = "vorvenaPrivacyConsent";
    const POLICY_URL = "./privacy-policy.html";

    // =====================================
    // CHECK PREVIOUS ACCEPTANCE
    // =====================================

    function hasAcceptedPolicy() {

        try {

            const savedConsent = localStorage.getItem(STORAGE_KEY);

            if (!savedConsent) return false;

            const consent = JSON.parse(savedConsent);

            return (
                consent.accepted === true &&
                consent.policyVersion === POLICY_VERSION
            );

        } catch (error) {

            console.error("VORVENA consent check failed:", error);

            return false;

        }

    }

    // =====================================
    // CREATE POPUP
    // =====================================

    function createPopup() {

        const existingPopup = document.getElementById(
            "privacyConsentOverlay"
        );

        if (existingPopup) return existingPopup;

        const overlay = document.createElement("div");

        overlay.id = "privacyConsentOverlay";
        overlay.className = "privacy-consent-overlay";

        overlay.innerHTML = `

            <div
                class="privacy-consent-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="consentTitle"
                aria-describedby="consentDescription"
            >

                <div class="consent-top">

                    <div class="consent-logo">

                        <img
                            src="./assets/vorvena_logo_transparent.png"
                            alt="VORVENA Logo"
                        >

                        <span class="consent-logo-fallback">
                            V
                        </span>

                    </div>

                    <span class="consent-label">
                        YOUR PRIVACY MATTERS
                    </span>

                    <h2 id="consentTitle">
                        Your Privacy Comes First
                    </h2>

                    <p id="consentDescription">
                        We value your trust. Please review how VORVENA
                        collects, uses and protects your personal
                        information before continuing.
                    </p>

                </div>

                <div class="consent-information">

                    <h3>
                        How we handle your information
                    </h3>

                    <ul>

                        <li>
                            We collect information needed to manage
                            your account and platform activities.
                        </li>

                        <li>
                            We use relevant information for verification,
                            security and payments.
                        </li>

                        <li>
                            Necessary information may be shared with
                            trusted service providers.
                        </li>

                    </ul>

                </div>

                <a
                    href="${POLICY_URL}"
                    class="consent-policy-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read our complete Privacy Policy →
                </a>

                <label class="consent-checkbox-area">

                    <input
                        type="checkbox"
                        id="privacyConsentCheckbox"
                    >

                    <span>
                        I acknowledge that I have read and understood
                        VORVENA's Privacy Policy and agree to the
                        processing described in it where consent
                        is the applicable legal basis.
                    </span>

                </label>

                <button
                    type="button"
                    id="privacyAcceptButton"
                    class="consent-accept-button"
                    disabled
                >
                    Accept & Continue
                </button>

                <p class="consent-footnote">
                    Your privacy and information security matter to us.
                </p>

            </div>

        `;

        document.body.appendChild(overlay);

        // LOGO FALLBACK

        const logo = overlay.querySelector(".consent-logo img");

        const fallback = overlay.querySelector(
            ".consent-logo-fallback"
        );

        logo.addEventListener("error", function () {

            logo.style.display = "none";
            fallback.style.display = "flex";

        });

        return overlay;

    }

    // =====================================
    // DISPLAY POPUP
    // =====================================

    function showPopup() {

        if (hasAcceptedPolicy()) return;

        const overlay = createPopup();

        const checkbox = overlay.querySelector(
            "#privacyConsentCheckbox"
        );

        const acceptButton = overlay.querySelector(
            "#privacyAcceptButton"
        );

        document.body.classList.add(
            "privacy-consent-open"
        );

        requestAnimationFrame(function () {

            overlay.classList.add("is-visible");

        });

        // CHECKBOX FUNCTIONALITY

        checkbox.addEventListener("change", function () {

            acceptButton.disabled = !checkbox.checked;

        });

        // ACCEPT PRIVACY POLICY

        acceptButton.addEventListener("click", function () {

            if (!checkbox.checked) return;

            const consentRecord = {

                accepted: true,

                policyVersion: POLICY_VERSION,

                acceptedAt: new Date().toISOString(),

                consentMethod: "privacy-policy-checkbox"

            };

            try {

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(consentRecord)
                );

            } catch (error) {

                console.error(
                    "VORVENA could not save consent:",
                    error
                );

                alert(
                    "Unable to save your privacy preference. Please try again."
                );

                return;

            }

            // CLOSE POPUP

            overlay.classList.remove("is-visible");

            document.body.classList.remove(
                "privacy-consent-open"
            );

            setTimeout(function () {

                overlay.remove();

            }, 300);

        });

    }

    // =====================================
    // PREVENT NAVIGATION WITHOUT CONSENT
    // =====================================

    document.addEventListener("click", function (event) {

        if (hasAcceptedPolicy()) return;

        const link = event.target.closest("a");

        if (!link) return;

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) return;

        let destination;

        try {

            destination = new URL(
                href,
                window.location.href
            );

        } catch (error) {

            return;

        }

        // ALLOW EXTERNAL WEBSITES

        if (destination.origin !== window.location.origin) {
            return;
        }

        // ALLOW PRIVACY POLICY PAGE

        if (
            destination.pathname.endsWith("privacy-policy.html")
        ) {
            return;
        }

        // BLOCK OTHER INTERNAL NAVIGATION

        event.preventDefault();

        showPopup();

    });

    // =====================================
    // INITIALISE SYSTEM
    // =====================================

    function initialiseConsent() {

        if (hasAcceptedPolicy()) return;

        showPopup();

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseConsent,
            { once: true }
        );

    } else {

        initialiseConsent();

    }

})();
