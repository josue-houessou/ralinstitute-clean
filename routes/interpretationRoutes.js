const express = require('express');
const router = express.Router();
const interpretationController = require('../controllers/interpretationController');

router.post('/', interpretationController.submitRequest);
router.get('/', interpretationController.getRequests);

module.exports = router;