const axios = require("axios");

const getWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeather API key not found");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);

  return {
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity
  };
};

module.exports = { getWeatherData };