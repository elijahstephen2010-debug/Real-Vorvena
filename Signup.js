
document.addEventListener("DOMContentLoaded", () => {

    const roleSelection = document.getElementById("roleSelection");
    const clientForm = document.getElementById("clientForm");
    const professionalForm = document.getElementById("professionalForm");

    // SELECT ACCOUNT ROLE
    window.selectRole = function (role) {

        roleSelection.hidden = true;

        if (role === "client") {
            clientForm.hidden = false;
            professionalForm.hidden = true;
        }

        if (role === "professional") {
            professionalForm.hidden = false;
            clientForm.hidden = true;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // GO BACK TO ROLE SELECTION
    window.goBack = function () {

        clientForm.hidden = true;
        professionalForm.hidden = true;
        roleSelection.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // CHECK IF ROLE WAS SELECTED FROM LANDING PAGE
    const params = new URLSearchParams(window.location.search);
    const selectedRole = params.get("role");

    if (selectedRole === "client" || selectedRole === "professional") {
        window.selectRole(selectedRole);
    }

    // HANDLE FORM VALIDATION
    function handleSignup(form, role) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const password = form.querySelector(
                'input[name="password"]'
            ).value;

            const confirmPassword = form.querySelector(
                'input[name="confirmPassword"]'
            ).value;

            if (password.length < 8) {
                alert("Password must contain at least 8 characters.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Your passwords do not match.");
                return;
            }

            alert(
                `${role} signup form validated successfully! Backend authentication is not connected yet.`
            );

        });
    }

    handleSignup(clientForm, "Client");
    handleSignup(professionalForm, "Professional");

});
