
document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const emailStep = document.getElementById("emailStep");
  const phoneStep = document.getElementById("phoneStep");
  const successStep = document.getElementById("successStep");

  const emailForm = document.getElementById("emailVerificationForm");
  const phoneForm = document.getElementById("phoneVerificationForm");

  const emailInputs = emailForm.querySelectorAll(".otp-inputs input");
  const phoneInputs = phoneForm.querySelectorAll(".otp-inputs input");

  const emailMessage = document.getElementById("emailMessage");
  const phoneMessage = document.getElementById("phoneMessage");

  // DISPLAY SIGNUP DETAILS
  const savedEmail = sessionStorage.getItem("vorvenaEmail");
  const savedPhone = sessionStorage.getItem("vorvenaPhone");

  if (savedEmail) {
    document.getElementById("displayEmail").textContent = savedEmail;
  }

  if (savedPhone) {
    document.getElementById("displayPhone").textContent = savedPhone;
  }

  // FOOTER YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // SCREEN NAVIGATION
  function showStep(step) {
    [emailStep, phoneStep, successStep].forEach(section => {
      section.classList.remove("active");
    });

    step.classList.add("active");
  }

  // OTP INPUT HANDLING
  function setupOtpInputs(inputs) {

    inputs.forEach((input, index) => {

      input.addEventListener("input", () => {

        input.value = input.value.replace(/\D/g, "").slice(-1);

        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

      });

      input.addEventListener("keydown", event => {

        if (
          event.key === "Backspace" &&
          !input.value &&
          index > 0
        ) {
          inputs[index - 1].focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
          inputs[index - 1].focus();
        }

        if (
          event.key === "ArrowRight" &&
          index < inputs.length - 1
        ) {
          inputs[index + 1].focus();
        }

      });

      input.addEventListener("paste", event => {

        event.preventDefault();

        const pasted = event.clipboardData
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, 6);

        pasted.split("").forEach((digit, i) => {
          if (inputs[i]) {
            inputs[i].value = digit;
          }
        });

        if (pasted.length > 0) {
          inputs[Math.min(pasted.length, 5)].focus();
        }

      });

    });

  }

  setupOtpInputs(emailInputs);
  setupOtpInputs(phoneInputs);

  // GET OTP
  function getOtp(inputs) {
    return Array.from(inputs)
      .map(input => input.value)
      .join("");
  }

  // CLEAR OTP
  function clearOtp(inputs) {
    inputs.forEach(input => input.value = "");
    inputs[0].focus();
  }

  // EMAIL VERIFICATION
  emailForm.addEventListener("submit", event => {

    event.preventDefault();

    const otp = getOtp(emailInputs);

    if (otp.length !== 6) {
      emailMessage.textContent = "Enter all six digits.";
      return;
    }

    emailMessage.style.color = "#16834b";
    emailMessage.textContent = "Email verified successfully!";

    setTimeout(() => {
      emailMessage.textContent = "";
      clearOtp(emailInputs);
      showStep(phoneStep);
    }, 700);

  });

  // PHONE VERIFICATION
  phoneForm.addEventListener("submit", event => {

    event.preventDefault();

    const otp = getOtp(phoneInputs);

    if (otp.length !== 6) {
      phoneMessage.textContent = "Enter all six digits.";
      return;
    }

    phoneMessage.style.color = "#16834b";
    phoneMessage.textContent = "Phone verified successfully!";

    setTimeout(() => {
      phoneMessage.textContent = "";
      clearOtp(phoneInputs);
      showStep(successStep);
    }, 700);

  });

  // RESEND EMAIL
  document.getElementById("resendEmailCode")
    .addEventListener("click", () => {

      const message = document.getElementById("emailResendMessage");

      message.style.color = "#16834b";
      message.textContent = "Demo mode: no email code was sent.";

    });

  // RESEND PHONE
  document.getElementById("resendPhoneCode")
    .addEventListener("click", () => {

      const message = document.getElementById("phoneResendMessage");

      message.style.color = "#16834b";
      message.textContent = "Demo mode: no SMS code was sent.";

    });

  // CHANGE EMAIL
  document.getElementById("changeEmail")
    .addEventListener("click", () => {

      const newEmail = prompt("Enter your email address:");

      if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {

        document.getElementById("displayEmail").textContent =
          newEmail.trim();

        sessionStorage.setItem("vorvenaEmail", newEmail.trim());

      }

    });

  // CHANGE PHONE
  document.getElementById("changePhone")
    .addEventListener("click", () => {

      const newPhone = prompt("Enter your phone number:");

      if (newPhone && newPhone.trim()) {

        document.getElementById("displayPhone").textContent =
          newPhone.trim();

        sessionStorage.setItem("vorvenaPhone", newPhone.trim());

      }

    });

  // BACK TO EMAIL
  document.getElementById("backToEmail")
    .addEventListener("click", () => {
      showStep(emailStep);
    });

  // CONTINUE
  document.getElementById("continueBtn")
    .addEventListener("click", () => {

      alert("Demo verification complete! Next step: account onboarding.");

    });

  // START
  showStep(emailStep);

});
