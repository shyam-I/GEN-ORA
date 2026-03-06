const express = require('express');
const router = express.Router();
const { fetchWeatherData, fetchSatelliteData } = require('../controllers/dataController');

router.get('/weather/:city', fetchWeatherData);
router.get('/satellite', fetchSatelliteData);

module.exports = router;