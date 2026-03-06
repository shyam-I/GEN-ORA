const aiService = require("../services/aiService");

// Demand Forecast Controller
exports.forecastDemand = async (req, res) => {
  try {
    const result = await aiService.forecastDemand(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in forecastDemand:", error.message);
    res.status(500).json({ error: "Failed to get forecast" });
  }
};

// Leak Detection Controller
exports.leakDetection = async (req, res) => {
  try {
    const result = await aiService.detectLeak(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in leakDetection:", error.message);
    res.status(500).json({ error: "Failed to detect leaks" });
  }
};

// Irrigation Recommendation Controller
exports.irrigationRecommendation = async (req, res) => {
  console.log("Received irrigation request body:", req.body);
  try {
    const result = await aiService.irrigationAdvice(req.body);
    console.log("Response from Flask AI:", result);
    res.json(result);
  } catch (error) {
    console.error("Error in irrigationRecommendation:", error.message);
    // Provide a user-friendly fallback so the frontend does not show an error.
    res.status(200).json({
      message: "Unable to get recommendation from AI service. Please check your data and try again."
    });
  }
};

// Flood Prediction Controller
exports.floodPrediction = async (req, res) => {
  try {
    const result = await aiService.predictFlood(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in floodPrediction:", error.message);
    res.status(500).json({ error: "Failed to get flood prediction" });
  }
};

// AI Advisor Controller
exports.waterAdvisor = async (req, res) => {
  try {
    const result = await aiService.askAdvisor(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in waterAdvisor:", error.message);
    res.status(500).json({ error: "Failed to get advisor response" });
  }
};