
document.addEventListener("DOMContentLoaded", () => {
  const savedEmail =
    sessionStorage.getItem("vorvenaEmail") ||
    localStorage.getItem("vorvenaEmail");

  const savedPhone =
    sessionStorage.getItem("vorvenaPhone") ||
    localStorage.getItem("vorvenaPhone");

  const accountType =
    sessionStorage.getItem("vorvenaAccountType") ||
    localStorage.getItem("vorvenaAccountType") ||
    "client";

  const displayEmail = document.getElementById("displayEmail");
  const displayPhone = document.getElementById("displayPhone");

  const emailForm = document.getElementById("emailVerificationForm");
  const phoneForm = document.getElementById("phoneVerificationForm");

  const emailMessage = document.getElementById("emailMessage");
  const phoneMessage = document.getElementById("phoneMessage");

  const emailStep = document.getElementById("emailStep");
  const phoneStep = document.getElementById("phoneStep");
  const successStep = document.getElementById("successStep");

  const continueBtn = document.getElementById("continueBtn");
  const backToEmail = document.getElementById("backToEmail");

  if (!savedEmail || !savedPhone) {
    alert("Your signup information could not be found. Please sign up again.");

    window.location.href =
      accountType === "professional"
        ? "professional-signup.html"
        : "client-signup.html";

    return;
  }

  if (displayEmail) displayEmail.textContent = savedEmail;
  if (displayPhone) displayPhone.textContent = savedPhone;

  let emailVerified = false;
  let phoneVerified = false;

  sessionStorage.removeItem("vorvenaEmailVerified");
  sessionStorage.removeItem("vorvenaPhoneVerified");

  function showMessage(element, message, type = "error") {
    if (!element) return;

    element.textContent = message;
    element.className =
      type === "success" ? "success-message" : "error-message";
  }

  function getOtpInputs(form) {
    return form
      ? Array.from(form.querySelectorAll("input"))
      : [];
  }

  function setupOtpInputs(form) {
    if (!form) return;

    const inputs = getOtpInputs(form);

    inputs.forEach((input, index) => {
      input.maxLength = 1;
      input.inputMode = "numeric";
      input.pattern = "[0-9]*";

      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(-1);

        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (event) => {
        if (
          event.key === "Backspace" &&
          !input.value &&
          index > 0
        ) {
          inputs[index - 1].focus();
        }
      });

      input.addEventListener("paste", (event) => {
        event.preventDefault();

        const pasted = event.clipboardData
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, inputs.length);

        inputs.forEach((field, i) => {
          field.value = pasted[i] || "";
        });

        const nextEmpty = inputs.find((field) => !field.value);

        if (nextEmpty) {
          nextEmpty.focus();
        } else {
          inputs[inputs.length - 1].focus();
        }
      });
    });
  }

  setupOtpInputs(emailForm);
  setupOtpInputs(phoneForm);

  function getOtp(form) {
    return getOtpInputs(form)
      .map((input) => input.value)
      .join("");
  }

  function clearOtp(form) {
    getOtpInputs(form).forEach((input) => {
      input.value = "";
    });
  }

  // TEMPORARY FRONTEND TESTING:
  // Accept any complete six-digit code until backend OTP is connected.
  function verifyOtp(code) {
    return /^\d{6}$/.test(code);
  }

  // EMAIL VERIFICATION
  if (emailForm) {
    emailForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const code = getOtp(emailForm);

      if (!verifyOtp(code)) {
        showMessage(
          emailMessage,
          "Please enter all six digits of your verification code."
        );
        return;
      }

      emailVerified = true;
      sessionStorage.setItem("vorvenaEmailVerified", "true");

      showMessage(
        emailMessage,
        "Email verified successfully!",
        "success"
      );

      if (emailStep) emailStep.style.display = "none";
      if (phoneStep) phoneStep.style.display = "block";
    });
  }

  // PHONE VERIFICATION
  if (phoneForm) {
    phoneForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const code = getOtp(phoneForm);

      if (!verifyOtp(code)) {
        showMessage(
          phoneMessage,
          "Please enter all six digits of your verification code."
        );
        return;
      }

      phoneVerified = true;
      sessionStorage.setItem("vorvenaPhoneVerified", "true");

      showMessage(
        phoneMessage,
        "Phone number verified successfully!",
        "success"
      );

      if (phoneStep) phoneStep.style.display = "none";
      if (successStep) successStep.style.display = "block";
    });
  }

  // BACK TO EMAIL
  if (backToEmail) {
    backToEmail.addEventListener("click", () => {
      if (phoneStep) phoneStep.style.display = "none";
      if (emailStep) emailStep.style.display = "block";
    });
  }

  // CHANGE EMAIL
  const changeEmail = document.getElementById("changeEmail");

  if (changeEmail) {
    changeEmail.addEventListener("click", () => {
      const newEmail = prompt("Enter your correct email address:");

      if (!newEmail) return;

      const cleanedEmail = newEmail.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailPattern.test(cleanedEmail)) {
        alert("Please enter a valid email address.");
        return;
      }

      sessionStorage.setItem("vorvenaEmail", cleanedEmail);
      localStorage.setItem("vorvenaEmail", cleanedEmail);

      if (displayEmail) displayEmail.textContent = cleanedEmail;

      emailVerified = false;
      sessionStorage.removeItem("vorvenaEmailVerified");

      clearOtp(emailForm);

      showMessage(
        emailMessage,
        "Email updated successfully. Enter any six digits to continue.",
        "success"
      );
    });
  }

  // CHANGE PHONE
  const changePhone = document.getElementById("changePhone");

  if (changePhone) {
    changePhone.addEventListener("click", () => {
      const newPhone = prompt("Enter your correct phone number:");

      if (!newPhone) return;

      const cleanedPhone = newPhone.trim();

      if (!/^\+?[0-9\s()-]+$/.test(cleanedPhone)) {
        alert("Please enter a valid phone number using digits only.");
        return;
      }

      const digits = cleanedPhone.replace(/\D/g, "");

      if (digits.length < 7 || digits.length > 15) {
        alert("Please enter a valid international phone number.");
        return;
      }

      sessionStorage.setItem("vorvenaPhone", cleanedPhone);
      localStorage.setItem("vorvenaPhone", cleanedPhone);

      if (displayPhone) displayPhone.textContent = cleanedPhone;

      phoneVerified = false;
      sessionStorage.removeItem("vorvenaPhoneVerified");

      clearOtp(phoneForm);

      showMessage(
        phoneMessage,
        "Phone number updated successfully. Enter any six digits to continue.",
        "success"
      );
    });
  }

  // RESEND BUTTONS - TEMPORARY PLACEHOLDER
  const resendEmailCode = document.getElementById("resendEmailCode");
  const resendPhoneCode = document.getElementById("resendPhoneCode");

  if (resendEmailCode) {
    resendEmailCode.addEventListener("click", () => {
      const message = document.getElementById("emailResendMessage");

      if (message) {
        message.textContent =
          "Temporary testing mode: enter any six digits.";
      }
    });
  }

  if (resendPhoneCode) {
    resendPhoneCode.addEventListener("click", () => {
      const message = document.getElementById("phoneResendMessage");

      if (message) {
        message.textContent =
          "Temporary testing mode: enter any six digits.";
      }
    });
  }

  // CONTINUE TO ONBOARDING
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      if (!emailVerified || !phoneVerified) {
        alert("Please complete both verification steps first.");
        return;
      }

      window.location.href =
        accountType === "professional"
          ? "professional-onboarding.html"
          : "client-onboarding.html";
    });
  }
});
