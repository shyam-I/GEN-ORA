const mongoose = require('mongoose');

const WaterUsageSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  usage: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    enum: ['household', 'agriculture', 'municipality']
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('WaterUsage', WaterUsageSchema);