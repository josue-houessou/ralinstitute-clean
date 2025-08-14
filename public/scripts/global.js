// Load the header and footer dynamically on every page
document.addEventListener("DOMContentLoaded", function () {
    fetch("/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
});


// Hamburger like navigation
document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Check if elements exist to prevent errors
    if (!hamburger || !navMenu) {
        console.error("Error: Hamburger or navMenu not found!");
        return;
    }

    // Add click event to toggle menu
    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        // Debugging: Check if class is being added
        console.log("Hamburger clicked. Active class:", navMenu.classList.contains("active"));
    });
});




// Sign up js
  const signupBtn = document.getElementById('signup-btn');
  const token = localStorage.getItem('token');

  if (token) {
    // ✅ User is logged in, change button to "Log out"
    signupBtn.textContent = 'Log out';
    signupBtn.href = '#';
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      alert('You have been logged out.');
      window.location.reload(); // refresh the page to reset UI
    });
  } else {
    // ❌ Not logged in
    signupBtn.textContent = 'Sign up';
    signupBtn.href = '/signup.html';
  }



  