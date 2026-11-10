
/* =========================================
   VORVENA PRIVACY CONSENT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // CONFIGURATION
    // =====================================

    const POLICY_VERSION = "1.0";
    const CONSENT_STORAGE_KEY = "vorvenaPrivacyConsent";

    const PRIVACY_POLICY_URL = "privacy-policy.html";


    // =====================================
    // CHECK EXISTING CONSENT
    // =====================================

    function getSavedConsent() {

        try {

            const saved = localStorage.getItem(CONSENT_STORAGE_KEY);

            return saved ? JSON.parse(saved) : null;

        } catch (error) {

            console.error("Could not read privacy consent:", error);

            return null;

        }

    }


    function hasAcceptedPrivacyPolicy() {

        const consent = getSavedConsent();

        return Boolean(
            consent &&
            consent.accepted === true &&
            consent.policyVersion === POLICY_VERSION
        );

    }


    // =====================================
    // CREATE POPUP HTML
    // =====================================

    function createPrivacyPopup() {

        if (document.getElementById("privacyConsentOverlay")) {
            return;
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

                <div class="consent-top">

                    <div class="consent-logo">

                        <img
                            src="images/vorvena-logo.png"
                            alt="VORVENA Logo"
                            onerror="
                                this.style.display='none';
                                this.nextElementSibling.style.display='flex';
                            "
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
                        Before continuing to VORVENA, please review
                        our Privacy Policy to understand how we
                        handle your personal information.
                    </p>

                </div>


                <div class="consent-information">

                    <h3>How we handle your information</h3>

                    <ul>
                        <li>
                            We collect information needed to manage
                            your account and platform activities.
                        </li>

                        <li>
                            We use relevant information for identity
                            verification, security and payments.
                        </li>

                        <li>
                            We share necessary information with trusted
                            service providers where required.
                        </li>

                        <li>
                            We take reasonable measures to protect
                            your personal information.
                        </li>
                    </ul>

                </div>


                <a
                    href="${PRIVACY_POLICY_URL}"
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
                        VORVENA's Privacy Policy and consent to the
                        processing of my personal information as
                        described in it, where consent is the applicable
                        legal basis.
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
                    Your information will be handled in accordance
                    with our Privacy Policy and applicable data
                    protection laws.
                </p>

            </div>
        `;

        document.body.appendChild(overlay);

        return overlay;

    }


    // =====================================
    // SHOW POPUP
    // =====================================

    function showPrivacyPopup() {

        if (hasAcceptedPrivacyPolicy()) {
            return;
        }

        const overlay = createPrivacyPopup();

        const checkbox = document.getElementById(
            "privacyConsentCheckbox"
        );

        const acceptButton = document.getElementById(
            "privacyAcceptButton"
        );

        document.body.classList.add("privacy-consent-open");

        requestAnimationFrame(() => {
            overlay.classList.add("is-visible");
        });


        // =====================================
        // CHECKBOX CONTROL
        // =====================================

        checkbox.addEventListener("change", () => {

            acceptButton.disabled = !checkbox.checked;

        });


        // =====================================
        // ACCEPT PRIVACY POLICY
        // =====================================

        acceptButton.addEventListener("click", () => {

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
                    CONSENT_STORAGE_KEY,
                    JSON.stringify(consentRecord)
                );

            } catch (error) {

                console.error(
                    "Could not save privacy consent:",
                    error
                );

                alert(
                    "We could not save your privacy consent. Please enable site storage and try again."
                );

                return;

            }


            closePrivacyPopup();

        });

    }


    // =====================================
    // CLOSE POPUP
    // =====================================

    function closePrivacyPopup() {

        const overlay = document.getElementById(
            "privacyConsentOverlay"
        );

        if (!overlay) return;

        overlay.classList.remove("is-visible");

        document.body.classList.remove("privacy-consent-open");

        setTimeout(() => {

            overlay.remove();

        }, 300);

    }


    // =====================================
    // PREVENT UNACCEPTED ACCESS
    // =====================================

    function protectPageNavigation() {

        document.addEventListener("click", event => {

            if (hasAcceptedPrivacyPolicy()) {
                return;
            }

            const link = event.target.closest("a");

            if (!link) return;

            const href = link.getAttribute("href");

            if (!href || href.startsWith("#")) {
                return;
            }

            const destination = new URL(href, window.location.href);

            const currentOrigin = window.location.origin;

            if (destination.origin !== currentOrigin) {
                return;
            }

            // The privacy policy itself must remain readable.
            if (
                destination.pathname.endsWith("/privacy-policy.html") ||
                destination.pathname.endsWith("privacy-policy.html")
            ) {
                return;
            }

            // Do not allow navigation to another local page
            // before the user has accepted the required notice.
            event.preventDefault();

            showPrivacyPopup();

        });

    }


    // =====================================
    // INITIALISE
    // =====================================

    protectPageNavigation();

    showPrivacyPopup();


});
