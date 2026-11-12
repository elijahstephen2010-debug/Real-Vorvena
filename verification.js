
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

  // Display saved signup information
  if (displayEmail) displayEmail.textContent = savedEmail;
  if (displayPhone) displayPhone.textContent = savedPhone;

  let emailVerified = false;
  let phoneVerified = false;

  // Clear previous verification flags
  sessionStorage.removeItem("vorvenaEmailVerified");
  sessionStorage.removeItem("vorvenaPhoneVerified");

  function showMessage(element, message, type = "error") {
    if (!element) return;

    element.textContent = message;
    element.className = type === "success" ? "success-message" : "error-message";
  }

  function getOtpInputs(form) {
    return Array.from(form.querySelectorAll("input"));
  }

  // OTP input handling
  function setupOtpInputs(form) {
    if (!form) return;

    const inputs = getOtpInputs(form);

    inputs.forEach((input, index) => {
      input.maxLength = 1;
      input.inputMode = "numeric";
      input.pattern = "[0-9]*";

      input.addEventListener("input", () => {
        const value = input.value.replace(/\D/g, "");
        input.value = value.slice(-1);

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

  // Backend integration placeholder.
  // Do not mark a contact verified until the backend confirms the OTP.
  async function verifyOtp(type, code) {
    if (!/^\d{6}$/.test(code)) {
      return {
        success: false,
        message: "Please enter the complete six-digit verification code."
      };
    }

    /*
      BACKEND CONNECTION REQUIRED

      Your backend developer must provide:
      - An endpoint to verify email OTP.
      - An endpoint to verify phone OTP.
      - The required request payload.
      - The success/error response format.

      Example structure once the real API is provided:

      const response = await fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: savedEmail,
          phone: savedPhone,
          code: code
        })
      });

      const result = await response.json();

      return result;
    */

    return {
      success: false,
      message: "OTP verification is not connected yet. Please try again after backend integration."
    };
  }

  // Email verification
  if (emailForm) {
    emailForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const code = getOtp(emailForm);

      if (code.length !== 6) {
        showMessage(
          emailMessage,
          "Please enter all six digits of your email verification code."
        );
        return;
      }

      const submitButton = emailForm.querySelector(
        'button[type="submit"]'
      );

      if (submitButton) submitButton.disabled = true;

      try {
        const result = await verifyOtp("email", code);

        if (!result.success) {
          showMessage(
            emailMessage,
            result.message || "Incorrect verification code. Please try again."
          );
          clearOtp(emailForm);
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
      } catch (error) {
        console.error("Email verification error:", error);

        showMessage(
          emailMessage,
          "Unable to verify your email right now. Please try again."
        );
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // Phone verification
  if (phoneForm) {
    phoneForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const code = getOtp(phoneForm);

      if (code.length !== 6) {
        showMessage(
          phoneMessage,
          "Please enter all six digits of your phone verification code."
        );
        return;
      }

      const submitButton = phoneForm.querySelector(
        'button[type="submit"]'
      );

      if (submitButton) submitButton.disabled = true;

      try {
        const result = await verifyOtp("phone", code);

        if (!result.success) {
          showMessage(
            phoneMessage,
            result.message || "Incorrect verification code. Please try again."
          );
          clearOtp(phoneForm);
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
      } catch (error) {
        console.error("Phone verification error:", error);

        showMessage(
          phoneMessage,
          "Unable to verify your phone right now. Please try again."
        );
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // Back to email step
  if (backToEmail) {
    backToEmail.addEventListener("click", () => {
      if (phoneStep) phoneStep.style.display = "none";
      if (emailStep) emailStep.style.display = "block";
    });
  }

  // Change email
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
      showMessage(emailMessage, "Email changed. A new verification code is required.");
    });
  }

  // Change phone
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
      showMessage(phoneMessage, "Phone number changed. A new verification code is required.");
    });
  }

  // Resend code buttons
  const resendEmailCode = document.getElementById("resendEmailCode");
  const resendPhoneCode = document.getElementById("resendPhoneCode");

  if (resendEmailCode) {
    resendEmailCode.addEventListener("click", () => {
      const message = document.getElementById("emailResendMessage");

      if (message) {
        message.textContent =
          "Email OTP sending will be enabled when the backend email service is connected.";
      }
    });
  }

  if (resendPhoneCode) {
    resendPhoneCode.addEventListener("click", () => {
      const message = document.getElementById("phoneResendMessage");

      if (message) {
        message.textContent =
          "SMS OTP sending will be enabled when the backend SMS service is connected.";
      }
    });
  }

  // Continue only after both contacts are genuinely verified
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      if (!emailVerified || !phoneVerified) {
        alert("Please verify both your email and phone number first.");
        return;
      }

      window.location.href =
        accountType === "professional"
          ? "professional-onboarding.html"
          : "client-onboarding.html";
    });
  }
});
