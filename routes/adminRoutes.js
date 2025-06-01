const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const db = require('../config/db');

// Protect all admin routes
router.use(authMiddleware);

// GET /api/admin/requests
router.get('/requests', async (req, res) => {
    try {
        const [translations] = await db.execute('SELECT * FROM translation_requests');
        const [interpretations] = await db.execute('SELECT * FROM interpretation_requests');
        const [research] = await db.execute('SELECT * FROM research_membership_requests');
        const [conferences] = await db.execute('SELECT * FROM conference_participation_requests');
        
        res.json({
            translations,
            interpretations,
            research,
            conferences
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
});

module.exports = router;