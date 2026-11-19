/* ============================================================
   VORVENA | temporary browser-based accounts (frontend prototype)

   One shared file used by: signup, verification, onboarding, login
   and the dashboards. It keeps every registered account in localStorage:

     email, role, name, phone, location, salted password HASH,
     emailVerified, phoneVerified, onboardingComplete, status, profile

   PROTOTYPE ONLY. Anything in the browser can be read or edited by the person
   using it, so real sign-up, login, OTP checks and password storage MUST move
   to the backend before launch. Each function below maps to an API call
   (comments show the planned route) so the pages do not need to change much.
============================================================ */

(function (global) {
    "use strict";

    const ACCOUNTS_KEY = "vorvenaAccounts";
    const REMEMBER_KEY = "vorvenaRemembered";
    const REMEMBER_DAYS = 30;

    const DASHBOARDS = {
        client: "client-dashboard.html",
        professional: "professional-dashboard.html"
    };

    const ONBOARDING = {
        client: "client-onboarding.html",
        professional: "professional-onboarding.html"
    };

    // Where each role's profile is kept for the dashboards
    const ACTIVE = {
        client: {
            profile: "vorvenaClientProfile",
            image: "vorvenaClientProfileImage"
        },
        professional: {
            profile: "vorvenaProfessionalProfile",
            image: "vorvenaProfileImage"
        }
    };

    /* ---------- small helpers ---------- */

    const normalizeEmail = value => String(value || "").trim().toLowerCase();
    const imageKey = email => "vorvenaAccountImage:" + normalizeEmail(email);

    function readJSON(storage, key, fallback) {
        try {
            const value = JSON.parse(storage.getItem(key));
            return value === null || value === undefined ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function readAccounts() {
        const accounts = readJSON(localStorage, ACCOUNTS_KEY, {});
        return accounts && typeof accounts === "object" && !Array.isArray(accounts) ? accounts : {};
    }

    function writeAccounts(accounts) {
        try {
            localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
            return true;
        } catch (error) {
            return false;
        }
    }

    function randomSalt() {
        if (global.crypto && crypto.getRandomValues) {
            const bytes = new Uint8Array(16);
            crypto.getRandomValues(bytes);
            return [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
        }
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    const hasSubtle = () => Boolean(global.crypto && crypto.subtle && global.TextEncoder);

    // PBKDF2 when the browser allows it; a basic fallback otherwise (demo only).
    async function hashPassword(password, salt, alg) {
        if (alg === "pbkdf2") {
            const encoder = new TextEncoder();
            const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
            const bits = await crypto.subtle.deriveBits(
                { name: "PBKDF2", salt: encoder.encode(salt), iterations: 100000, hash: "SHA-256" },
                key,
                256
            );
            return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, "0")).join("");
        }

        let h = 5381;
        for (const c of salt + ":" + password) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
        return String(h);
    }

    // Removes the large image so the account record stays small
    function splitImage(profile) {
        const copy = { ...(profile || {}) };
        const image = copy.profileImage || "";
        delete copy.profileImage;
        return { copy, image };
    }

    function saveImage(email, image) {
        try {
            if (image) localStorage.setItem(imageKey(email), image);
            else localStorage.removeItem(imageKey(email));
        } catch (error) { /* storage full: the photo is skipped */ }
    }

    /* ---------- reading accounts ---------- */

    // Safe copy: never includes the password hash
    function publicAccount(account) {
        if (!account) return null;
        const { passwordHash, salt, alg, ...safe } = account;
        return safe;
    }

    function getAccount(email) {
        return publicAccount(readAccounts()[normalizeEmail(email)]);
    }

    /* ---------- 1 + 2: REGISTER ---------- */

    // POST /api/auth/register
    async function register(data) {
        const key = normalizeEmail(data.email);
        const accounts = readAccounts();
        const existing = accounts[key];

        // A finished account blocks the email. An abandoned signup can be started again.
        if (existing && existing.onboardingComplete) return { ok: false, reason: "exists" };

        const salt = randomSalt();
        const alg = hasSubtle() ? "pbkdf2" : "basic";

        accounts[key] = {
            email: String(data.email).trim(),
            role: data.role,
            fullName: data.fullName,
            phone: data.phone,
            country: data.country || "",
            region: data.region || "",
            city: data.city || "",
            salt,
            alg,
            passwordHash: await hashPassword(data.password, salt, alg),
            emailVerified: false,
            phoneVerified: false,
            onboardingComplete: false,
            status: "active",
            profile: null,
            createdAt: new Date().toISOString()
        };

        saveImage(key, "");

        if (!writeAccounts(accounts)) return { ok: false, reason: "storage" };
        return { ok: true };
    }

    /* ---------- 3: VERIFICATION ---------- */

    // POST /api/auth/verify-email  and  /api/auth/verify-phone
    function setVerified(email, kind) {
        const key = normalizeEmail(email);
        const accounts = readAccounts();
        if (!accounts[key]) return { ok: false, reason: "no-account" };

        if (kind === "email") accounts[key].emailVerified = true;
        if (kind === "phone") accounts[key].phoneVerified = true;

        return writeAccounts(accounts) ? { ok: true } : { ok: false, reason: "storage" };
    }

    // Changing the email moves the account to the new email and needs verifying again
    function changeEmail(oldEmail, newEmail) {
        const oldKey = normalizeEmail(oldEmail);
        const newKey = normalizeEmail(newEmail);
        const accounts = readAccounts();

        if (!accounts[oldKey]) return { ok: false, reason: "no-account" };
        if (newKey !== oldKey && accounts[newKey]) return { ok: false, reason: "exists" };

        const account = accounts[oldKey];
        account.email = String(newEmail).trim();
        account.emailVerified = false;

        if (newKey !== oldKey) {
            delete accounts[oldKey];
            accounts[newKey] = account;
        }

        return writeAccounts(accounts) ? { ok: true } : { ok: false, reason: "storage" };
    }

    function changePhone(email, newPhone) {
        const key = normalizeEmail(email);
        const accounts = readAccounts();
        if (!accounts[key]) return { ok: false, reason: "no-account" };

        accounts[key].phone = newPhone;
        accounts[key].phoneVerified = false;

        return writeAccounts(accounts) ? { ok: true } : { ok: false, reason: "storage" };
    }

    /* ---------- 4: ONBOARDING ---------- */

    // POST /api/onboarding
    function completeOnboarding(email, profile, image) {
        const key = normalizeEmail(email);
        const accounts = readAccounts();
        if (!accounts[key]) return { ok: false, reason: "no-account" };

        const { copy, image: embedded } = splitImage(profile);

        accounts[key].onboardingComplete = true;
        accounts[key].profile = copy;
        if (copy.fullName) accounts[key].fullName = copy.fullName;

        saveImage(key, image || embedded);

        return writeAccounts(accounts) ? { ok: true } : { ok: false, reason: "storage" };
    }

    /* ---------- the active profile used by the dashboards ---------- */

    // Dashboards edit the "active" profile. Before another account takes over,
    // copy those latest edits back into the account they belong to.
    function syncActiveIntoAccounts() {
        const accounts = readAccounts();
        let changed = false;

        Object.keys(ACTIVE).forEach(role => {
            const keys = ACTIVE[role];
            const profile = readJSON(localStorage, keys.profile, null);
            if (!profile || !profile.email) return;

            const accountKey = normalizeEmail(profile.email);
            const account = accounts[accountKey];
            if (!account || account.role !== role || !account.onboardingComplete) return;

            const { copy, image: embedded } = splitImage(profile);
            account.profile = copy;
            if (copy.fullName) account.fullName = copy.fullName;

            let image = "";
            try { image = localStorage.getItem(keys.image) || embedded; } catch (error) { image = embedded; }
            saveImage(accountKey, image);
            changed = true;
        });

        if (changed) writeAccounts(accounts);
    }

    // Puts one account's details where every page expects them
    function hydrateSession(account) {
        const keys = ACTIVE[account.role];

        // signup details used by verification, onboarding and the dashboards
        sessionStorage.setItem("vorvenaFullName", account.fullName || "");
        sessionStorage.setItem("vorvenaEmail", account.email || "");
        sessionStorage.setItem("vorvenaPhone", account.phone || "");
        sessionStorage.setItem("vorvenaCountry", account.country || "");
        sessionStorage.setItem("vorvenaRegion", account.region || "");
        sessionStorage.setItem("vorvenaCity", account.city || "");
        sessionStorage.setItem("vorvenaAccountType", account.role);

        if (!account.onboardingComplete || !account.profile) return;

        let image = "";
        try { image = localStorage.getItem(imageKey(account.email)) || ""; } catch (error) { /* ignore */ }

        const profile = { ...account.profile };
        if (account.role === "client") profile.profileImage = image;

        const saved = JSON.stringify(profile);

        try {
            sessionStorage.setItem(keys.profile, saved);
            localStorage.setItem(keys.profile, saved);

            if (image) localStorage.setItem(keys.image, image);
            else localStorage.removeItem(keys.image);
        } catch (error) { /* storage full */ }

        if (account.role === "client") {
            sessionStorage.setItem("vorvenaClientOnboardingComplete", "true");
            localStorage.setItem("vorvenaClientOnboardingComplete", "true");
        } else {
            sessionStorage.setItem("vorvenaOnboardingComplete", "true");
        }
    }

    // Lets an unfinished account carry on where it stopped
    function resumeSetup(account) {
        hydrateSession(account);

        if (account.emailVerified) sessionStorage.setItem("vorvenaEmailVerified", "true");
        if (account.phoneVerified) sessionStorage.setItem("vorvenaPhoneVerified", "true");
    }

    /* ---------- 5 to 8: LOGIN ---------- */

    // POST /api/auth/login   -> the server checks the password and the account status
    async function login(email, password, remember) {
        const key = normalizeEmail(email);
        const stored = readAccounts()[key];

        // One message for "no account" and "wrong password" so it does not reveal which emails exist
        if (!stored) return { ok: false, reason: "invalid" };

        const hash = await hashPassword(password, stored.salt, stored.alg);
        if (hash !== stored.passwordHash) return { ok: false, reason: "invalid" };

        if (stored.status && stored.status !== "active") return { ok: false, reason: "disabled" };

        const account = publicAccount(stored);

        if (!stored.emailVerified || !stored.phoneVerified) {
            return { ok: false, reason: "unverified", account, next: "verification.html" };
        }

        if (!stored.onboardingComplete) {
            return { ok: false, reason: "onboarding", account, next: ONBOARDING[stored.role] };
        }

        syncActiveIntoAccounts();
        hydrateSession(stored);
        startSession(stored.email, stored.role, remember);

        return { ok: true, role: stored.role, dashboard: DASHBOARDS[stored.role] };
    }

    function startSession(email, role, remember) {
        sessionStorage.setItem("vorvenaLoggedIn", "true");
        sessionStorage.setItem("vorvenaLoggedInEmail", normalizeEmail(email));
        sessionStorage.setItem("vorvenaLoggedInRole", role);

        try {
            if (remember) {
                localStorage.setItem(REMEMBER_KEY, JSON.stringify({
                    email: normalizeEmail(email),
                    role,
                    until: Date.now() + REMEMBER_DAYS * 86400000
                }));
            } else {
                localStorage.removeItem(REMEMBER_KEY);
            }
        } catch (error) { /* ignore */ }
    }

    // "Remember me": signs the person back in on this browser until the date passes
    function restoreSession() {
        if (sessionStorage.getItem("vorvenaLoggedIn") === "true") return;

        // A signup is in progress in this tab: never replace it with a remembered account
        if (sessionStorage.getItem("vorvenaAccountType")) return;

        const saved = readJSON(localStorage, REMEMBER_KEY, null);
        if (!saved || !saved.email || !saved.until || saved.until < Date.now()) {
            if (saved) clearRemembered();
            return;
        }

        const account = readAccounts()[normalizeEmail(saved.email)];
        const valid = account && account.role === saved.role && account.status !== "suspended" &&
            account.emailVerified && account.phoneVerified && account.onboardingComplete;

        if (!valid) { clearRemembered(); return; }

        syncActiveIntoAccounts();
        hydrateSession(account);
        startSession(account.email, account.role, true);
    }

    function clearRemembered() {
        try { localStorage.removeItem(REMEMBER_KEY); } catch (error) { /* ignore */ }
    }

    // Use at the top of a protected page: VorvenaAuth.guard("client")
    function guard(role) {
        const ok = sessionStorage.getItem("vorvenaLoggedIn") === "true" &&
            sessionStorage.getItem("vorvenaLoggedInRole") === role;

        if (!ok) window.location.replace("login.html");
        return ok;
    }

    global.VorvenaAuth = {
        normalizeEmail,
        getAccount,
        register,
        setVerified,
        changeEmail,
        changePhone,
        completeOnboarding,
        login,
        resumeSetup,
        restoreSession,
        clearRemembered,
        guard,
        dashboardFor: role => DASHBOARDS[role]
    };

})(window);
