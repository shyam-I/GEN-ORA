const WaterUsage = require("../models/WaterUsage");

// Get all water usage records for analytics
exports.getUsageAnalytics = async (req, res) => {
  try {
    const usageRecords = await WaterUsage.find().sort({ date: -1 });
    res.json({
      success: true,
      data: usageRecords,
      count: usageRecords.length
    });
  } catch (error) {
    console.error("Error fetching usage analytics:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch usage analytics"
    });
  }
};