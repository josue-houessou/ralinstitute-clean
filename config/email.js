const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // GoDaddy’s SMTP server (Office 365 for custom domains)
    port: 587, // Port for TLS
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER, // Should be your email address, e.g., paul-marie@ralinstitute.org
        pass: process.env.EMAIL_PASSWORD // Your email password from the .env file
    }
});

module.exports = transporter;
