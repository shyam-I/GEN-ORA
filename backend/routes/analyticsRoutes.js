const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

// Analytics Routes
router.get("/usage", analyticsController.getUsageAnalytics);

module.exports = router;