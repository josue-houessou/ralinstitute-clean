const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController'); // ✅ make sure this path is correct

router.post('/', trainingController.submitRequest);
router.get('/', trainingController.getRequests);

module.exports = router; // ✅ This line is critical
