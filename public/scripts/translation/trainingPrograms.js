 // Accordion JS 
        
        // Pop up forms 

            function showForm() {
                document.getElementById('form-popup').style.display = 'block';
            }

            function closeForm() {
                document.getElementById('form-popup').style.display = 'none';
            }

            function validateForm(event) {
                event.preventDefault();

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;

                const nameRegex = /^[a-zA-Z ]+$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!nameRegex.test(name)) {
                    alert('Please enter a valid name.');
                    return;
                }

                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                alert('Thank you for your interest! We will contact you shortly.');
                closeForm();
            }
    