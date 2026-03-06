const express = require("express");
const router = express.Router();

const aiController = require("../controllers/aiController");

// AI Routes
router.post("/forecast", aiController.forecastDemand);
router.post("/leak", aiController.leakDetection);
router.post("/flood", aiController.floodPrediction);
router.post("/irrigation", aiController.irrigationRecommendation);
router.post("/advisor", aiController.waterAdvisor);

module.exports = router;