
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const form = $("onboardingForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const pages = [...document.querySelectorAll(".form-step")];
  const stepButtons = [...document.querySelectorAll(".step-item")];

  const PASS_MARK = 70;

  let currentStep = 0;
  let profileImageUrl = "";
  let assessmentAnswers = {};
  let assessmentPassed = false;
  let assessmentCompleted = false;
  let assessedRole = "";
  let currentQuestion = 0;
  let quiz = [];
  let finished = false;

  const readStore = (key) => {
    try {
      return sessionStorage.getItem(key) || "";
    } catch {
      return "";
    }
  };

  const writeStore = (key, value) => {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Demo continues if browser storage is unavailable.
    }
  };

  const scrollBehavior = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  $("year").textContent = new Date().getFullYear();

  // PREFILL DETAILS FROM SIGNUP

  $("fullName").value = readStore("vorvenaFullName");
  $("email").value = readStore("vorvenaEmail");
  $("phone").value = readStore("vorvenaPhone");
  $("country").value = readStore("vorvenaCountry");
  $("city").value = readStore("vorvenaCity");

  // PROFILE PHOTO

  const pictureInput = $("profilePicture");

  function choosePicture() {
    pictureInput.click();
  }

  $("photoButton").addEventListener("click", choosePicture);
  $("uploadPhoto").addEventListener("click", choosePicture);

  pictureInput.addEventListener("change", () => {
    const file = pictureInput.files[0];

    $("photoError").textContent = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      $("photoError").textContent =
        "Please select a JPG, PNG or WEBP image.";

      pictureInput.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      $("photoError").textContent =
        "Image must be smaller than 5MB.";

      pictureInput.value = "";
      return;
    }

    if (profileImageUrl) {
      URL.revokeObjectURL(profileImageUrl);
    }

    profileImageUrl = URL.createObjectURL(file);

    $("profilePreview").src = profileImageUrl;
    $("profilePreview").hidden = false;
    $("avatarPlaceholder").hidden = true;
  });

  $("removePhoto").addEventListener("click", () => {
    if (profileImageUrl) {
      URL.revokeObjectURL(profileImageUrl);
    }

    profileImageUrl = "";
    pictureInput.value = "";

    $("profilePreview").src = "";
    $("profilePreview").hidden = true;
    $("avatarPlaceholder").hidden = false;
    $("photoError").textContent = "";
  });

  // ASSESSMENT QUESTIONS

  const questionBank = [
    {
      question: "Which language is primarily used to add interactivity to web pages?",
      options: ["HTML", "CSS", "JavaScript", "SQL"],
      answer: 2
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Program Internet",
        "Applied Program Integration",
        "Application Process Information"
      ],
      answer: 0
    },
    {
      question: "Which of these is used to store structured data?",
      options: ["Database", "Browser", "Monitor", "Keyboard"],
      answer: 0
    },
    {
      question: "What does HTML mainly define?",
      options: [
        "Website structure",
        "Database security",
        "Server hardware",
        "Network speed"
      ],
      answer: 0
    },
    {
      question: "Which of these is a version control system?",
      options: ["Git", "Figma", "Chrome", "Photoshop"],
      answer: 0
    },
    {
      question: "What does CSS control?",
      options: [
        "Website presentation and styling",
        "Database records",
        "Server memory",
        "Email delivery"
      ],
      answer: 0
    },
    {
      question: "What is responsive design?",
      options: [
        "A design that adapts to different screen sizes",
        "A design that only works on desktops",
        "A type of database",
        "A programming language"
      ],
      answer: 0
    },
    {
      question: "What is debugging?",
      options: [
        "Finding and fixing errors",
        "Creating a logo",
        "Uploading a website",
        "Writing a document"
      ],
      answer: 0
    },
    {
      question: "What does UX stand for?",
      options: [
        "User Experience",
        "Universal Extension",
        "User Execution",
        "Unified Exchange"
      ],
      answer: 0
    },
    {
      question: "What is the main purpose of testing software?",
      options: [
        "To identify problems and check expected behaviour",
        "To change the computer screen",
        "To increase file size",
        "To remove the internet"
      ],
      answer: 0
    }
  ];

  function shuffled(list) {
    const copy = [...list];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function buildQuiz() {
    return questionBank.map((item) => {
      const options = shuffled(
        item.options.map((text, index) => ({
          text,
          correct: index === item.answer
        }))
      );

      return {
        question: item.question,
        options: options.map((option) => option.text),
        answer: options.findIndex((option) => option.correct)
      };
    });
  }

  function resetAssessment() {
    quiz = [];
    assessmentAnswers = {};
    assessmentCompleted = false;
    assessmentPassed = false;
    assessedRole = "";
    currentQuestion = 0;

    $("assessmentArea").hidden = true;
    $("assessmentResult").hidden = true;
    $("assessmentIntro").hidden = false;
  }

  function startAssessment() {
    if (!$("role").value) {
      alert("Please select your professional role first.");
      return;
    }

    quiz = buildQuiz();
    assessedRole = $("role").value;

    assessmentAnswers = {};
    assessmentCompleted = false;
    assessmentPassed = false;
    currentQuestion = 0;

    $("assessmentIntro").hidden = true;
    $("assessmentResult").hidden = true;
    $("assessmentArea").hidden = false;

    renderQuestion();
  }

  $("startAssessment").addEventListener("click", startAssessment);

  $("role").addEventListener("change", () => {
    if (quiz.length || assessmentCompleted) {
      resetAssessment();
    }
  });

  function renderQuestion() {
    const question = quiz[currentQuestion];

    $("questionCounter").textContent =
      `Question ${currentQuestion + 1} of ${quiz.length}`;

    $("assessmentScore").textContent =
      `${Object.keys(assessmentAnswers).length} answered`;

    $("assessmentProgress").style.width =
      `${((currentQuestion + 1) / quiz.length) * 100}%`;

    $("questionText").textContent = question.question;
    $("assessmentError").textContent = "";
    $("answerOptions").innerHTML = "";

    question.options.forEach((option, index) => {
      const label = document.createElement("label");

      label.className = "answer-option";

      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = "skillAnswer";
      radio.value = index;
      radio.checked = assessmentAnswers[currentQuestion] === index;

      const text = document.createElement("span");

      text.textContent = option;

      if (radio.checked) {
        label.classList.add("selected");
      }

      radio.addEventListener("change", () => {
        assessmentAnswers[currentQuestion] = index;

        $("assessmentError").textContent = "";

        $("assessmentScore").textContent =
          `${Object.keys(assessmentAnswers).length} answered`;

        $("answerOptions")
          .querySelectorAll(".answer-option")
          .forEach((item, i) => {
            item.classList.toggle("selected", i === index);
          });
      });

      label.append(radio, text);

      $("answerOptions").appendChild(label);
    });

    $("previousQuestion").disabled = currentQuestion === 0;

    $("nextQuestion").textContent =
      currentQuestion === quiz.length - 1
        ? "Finish assessment"
        : "Next question →";
  }

  $("previousQuestion").addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });

  $("nextQuestion").addEventListener("click", () => {
    if (assessmentAnswers[currentQuestion] === undefined) {
      $("assessmentError").textContent =
        "Please select an answer.";

      return;
    }

    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      finishAssessment();
    }
  });

  function finishAssessment() {
    let score = 0;

    quiz.forEach((question, index) => {
      if (assessmentAnswers[index] === question.answer) {
        score++;
      }
    });

    const percentage = Math.round(
      (score / quiz.length) * 100
    );

    assessmentPassed = percentage >= PASS_MARK;
    assessmentCompleted = true;

    $("assessmentArea").hidden = true;
    $("assessmentResult").hidden = false;

    $("resultScore").textContent = `${percentage}%`;

    $("resultTitle").textContent = assessmentPassed
      ? "You passed the assessment!"
      : "Assessment not passed";

    $("resultDescription").textContent = assessmentPassed
      ? "You reached the proposed SkillProof pass mark."
      : `You did not reach the proposed ${PASS_MARK}% pass mark. You can retake this demo assessment.`;

    $("resultIcon").textContent = assessmentPassed ? "✓" : "↻";
  }

  $("retakeAssessment").addEventListener(
    "click",
    resetAssessment
  );

  // IDENTITY DOCUMENT

  const MAX_DOC_SIZE = 5 * 1024 * 1024;

  const DOC_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
  ];

  const docs = {
    front: null,
    back: null
  };

  const docUrls = {
    front: "",
    back: ""
  };

  let lastDocType = "";

  function needsBack() {
    return $("documentType").value !== "Passport";
  }

  function sidesRequired() {
    return needsBack()
      ? ["front", "back"]
      : ["front"];
  }

  function updateDocumentType() {
    const type = $("documentType").value;

    if (type !== lastDocType) {
      clearSide("front");
      clearSide("back");

      $("ninNumber").value = "";
      $("identityConsent").checked = false;

      lastDocType = type;
    }

    $("ninField").hidden = type !== "NIN";
    $("docSides").hidden = !type;
    $("backCard").hidden = !needsBack();

    $("frontTitle").textContent =
      type === "Passport"
        ? "Photo page of passport"
        : "Front of document";

    $("docHint").textContent =
      type === "Passport"
        ? "Add a clear photo of the page with your picture and details."
        : "Add a clear photo of the front and the back. Make sure all four corners and all text are visible.";
  }

  function renderSide(side) {
    const file = docs[side];

    const preview = $(`${side}Preview`);
    const card = preview.closest(".doc-card");

    preview.replaceChildren();

    if (!file) {
      const empty = document.createElement("div");

      empty.className = "doc-empty";

      const icon = document.createElement("span");
      icon.className = "doc-empty-icon";
      icon.textContent = "🪪";

      const message = document.createElement("small");
      message.textContent = "No image yet";

      empty.append(icon, message);
      preview.appendChild(empty);
    } else if (file.type === "application/pdf") {
      const box = document.createElement("div");

      box.className = "doc-pdf";

      const label = document.createElement("strong");
      label.textContent = "PDF";

      const name = document.createElement("small");
      name.textContent = file.name;

      box.append(label, name);
      preview.appendChild(box);
    } else {
      const img = document.createElement("img");

      img.src = docUrls[side];
      img.alt = `${side} of identity document`;

      preview.appendChild(img);
    }

    card.classList.toggle("has-file", Boolean(file));

    $(`${side}Status`).textContent =
      file ? "Added ✓" : "Required";

    $(`${side}Actions`).hidden = Boolean(file);
    $(`${side}Done`).hidden = !file;
  }

  function clearSide(side) {
    if (docUrls[side]) {
      URL.revokeObjectURL(docUrls[side]);
    }

    docUrls[side] = "";
    docs[side] = null;

    $(`${side}File`).value = "";
    $(`${side}Error`).textContent = "";

    renderSide(side);
  }

  function setSide(side, file) {
    $(`${side}Error`).textContent = "";

    if (!DOC_TYPES.includes(file.type)) {
      $(`${side}Error`).textContent =
        "Choose an image or PDF document.";

      return false;
    }

    if (file.size > MAX_DOC_SIZE) {
      $(`${side}Error`).textContent =
        "The file must be smaller than 5MB.";

      return false;
    }

    if (docUrls[side]) {
      URL.revokeObjectURL(docUrls[side]);
    }

    docs[side] = file;
    docUrls[side] = URL.createObjectURL(file);

    renderSide(side);

    return true;
  }

  $("documentType").addEventListener(
    "change",
    updateDocumentType
  );

  // Initialize document fields immediately.
  updateDocumentType();

  $("ninNumber").addEventListener("input", (event) => {
    event.target.value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 11);
  });

  ["front", "back"].forEach((side) => {
    $(`${side}File`).addEventListener("change", () => {
      const file = $(`${side}File`).files[0];

      if (!file) return;

      const ok = setSide(side, file);

      if (!ok) {
        $(`${side}File`).value = "";
      }
    });
  });

  $("docSides").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const side = button.dataset.side;

    if (button.dataset.action === "upload") {
      $(`${side}File`).click();
    }

    if (button.dataset.action === "capture") {
      openCamera(side);
    }

    if (button.dataset.action === "remove") {
      clearSide(side);
    }
  });

  // LIVE CAMERA CAPTURE

  let camStream = null;
  let camSide = null;
  let camRequest = 0;
  let camTrigger = null;

  function showCamError(message) {
    $("camError").textContent = message;
    $("camError").hidden = false;
    $("camSnap").disabled = true;
  }

  async function openCamera(side) {
    camSide = side;
    camTrigger = document.activeElement;

    const request = ++camRequest;

    const label = side === "front"
      ? (
          $("documentType").value === "Passport"
            ? "photo page"
            : "front of document"
        )
      : "back of document";

    $("camTitle").textContent = `Capture ${label}`;
    $("camError").hidden = true;
    $("camSnap").disabled = false;
    $("camOverlay").hidden = false;

    $("camCancel").focus();

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      !window.isSecureContext
    ) {
      showCamError(
        "Live capture needs a secure page (https or localhost). Please use Upload instead."
      );

      return;
    }

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });

      if (request !== camRequest) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      camStream = stream;

      $("camVideo").srcObject = stream;

      await $("camVideo").play().catch(() => {});
    } catch (error) {
      if (request !== camRequest) return;

      if (
        error.name === "NotAllowedError" ||
        error.name === "SecurityError"
      ) {
        showCamError(
          "Camera access was denied. Allow camera permission in your browser settings, or use Upload instead."
        );
      } else if (
        error.name === "NotFoundError" ||
        error.name === "OverconstrainedError"
      ) {
        showCamError(
          "No camera was found on this device. Please use Upload instead."
        );
      } else if (error.name === "NotReadableError") {
        showCamError(
          "The camera is being used by another app. Close it and try again."
        );
      } else {
        showCamError(
          "Could not start the camera. Please use Upload instead."
        );
      }
    }
  }

  function closeCamera() {
    camRequest++;

    if (camStream) {
      camStream.getTracks().forEach((track) => track.stop());
    }

    camStream = null;

    $("camVideo").srcObject = null;
    $("camOverlay").hidden = true;

    camSide = null;

    if (camTrigger && document.contains(camTrigger)) {
      camTrigger.focus();
    }

    camTrigger = null;
  }

  $("camSnap").addEventListener("click", () => {
    const video = $("camVideo");

    if (!camStream || !video.videoWidth) {
      showCamError(
        "The camera is not ready yet. Please wait a moment."
      );

      return;
    }

    const canvas = $("camCanvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      showCamError("Could not capture the photo. Please try again.");
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const side = camSide;

    canvas.toBlob(async (blob) => {
      if (!blob) {
        showCamError(
          "Could not capture the photo. Please try again."
        );

        return;
      }

      const file = new File(
        [blob],
        `${side}-capture.jpg`,
        { type: "image/jpeg" }
      );

      closeCamera();

      setSide(side, file);
    }, "image/jpeg", 0.92);
  });

  $("camClose").addEventListener("click", closeCamera);
  $("camCancel").addEventListener("click", closeCamera);

  document.addEventListener("keydown", (event) => {
    if ($("camOverlay").hidden) return;

    if (event.key === "Escape") {
      closeCamera();
      return;
    }

    if (event.key !== "Tab") return;

    const items = [
      ...$("camOverlay").querySelectorAll(
        "button:not([disabled])"
      )
    ];

    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    const outside = !$("camOverlay").contains(
      document.activeElement
    );

    if (
      outside ||
      (event.shiftKey && document.activeElement === first)
    ) {
      event.preventDefault();

      (event.shiftKey ? last : first).focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("pagehide", closeCamera);

  // VALIDATION

  function validUrl(value) {
    if (!value.trim()) return true;

    try {
      const url = new URL(value);

      return (
        url.protocol === "https:" ||
        url.protocol === "http:"
      );
    } catch {
      return false;
    }
  }

  function validateStep(step) {
    const requiredIds = {
      0: [
        "fullName",
        "email",
        "phone",
        "country",
        "city",
        "bio"
      ],
      1: [
        "role",
        "experience"
      ],
      2: [
        "skills",
        "socialLink"
      ],
      3: [],
      4: [
        "documentType"
      ],
      5: []
    };

    for (const id of requiredIds[step]) {
      const field = $(id);

      if (!field.value.trim()) {
        field.focus();

        alert(
          "Please complete all required fields before continuing."
        );

        return false;
      }

      if (!field.checkValidity()) {
        field.focus();
        field.reportValidity();

        return false;
      }
    }

    if (step === 0) {
      const digits = $("phone").value.replace(/\D/g, "").length;

      if (digits < 7 || digits > 15) {
        $("phone").focus();

        alert("Please enter a valid phone number.");

        return false;
      }
    }

    if (step === 2) {
      if (
        !$("skills").value
          .split(",")
          .some((skill) => skill.trim())
      ) {
        $("skills").focus();

        alert("Please add at least one skill.");

        return false;
      }

      if (
        !validUrl($("portfolio").value) ||
        !validUrl($("socialLink").value)
      ) {
        alert(
          "Please enter valid website links beginning with http:// or https://."
        );

        return false;
      }
    }

    if (
      step === 3 &&
      (
        !assessmentCompleted ||
        !assessmentPassed ||
        assessedRole !== $("role").value
      )
    ) {
      alert(
        "Please complete and pass the SkillProof demo assessment before continuing."
      );

      return false;
    }

    if (step === 4) {
      if (
        $("documentType").value === "NIN" &&
        $("ninNumber").value.length !== 11
      ) {
        alert("Please enter an 11-digit NIN for this demo.");

        $("ninNumber").focus();

        return false;
      }

      let missing = false;

      sidesRequired().forEach((side) => {
        if (!docs[side]) {
          $(`${side}Error`).textContent =
            side === "front" && !needsBack()
              ? "Please add the photo page of your passport."
              : `Please add the ${side} of your document.`;

          missing = true;
        }
      });

      if (missing) return false;

      if (!$("identityConsent").checked) {
        alert(
          "Please confirm that your identity information is accurate."
        );

        return false;
      }
    }

    if (step === 5 && !$("finalConsent").checked) {
      alert("Please confirm your profile information.");

      return false;
    }

    return true;
  }

  // REVIEW DETAILS

  function updateReview() {
    const name =
      $("fullName").value.trim() || "Your name";

    const role =
      $("role").value || "Your professional role";

    $("reviewName").textContent = name;
    $("reviewRole").textContent = role;

    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");

    $("reviewInitials").textContent = initials || "VP";

    if (profileImageUrl) {
      $("reviewPhoto").src = profileImageUrl;
      $("reviewPhoto").hidden = false;
      $("reviewInitials").hidden = true;
    } else {
      $("reviewPhoto").hidden = true;
      $("reviewInitials").hidden = false;
    }

    const docSummary = needsBack()
      ? `${$("documentType").value} (front and back added)`
      : `${$("documentType").value} (photo page added)`;

    const rows = [
      ["Email", $("email").value],
      ["Phone", $("phone").value],
      [
        "Location",
        `${$("city").value}, ${$("country").value}`
      ],
      ["Bio", $("bio").value],
      ["Role", $("role").value],
      ["Experience", $("experience").value],
      ["Years", $("years").value || "Not provided"],
      [
        "Specialization",
        $("specialization").value || "Not provided"
      ],
      ["Skills", $("skills").value],
      [
        "Portfolio",
        $("portfolio").value || "Not provided"
      ],
      ["Social link", $("socialLink").value],
      ["SkillProof", "Passed demo assessment"],
      ["Identity document", docSummary]
    ];

    $("reviewList").innerHTML = "";

    rows.forEach(([label, value]) => {
      const row = document.createElement("div");

      row.className = "review-item";

      const labelElement = document.createElement("span");
      labelElement.textContent = label;

      const valueElement = document.createElement("span");
      valueElement.textContent = value || "Not provided";

      row.append(labelElement, valueElement);

      $("reviewList").appendChild(row);
    });
  }

  // PAGE NAVIGATION

  function showStep(step, scroll = true) {
    currentStep = step;

    pages.forEach((page, index) => {
      page.classList.toggle("active", index === step);
    });

    stepButtons.forEach((button, index) => {
      button.classList.toggle("active", index === step);
      button.classList.toggle("completed", index < step);

      if (index === step) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    const percentage = Math.round(
      (step / pages.length) * 100
    );

    $("progressFill").style.width = `${percentage}%`;
    $("progressPercent").textContent = `${percentage}%`;

    $("backButton").disabled = step === 0;

    $("continueButton").textContent =
      step === pages.length - 1
        ? "Complete setup →"
        : "Continue →";

    if (step === 5) {
      updateReview();
    }

    if (scroll) {
      window.scrollTo({
        top: 0,
        behavior: scrollBehavior()
      });
    }
  }

  $("continueButton").addEventListener("click", () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < pages.length - 1) {
      showStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  });

  $("backButton").addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });

  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (!finished && index < currentStep) {
        showStep(index);
      }
    });
  });

  // COMPLETE DEMO ONBOARDING

  function completeOnboarding() {
    const profileData = {
      fullName: $("fullName").value.trim(),
      email: $("email").value.trim(),
      phone: $("phone").value.trim(),
      country: $("country").value.trim(),
      city: $("city").value.trim(),
      bio: $("bio").value.trim(),
      role: $("role").value,
      experience: $("experience").value,
      years: $("years").value,
      specialization: $("specialization").value.trim(),
      skills: $("skills").value.trim(),
      portfolio: $("portfolio").value.trim(),
      socialLink: $("socialLink").value.trim(),
      skillProofPassed: assessmentPassed,
      identityDocumentType: $("documentType").value,
      identityDocumentSides: sidesRequired(),
      onboardingStatus: "demo-completed"
    };

    // Demo only: identity images and NIN are not stored in browser storage.

    writeStore(
      "vorvenaProfessionalProfile",
      JSON.stringify(profileData)
    );

    writeStore("vorvenaOnboardingComplete", "true");

    if (profileImageUrl) {
      URL.revokeObjectURL(profileImageUrl);
      profileImageUrl = "";
    }

    ["front", "back"].forEach((side) => {
      if (docUrls[side]) {
        URL.revokeObjectURL(docUrls[side]);
      }

      docUrls[side] = "";
      docs[side] = null;
    });

    finished = true;

    stepButtons.forEach((button) => {
      button.classList.remove("active");
      button.classList.add("completed");
      button.removeAttribute("aria-current");
    });

    $("progressFill").style.width = "100%";
    $("progressPercent").textContent = "100%";

    $("onboardingForm").hidden = true;
    $("completionScreen").hidden = false;

    window.scrollTo({
      top: 0,
      behavior: scrollBehavior()
    });
  }

  // INITIAL PAGE

  showStep(0, false);
});
