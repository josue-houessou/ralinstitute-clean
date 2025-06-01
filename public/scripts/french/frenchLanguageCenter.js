 const menuToggle = document.getElementById('menuToggle');
        const sidebarCard = document.getElementById('sidebarCard');

        menuToggle.addEventListener('click', () => {
            sidebarCard.classList.toggle('active'); // Show/hide the sidebar
        });

        // Optional: Close sidebar when clicking outside it (on small screens)
        document.addEventListener('click', (e) => {
            if (!sidebarCard.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebarCard.classList.remove('active'); // Close sidebar if clicked outside
            }
        });