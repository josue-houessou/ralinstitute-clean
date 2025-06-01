const db = require('../config/db');
const transporter = require('../config/email');

exports.submitRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const [result] = await db.execute(
            'INSERT INTO training_info_requests SET ?',
            [requestData]
        );
        
        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: requestData.email,
            subject: 'Training Information Request Received',
            text: `Hello ${requestData.name},\n\nThank you for your interest in our training programs. We'll send you more information shortly.\n\nBest regards,\nTraining Team`
        });

        // Internal notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Training Information Request',
            text: `New request from ${requestData.email}\n\nDetails: ${JSON.stringify(requestData, null, 2)}`
        });

        res.status(201).json({
            message: 'Thank you! We will contact you with more information soon.',
            requestId: result.insertId
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Request submission failed', error: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM training_info_requests');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
};