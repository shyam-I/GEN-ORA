const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');

// Add water usage record
router.post('/add', waterController.addWaterUsage);

// Get all water usage records
router.get('/all', waterController.getAllWaterUsage);

// Filter records by location
router.get('/location/:location', waterController.getUsageByLocation);

// Delete record by ID
router.delete('/:id', waterController.deleteUsage);

module.exports = router;