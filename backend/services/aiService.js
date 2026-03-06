const axios = require("axios");

const AI_URL = "http://localhost:8000";

const forecastDemand = async (data) => {
  const res = await axios.post(`${AI_URL}/predict`, data);
  return res.data;
};

const detectLeak = async (data) => {
  const res = await axios.post(`${AI_URL}/detect-leak`, data);
  return res.data;
};

const irrigationAdvice = async (data) => {
  const res = await axios.post(`${AI_URL}/irrigation`, data);
  return res.data;
};

const predictFlood = async (data) => {
  const res = await axios.post(`${AI_URL}/flood`, data);
  return res.data;
};

const askAdvisor = async (data) => {
  const res = await axios.post(`${AI_URL}/advisor`, data);
  return res.data;
};

module.exports = { forecastDemand, detectLeak, irrigationAdvice, predictFlood, askAdvisor };
