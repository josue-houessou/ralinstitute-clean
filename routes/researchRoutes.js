const express = require('express');
const router = express.Router();
const researchController = require('../controllers/researchController');

router.post('/', researchController.submitRequest);
router.get('/', researchController.getRequests);

module.exports = router;