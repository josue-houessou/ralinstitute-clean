const db = require('../config/db');
const transporter = require('../config/email');

exports.submitRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const [result] = await db.execute(
            'INSERT INTO conference_participation_requests SET ?',
            [requestData]
        );
        
        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: requestData.email,
            subject: 'Conference Registration Received',
            text: `Hello ${requestData.name},\n\nThank you for registering for our conference. We'll contact you shortly with more details.\n\nBest regards,\nConference Team`
        });

        // Internal notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Conference Registration',
            text: `New registration from ${requestData.email}\n\nDetails: ${JSON.stringify(requestData, null, 2)}`
        });

        res.status(201).json({
            message: 'Registration successful! We will contact you shortly.',
            requestId: result.insertId
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM conference_participation_requests');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
};