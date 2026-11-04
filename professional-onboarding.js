document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const form = $("onboardingForm");
  const pages = [...document.querySelectorAll(".form-step")];
  const stepButtons = [...document.querySelectorAll(".step-item")];

  let currentStep = 0;
  let profileImageUrl = "";
  let assessmentAnswers = {};
  let assessmentPassed = false;
  let assessmentCompleted = false;
  let currentQuestion = 0;
  let selectedDocument = null;

  $("year").textContent = new Date().getFullYear();

  // PREFILL DETAILS FROM SIGNUP
  $("fullName").value = sessionStorage.getItem("vorvenaFullName") || "";
  $("email").value = sessionStorage.getItem("vorvenaEmail") || "";
  $("phone").value = sessionStorage.getItem("vorvenaPhone") || "";
  $("country").value = sessionStorage.getItem("vorvenaCountry") || "";
  $("city").value = sessionStorage.getItem("vorvenaCity") || "";

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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      $("photoError").textContent = "Please select a JPG, PNG or WEBP image.";
      pictureInput.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      $("photoError").textContent = "Image must be smaller than 5MB.";
      pictureInput.value = "";
      return;
    }

    if (profileImageUrl) URL.revokeObjectURL(profileImageUrl);

    profileImageUrl = URL.createObjectURL(file);

    $("profilePreview").src = profileImageUrl;
    $("profilePreview").hidden = false;
    $("avatarPlaceholder").hidden = true;
  });

  $("removePhoto").addEventListener("click", () => {
    if (profileImageUrl) URL.revokeObjectURL(profileImageUrl);

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

  function startAssessment() {
    if (!$("role").value) {
      alert("Please select your professional role first.");
      return;
    }

    currentQuestion = 0;
    assessmentAnswers = {};

    $("assessmentIntro").hidden = true;
    $("assessmentResult").hidden = true;
    $("assessmentArea").hidden = false;

    renderQuestion();
  }

  $("startAssessment").addEventListener("click", startAssessment);

  function renderQuestion() {
    const question = questionBank[currentQuestion];

    $("questionCounter").textContent =
      `Question ${currentQuestion + 1} of ${questionBank.length}`;

    $("assessmentScore").textContent =
      `${Object.keys(assessmentAnswers).length} answered`;

    $("assessmentProgress").style.width =
      `${((currentQuestion + 1) / questionBank.length) * 100}%`;

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

      if (radio.checked) label.classList.add("selected");

      radio.addEventListener("change", () => {
        assessmentAnswers[currentQuestion] = index;
        renderQuestion();
      });

      label.append(radio, text);
      $("answerOptions").appendChild(label);
    });

    $("previousQuestion").disabled = currentQuestion === 0;

    $("nextQuestion").textContent =
      currentQuestion === questionBank.length - 1
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
      $("assessmentError").textContent = "Please select an answer.";
      return;
    }

    if (currentQuestion < questionBank.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      finishAssessment();
    }
  });

  function finishAssessment() {
    let score = 0;

    questionBank.forEach((question, index) => {
      if (assessmentAnswers[index] === question.answer) score++;
    });

    const percentage = Math.round((score / questionBank.length) * 100);

    assessmentPassed = percentage >= 70;
    assessmentCompleted = true;

    $("assessmentArea").hidden = true;
    $("assessmentResult").hidden = false;

    $("resultScore").textContent = `${percentage}%`;

    $("resultTitle").textContent = assessmentPassed
      ? "You passed the assessment!"
      : "Assessment not passed";

    $("resultDescription").textContent = assessmentPassed
      ? "You reached the proposed SkillProof pass mark."
      : "You did not reach the proposed 70% pass mark. You can retake this demo assessment.";

    $("resultIcon").textContent = assessmentPassed ? "✓" : "↻";
  }

  $("retakeAssessment").addEventListener("click", () => {
    assessmentCompleted = false;
    assessmentPassed = false;
    $("assessmentResult").hidden = true;
    $("assessmentIntro").hidden = false;
  });

  // IDENTITY DOCUMENT
  $("documentType").addEventListener("change", () => {
    $("ninField").hidden = $("documentType").value !== "NIN";
  });

  $("ninNumber").addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 11);
  });

  $("documentUpload").addEventListener("click", () => {
    $("identityFile").click();
  });

  $("identityFile").addEventListener("change", () => {
    const file = $("identityFile").files[0];

    $("documentError").textContent = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf"
    ];

    if (!allowedTypes.includes(file.type)) {
      $("documentError").textContent = "Choose an image or PDF document.";
      $("identityFile").value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      $("documentError").textContent = "The document must be smaller than 5MB.";
      $("identityFile").value = "";
      return;
    }

    selectedDocument = file;
    $("documentFileName").textContent = file.name;
  });

  // VALIDATION
  function validUrl(value) {
    if (!value.trim()) return true;

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  function validateStep(step) {
    const requiredIds = {
      0: ["fullName", "email", "phone", "country", "city", "bio"],
      1: ["role", "experience"],
      2: ["skills", "socialLink"],
      3: [],
      4: ["documentType"],
      5: []
    };

    for (const id of requiredIds[step]) {
      const field = $(id);

      if (!field.value.trim()) {
        field.focus();
        alert("Please complete all required fields before continuing.");
        return false;
      }

      if (!field.checkValidity()) {
        field.focus();
        field.reportValidity();
        return false;
      }
    }

    if (step === 2) {
      if (!validUrl($("portfolio").value) ||
          !validUrl($("socialLink").value)) {
        alert("Please enter valid website links beginning with http:// or https://.");
        return false;
      }
    }

    if (step === 3 && (!assessmentCompleted || !assessmentPassed)) {
      alert("Please complete and pass the SkillProof demo assessment before continuing.");
      return false;
    }

    if (step === 4) {
      if (!$("identityFile").files.length) {
        $("documentError").textContent = "Please choose an identity document.";
        return false;
      }

      if ($("documentType").value === "NIN" &&
          $("ninNumber").value.length !== 11) {
        alert("Please enter an 11-digit NIN for this demo.");
        $("ninNumber").focus();
        return false;
      }

      if (!$("identityConsent").checked) {
        alert("Please confirm that your identity information is accurate.");
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
    const name = $("fullName").value.trim() || "Your name";
    const role = $("role").value || "Your professional role";

    $("reviewName").textContent = name;
    $("reviewRole").textContent = role;

    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
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

    const rows = [
      ["Email", $("email").value],
      ["Phone", $("phone").value],
      ["Location", `${$("city").value}, ${$("country").value}`],
      ["Bio", $("bio").value],
      ["Role", $("role").value],
      ["Experience", $("experience").value],
      ["Years", $("years").value || "Not provided"],
      ["Specialization", $("specialization").value || "Not provided"],
      ["Skills", $("skills").value],
      ["Portfolio", $("portfolio").value || "Not provided"],
      ["Social link", $("socialLink").value],
      ["SkillProof", "Passed demo assessment"],
      ["Identity document", $("documentType").value]
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
  function showStep(step) {
    currentStep = step;

    pages.forEach((page, index) => {
      page.classList.toggle("active", index === step);
    });

    stepButtons.forEach((button, index) => {
      button.classList.toggle("active", index === step);
      button.classList.toggle("completed", index < step);
    });

    const percentage = Math.round(((step + 1) / pages.length) * 100);

    $("progressFill").style.width = `${percentage}%`;
    $("progressPercent").textContent = `${percentage}%`;

    $("backButton").disabled = step === 0;

    $("continueButton").textContent =
      step === pages.length - 1 ? "Complete setup →" : "Continue →";

    if (step === 5) updateReview();

    window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (currentStep > 0) showStep(currentStep - 1);
  });

  // Allow users to return to earlier steps from the progress menu.
  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index < currentStep) showStep(index);
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
      onboardingStatus: "demo-completed"
    };

    // Demo only: do not store identity documents or NIN in browser storage.
    sessionStorage.setItem("vorvenaProfessionalProfile", JSON.stringify(profileData));
    sessionStorage.setItem("vorvenaOnboardingComplete", "true");

    $("onboardingForm").hidden = true;
    $("completionScreen").hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  showStep(0);
});