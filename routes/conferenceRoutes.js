const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router.post('/', conferenceController.submitRequest);
router.get('/', conferenceController.getRequests);

module.exports = router;