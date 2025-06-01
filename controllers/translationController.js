const db = require('../config/db');
const transporter = require('../config/email');

// ✅ Handles POST /api/translation
exports.submitRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const [result] = await db.execute(
            'INSERT INTO translation_requests SET ?',
            [requestData]
        );

        // Send confirmation email to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: requestData.email,
            subject: 'Translation Request Received',
            text: `Hello ${requestData.first_name},\n\nWe've received your translation request and will contact you shortly.\n\nBest regards,\nYour Team`
        });

        // Internal notification to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Translation Request',
            text: `New request from ${requestData.email}\n\nDetails: ${JSON.stringify(requestData, null, 2)}`
        });

        res.status(201).json({ 
            message: 'We will contact you shortly', 
            requestId: result.insertId 
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Request submission failed', error: error.message });
    }
};

// ✅ Handles GET /api/translation
exports.getRequests = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM translation_requests');
        res.json(rows);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};
