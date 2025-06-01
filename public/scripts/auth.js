// Registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            updateAuthUI(true);
            alert('Registration successful!');
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});

// Update UI based on auth state
function updateAuthUI(isLoggedIn) {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.textContent = isLoggedIn ? 'Sign Out' : 'Sign Up';
        authBtn.onclick = isLoggedIn ? logout : () => window.location.href = '/signup.html';
    }
}

// Check auth state on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    updateAuthUI(!!token);
});