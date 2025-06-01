const db = require('../config/db');
const transporter = require('../config/email');

exports.submitRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const [result] = await db.execute(
            'INSERT INTO research_membership_requests SET ?',
            [requestData]
        );
        
        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: requestData.email,
            subject: 'Research Membership Request Received',
            text: `Dear ${requestData.full_name},\n\nWe've received your research membership request and will review it shortly.\n\nBest regards,\nResearch Team`
        });

        // Internal notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Research Membership Request',
            text: `New request from ${requestData.email}\n\nDetails: ${JSON.stringify(requestData, null, 2)}`
        });

        res.status(201).json({
            message: 'Thank you for your interest! We will contact you shortly.',
            requestId: result.insertId
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Request submission failed', error: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM research_membership_requests');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
};