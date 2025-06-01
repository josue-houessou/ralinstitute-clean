function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.first_name?.trim()) {
        errors.first_name = 'First name is required';
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Valid email is required';
    }
    
    // Add other field validations as needed
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Usage in form submission:
document.getElementById('any-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        first_name: document.getElementById('first_name').value,
        email: document.getElementById('email').value
        // other fields...
    };
    
    const { isValid, errors } = validateForm(formData);
    
    if (!isValid) {
        // Display errors to user
        Object.entries(errors).forEach(([field, message]) => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = message;
            }
        });
        return;
    }
    
    // Proceed with form submission
});