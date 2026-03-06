const { getWeatherData } = require('../services/weatherService');
const { getSatelliteData } = require('../services/nasaService');

const fetchWeatherData = async (req, res) => {
  try {
    const { city } = req.params;
    const data = await getWeatherData(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchSatelliteData = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const data = await getSatelliteData(parseFloat(lat), parseFloat(lon));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchWeatherData,
  fetchSatelliteData
};