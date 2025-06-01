 // Dropdown functionality
        document.querySelectorAll('.dropdown-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                this.classList.toggle('active');
                const dropdownContent = this.nextElementSibling;
                dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
            });
        });

        // Highlight active menu item
        const currentUrl = window.location.pathname;
        document.querySelectorAll('.sidenav a').forEach(link => {
            if (link.getAttribute('href') === currentUrl) {
                link.classList.add('active');
            }
        });