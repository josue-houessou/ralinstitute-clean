    const form = document.getElementById('auth-form');
    const message = document.getElementById('message');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const mode = document.getElementById('mode').value;

      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          message.textContent = data.message || 'Something went wrong.';
          message.style.color = 'red';
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);
          message.textContent = 'Success! Redirecting...';
          message.style.color = 'green';
          window.location.href = '/'; // Redirect to homepage
        }
      } catch (error) {
        console.error('Error:', error);
        message.textContent = 'Network error.';
        message.style.color = 'red';
      }
    });
