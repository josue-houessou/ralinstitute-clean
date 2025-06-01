   // Open and close modal
        document.getElementById("openModal").onclick = function () {
            document.getElementById("myModal").style.display = "block";
        };

        document.querySelector(".close").onclick = function () {
            document.getElementById("myModal").style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target == document.getElementById("myModal")) {
                document.getElementById("myModal").style.display = "none";
            }
        };

        // Form Validation
        document.getElementById("researchForm").onsubmit = function (event) {
            event.preventDefault(); // Prevent form submission

            let isValid = true;

            // Regex patterns
            let namePattern = /^[A-Za-z\s'-]+$/;
            let professionPattern = /^[A-Za-z\s'-]+$/;
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Get form values
            let name = document.getElementById("name").value.trim();
            let profession = document.getElementById("profession").value.trim();
            let email = document.getElementById("email").value.trim();

            // Validate Name
            if (!namePattern.test(name) || name.length < 3) {
                document.getElementById("nameError").style.display = "block";
                isValid = false;
            } else {
                document.getElementById("nameError").style.display = "none";
            }

            // Validate Profession
            if (!professionPattern.test(profession) || profession.length < 3) {
                document.getElementById("professionError").style.display = "block";
                isValid = false;
            } else {
                document.getElementById("professionError").style.display = "none";
            }

            // Validate Email
            if (!emailPattern.test(email)) {
                document.getElementById("emailError").style.display = "block";
                isValid = false;
            } else {
                document.getElementById("emailError").style.display = "none";
            }

            // If all inputs are valid, submit the form (or handle backend request)
            if (isValid) {
                alert("Your application has been submitted. You will be contacted via email.");
                document.getElementById("myModal").style.display = "none";
                document.getElementById("researchForm").reset();
            }

            const telephoneInput = document.getElementById("telephone");
            const telephoneError = document.getElementById("telephoneError");

            // Regex for a valid international phone number (e.g., +1234567890)
            const telephoneRegex = /^\+?[1-9]\d{1,14}$/;

            if (!telephoneRegex.test(telephoneInput.value.trim())) {
                telephoneError.style.display = "block";
                isValid = false;
            } else {
                telephoneError.style.display = "none";
            }

        };