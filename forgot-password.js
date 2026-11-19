"use strict";

/* =========================================================
   VORVENA: FORGOT PASSWORD

   How it works:
   1. The user types their email and asks for a code.
   2. The server emails a 6-digit code. The page ALWAYS moves on
      to the code step, whether or not an account exists, so nobody
      can use this page to find out which emails are registered.
   3. The user enters the code. The server checks it and returns a
      short-lived reset token.
   4. The user chooses a new password. The page sends the token and
      the new password, and the server re-checks the token.

   Right now RESET_CONFIG.demoMode is true: no email is sent, the demo
   code is accepted, and NO password is really changed. Set demoMode to
   false once the three endpoints in resetApi exist.

   The backend must also (the browser cannot do these):
   - make codes expire (about 10 minutes) and work only once
   - limit requests and wrong attempts per email and per IP address
   - hash the new password (bcrypt or argon2), never store it plain
   - end every existing login session after a reset
   - email the user to say their password was changed
========================================================= */

(() => {
  const RESET_CONFIG = {
    demoMode: true,
    demoCode: "123456",
    codeLength: 6,
    resendSeconds: 30,
    maxAttempts: 5,
    minPassword: 8
  };

  const $ = id => document.getElementById(id);
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  // ----- Backend placeholders -----

  const resetApi = {

    // BACKEND: email a code if the account exists. Always answer 200.
    // Expected: POST /api/auth/password-reset/request  { email }
    async requestCode(email) {
      if (RESET_CONFIG.demoMode) {
        await wait(800);
        return { ok: true };
      }

      const response = await fetch("/api/auth/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error("request_failed");

      return { ok: true };
    },

    // BACKEND: check the code (expiry, attempts, one-time use).
    // Expected: POST /api/auth/password-reset/verify  { email, code }
    //           ->  200 { token }  or  4xx { message }
    async verifyCode(email, code) {
      if (RESET_CONFIG.demoMode) {
        await wait(600);

        return code === RESET_CONFIG.demoCode
          ? { ok: true, token: "demo-reset-token" }
          : { ok: false };
      }

      const response = await fetch("/api/auth/password-reset/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json().catch(() => ({}));

      return response.ok && data.token
        ? { ok: true, token: data.token }
        : { ok: false, message: data.message };
    },

    // BACKEND: set the new password. Re-check the token on the server.
    // Expected: POST /api/auth/password-reset/confirm  { token, password }
    async setPassword(token, password) {
      if (RESET_CONFIG.demoMode) {
        await wait(700);
        return { ok: true };
      }

      const response = await fetch("/api/auth/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json().catch(() => ({}));

      return response.ok
        ? { ok: true }
        : { ok: false, expired: response.status === 401 || response.status === 410, message: data.message };
    }
  };

  // ----- State -----

  let currentStep = 1;
  let email = "";
  let resetToken = "";
  let attempts = 0;
  let locked = false;
  let busy = false;
  let timerId = null;

  const otpInputs = [...document.querySelectorAll(".otp-input")];
  const stepSections = [...document.querySelectorAll(".reset-step")];
  const progressItems = [...document.querySelectorAll("#resetSteps li")];

  // ----- Helpers -----

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function maskEmail(value) {
    const [name, domain] = value.split("@");

    if (!name || !domain) return value;

    return `${name[0]}${"*".repeat(Math.max(2, name.length - 1))}@${domain}`;
  }

  function setBusy(button, isBusy, busyText, normalText) {
    busy = isBusy;
    button.disabled = isBusy;
    button.textContent = isBusy ? busyText : normalText;
  }

  function showStep(step) {
    currentStep = step;

    stepSections.forEach(section => {
      const active = Number(section.dataset.step) === step;

      section.hidden = !active;
      section.classList.toggle("active", active);
    });

    // The progress bar has 3 items; the success screen completes all 3.
    progressItems.forEach((item, index) => {
      const number = index + 1;

      item.classList.toggle("active", number === step);
      item.classList.toggle("done", number < step);

      if (number === step) {
        item.setAttribute("aria-current", "step");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    const focusTarget = {
      1: $("resetEmail"),
      2: otpInputs[0],
      3: $("newPassword"),
      4: $("goLogin")
    }[step];

    if (focusTarget) setTimeout(() => focusTarget.focus(), 60);
  }

  // ----- Step 1: email -----

  async function submitEmail(event) {
    event.preventDefault();

    if (busy) return;

    const value = $("resetEmail").value.trim();

    $("emailError").textContent = "";

    if (!validEmail(value)) {
      $("emailError").textContent = "Enter a valid email address.";
      $("resetEmail").focus();
      return;
    }

    setBusy($("emailSubmit"), true, "Sending…", "Send reset code");

    try {
      await resetApi.requestCode(value);

      email = value;
      startCodeStep();

    } catch (error) {
      $("emailError").textContent =
        "We could not send the code. Check your connection and try again.";

    } finally {
      setBusy($("emailSubmit"), false, "Sending…", "Send reset code");
    }
  }

  function startCodeStep() {
    attempts = 0;
    locked = false;
    resetToken = "";

    clearOtp(false);
    showCodeError("");

    $("codeIntro").textContent =
      `If an account exists for ${maskEmail(email)}, we have sent a 6-digit code. It expires in 10 minutes.`;

    $("demoNote").hidden = !RESET_CONFIG.demoMode;
    $("codeSubmit").disabled = false;

    startResendTimer();
    showStep(2);
  }

  // ----- Step 2: code -----

  function getOtp() {
    return otpInputs.map(input => input.value).join("");
  }

  function clearOtp(focus = true) {
    otpInputs.forEach(input => { input.value = ""; });
    $("otpRow").classList.remove("has-error");

    if (focus) otpInputs[0].focus();
  }

  function showCodeError(message) {
    $("codeError").textContent = message;
    $("otpRow").classList.toggle("has-error", Boolean(message));
  }

  function startResendTimer() {
    let remaining = RESET_CONFIG.resendSeconds;

    clearInterval(timerId);

    const update = () => {
      $("resendCode").disabled = remaining > 0;
      $("resendTimer").textContent =
        remaining > 0 ? `Resend in ${remaining}s` : "";
    };

    update();

    timerId = setInterval(() => {
      remaining--;
      update();

      if (remaining <= 0) clearInterval(timerId);
    }, 1000);
  }

  async function submitCode() {
    if (busy || locked) return;

    const code = getOtp();

    if (code.length !== RESET_CONFIG.codeLength) {
      showCodeError("Enter all 6 digits of your code.");
      return;
    }

    setBusy($("codeSubmit"), true, "Verifying…", "Verify code");
    showCodeError("");

    try {
      const result = await resetApi.verifyCode(email, code);

      if (result.ok) {
        resetToken = result.token;
        clearInterval(timerId);
        showStep(3);
        return;
      }

      attempts++;

      const left = RESET_CONFIG.maxAttempts - attempts;

      if (left <= 0) {
        locked = true;
        showCodeError(
          "Too many incorrect attempts. Request a new code or use a different email."
        );
      } else {
        showCodeError(
          result.message ||
          `That code is not correct. ${left} ${left === 1 ? "attempt" : "attempts"} left.`
        );

        clearOtp();
        $("otpRow").classList.add("has-error");
      }

    } catch (error) {
      showCodeError("Could not verify the code. Please try again.");

    } finally {
      setBusy($("codeSubmit"), false, "Verifying…", "Verify code");
      $("codeSubmit").disabled = locked;
    }
  }

  async function resendCode() {
    if (busy) return;

    $("resendCode").disabled = true;
    $("resendTimer").textContent = "Sending…";
    showCodeError("");

    try {
      await resetApi.requestCode(email);

      attempts = 0;
      locked = false;
      $("codeSubmit").disabled = false;

      clearOtp();
      startResendTimer();

    } catch (error) {
      showCodeError("We could not send a new code. Please try again.");
      $("resendCode").disabled = false;
      $("resendTimer").textContent = "";
    }
  }

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(-1);
      showCodeError("");

      if (input.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", event => {
      if (event.key === "Backspace" && !input.value && index > 0) {
        otpInputs[index - 1].value = "";
        otpInputs[index - 1].focus();
      } else if (event.key === "ArrowLeft" && index > 0) {
        otpInputs[index - 1].focus();
      } else if (event.key === "ArrowRight" && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      } else if (event.key === "Enter") {
        event.preventDefault();
        submitCode();
      }
    });

    input.addEventListener("paste", event => {
      event.preventDefault();

      const digits = (event.clipboardData.getData("text") || "")
        .replace(/\D/g, "")
        .slice(0, otpInputs.length);

      if (!digits) return;

      digits.split("").forEach((digit, position) => {
        otpInputs[position].value = digit;
      });

      otpInputs[Math.min(digits.length, otpInputs.length - 1)].focus();
      showCodeError("");
    });

    input.addEventListener("focus", () => input.select());
  });

  $("codeSubmit").addEventListener("click", submitCode);
  $("resendCode").addEventListener("click", resendCode);

  $("changeEmail").addEventListener("click", () => {
    clearInterval(timerId);
    clearOtp(false);
    showCodeError("");
    resetToken = "";
    showStep(1);
  });

  // ----- Step 3: new password -----

  function passwordChecks() {
    const next = $("newPassword").value;
    const confirmation = $("confirmPassword").value;

    return {
      length: next.length >= RESET_CONFIG.minPassword,
      letter: /[A-Za-z]/.test(next),
      number: /\d/.test(next),
      match: next.length > 0 && next === confirmation
    };
  }

  function updateRules() {
    const checks = passwordChecks();

    document.querySelectorAll("#passwordRules li").forEach(item => {
      item.classList.toggle("met", checks[item.dataset.rule]);
    });
  }

  async function submitPassword(event) {
    event.preventDefault();

    if (busy) return;

    const checks = passwordChecks();

    $("passwordError").textContent = "";

    if (!checks.length || !checks.letter || !checks.number) {
      $("passwordError").textContent =
        "Your password needs at least 8 characters, with a letter and a number.";
      $("newPassword").focus();
      return;
    }

    if (!checks.match) {
      $("passwordError").textContent = "The two passwords do not match.";
      $("confirmPassword").focus();
      return;
    }

    if (!resetToken) {
      $("passwordError").textContent =
        "Your reset session has ended. Please start again.";
      return;
    }

    setBusy($("passwordSubmit"), true, "Updating…", "Update password");

    try {
      const result = await resetApi.setPassword(resetToken, $("newPassword").value);

      if (!result.ok) {
        if (result.expired) {
          // The token timed out: go back to the start.
          resetToken = "";
          $("newPassword").value = "";
          $("confirmPassword").value = "";
          updateRules();
          $("emailError").textContent =
            "Your reset session expired. Please request a new code.";
          showStep(1);
          return;
        }

        $("passwordError").textContent =
          result.message || "We could not update your password. Please try again.";
        return;
      }

      // Leave a note for the login page (it shows "password updated").
      try {
        sessionStorage.setItem("vorvenaPasswordResetDone", email);
      } catch (error) {
        // Storage blocked: the login page just shows no notice.
      }

      // Clear everything sensitive from the page.
      $("newPassword").value = "";
      $("confirmPassword").value = "";
      resetToken = "";
      updateRules();

      showStep(4);

    } catch (error) {
      $("passwordError").textContent =
        "We could not update your password. Check your connection and try again.";

    } finally {
      setBusy($("passwordSubmit"), false, "Updating…", "Update password");
    }
  }

  $("newPassword").addEventListener("input", updateRules);
  $("confirmPassword").addEventListener("input", updateRules);
  $("emailForm").addEventListener("submit", submitEmail);
  $("passwordForm").addEventListener("submit", submitPassword);

  document.querySelectorAll(".pw-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const input = $(button.dataset.target);
      const show = input.type === "password";

      input.type = show ? "text" : "password";
      button.textContent = show ? "Hide" : "Show";
      button.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  });

  // ----- Start -----

  // The login page can send the typed email: forgot-password.html?email=...
  const prefill = new URLSearchParams(window.location.search).get("email");

  if (prefill && validEmail(prefill.trim())) {
    $("resetEmail").value = prefill.trim();
  }

  showStep(1);
})();
