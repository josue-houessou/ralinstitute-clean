// Process payment functions
        function processFedaPay() {
            alert('Redirecting to FedaPay for secure payment...');
            // Redirect to FedaPay checkout URL
            window.location.href = "https://your-fedapay-url.com";
        }

        function processPayPal() {
            alert('Redirecting to PayPal for secure payment...');
            // Redirect to PayPal checkout URL
            window.location.href = "https://paypal.com";
        }

        function processStripe() {
            alert('Redirecting to Stripe for secure payment...');
            // Redirect to Stripe checkout URL
            window.location.href = "https://stripe.com";
        }