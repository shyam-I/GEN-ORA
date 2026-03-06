const WaterUsage = require('../models/WaterUsage');

// Add water usage record
exports.addWaterUsage = async (req, res) => {
    try {
        const { location, usage, source, date, notes } = req.body;

        const newWaterUsage = new WaterUsage({
            location,
            usage,
            source,
            date,
            notes
        });

        const savedWaterUsage = await newWaterUsage.save();
        res.status(201).json(savedWaterUsage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all water usage records
exports.getAllWaterUsage = async (req, res) => {
    try {
        const waterUsages = await WaterUsage.find();
        res.status(200).json(waterUsages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter records by location
exports.getUsageByLocation = async (req, res) => {
    try {
        const location = req.params.location;
        const waterUsages = await WaterUsage.find({ location });
        res.status(200).json(waterUsages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete record by ID
exports.deleteUsage = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedWaterUsage = await WaterUsage.findByIdAndDelete(id);

        if (!deletedWaterUsage) {
            return res.status(404).json({ message: 'Water usage record not found' });
        }

        res.status(200).json({ message: 'Water usage record deleted successfully', deletedWaterUsage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};