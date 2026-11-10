
/* =========================================
   VORVENA - PRIVACY CONSENT SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // SETTINGS
    // =====================================

    const POLICY_VERSION = "1.0";
    const STORAGE_KEY = "vorvenaPrivacyConsent";
    const POLICY_URL = "privacy-policy.html";


    // =====================================
    // CHECK SAVED CONSENT
    // =====================================

    function getSavedConsent() {

        try {

            const saved = localStorage.getItem(STORAGE_KEY);

            return saved ? JSON.parse(saved) : null;

        } catch (error) {

            console.error("Consent storage error:", error);

            return null;

        }

    }


    function hasAcceptedPolicy() {

        const consent = getSavedConsent();

        return Boolean(
            consent &&
            consent.accepted === true &&
            consent.policyVersion === POLICY_VERSION
        );

    }


    // =====================================
    // CREATE POPUP
    // =====================================

    function createPopup() {

        if (document.getElementById("privacyConsentOverlay")) {
            return document.getElementById("privacyConsentOverlay");
        }

        const overlay = document.createElement("div");

        overlay.className = "privacy-consent-overlay";
        overlay.id = "privacyConsentOverlay";

        overlay.innerHTML = `

            <div
                class="privacy-consent-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="consentTitle"
                aria-describedby="consentDescription"
            >

                <!-- LOGO AND HEADING -->

                <div class="consent-top">

                    <div class="consent-logo">

                        <img
                            src="./assets/VORVENA Logo Badge.png"
                            alt="VORVENA Logo"
                        >

                        <span class="consent-logo-fallback">V</span>

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


                <!-- SHORT INFORMATION -->

                <div class="consent-information">

                    <h3>How we handle your information</h3>

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


                <!-- PRIVACY POLICY LINK -->

                <a
                    href="${POLICY_URL}"
                    class="consent-policy-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read our complete Privacy Policy →
                </a>


                <!-- CONSENT CHECKBOX -->

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


                <!-- ACCEPT BUTTON -->

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
    // SHOW POPUP
    // =====================================

    function showPopup() {

        if (hasAcceptedPolicy()) {
            return;
        }

        const overlay = createPopup();

        const checkbox = document.getElementById(
            "privacyConsentCheckbox"
        );

        const acceptButton = document.getElementById(
            "privacyAcceptButton"
        );

        document.body.classList.add("privacy-consent-open");

        requestAnimationFrame(function () {

            overlay.classList.add("is-visible");

        });


        // CHECKBOX

        checkbox.addEventListener("change", function () {

            acceptButton.disabled = !checkbox.checked;

        });


        // ACCEPT PRIVACY POLICY

        acceptButton.addEventListener("click", function () {

            if (!checkbox.checked) {
                return;
            }

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

                console.error("Could not save consent:", error);

                alert(
                    "We could not save your privacy preference. Please enable browser storage and try again."
                );

                return;

            }


            // CLOSE POPUP

            overlay.classList.remove("is-visible");

            document.body.classList.remove("privacy-consent-open");

            setTimeout(function () {

                overlay.remove();

            }, 300);

        });

    }


    // =====================================
    // PROTECT INTERNAL PAGE NAVIGATION
    // =====================================

    document.addEventListener("click", function (event) {

        if (hasAcceptedPolicy()) {
            return;
        }

        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        let destination;

        try {

            destination = new URL(href, window.location.href);

        } catch (error) {

            return;

        }


        // Allow external links.

        if (destination.origin !== window.location.origin) {
            return;
        }


        // Allow access to the complete Privacy Policy.

        if (
            destination.pathname.endsWith("privacy-policy.html")
        ) {
            return;
        }


        // Stop navigation until consent is recorded.

        event.preventDefault();

        showPopup();

    });


    // =====================================
    // INITIALISE
    // =====================================

    showPopup();

});
