const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

// POST /api/translation
router.post('/', translationController.submitRequest);

// GET /api/translation
router.get('/', translationController.getRequests);

module.exports = router;
