import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getUsageAnalytics = () => API.get("/api/analytics/usage");

export const getForecast = (data) =>
  API.post("/api/ai/forecast", data);

// Alias used by UI components
export const getForecastPrediction = (data) =>
  API.post("/api/ai/forecast", data);

export const detectLeak = (data) =>
  API.post("/api/ai/leak", data);

export const irrigationAdvice = (data) =>
  API.post("/api/ai/irrigation", data);

export const askAdvisor = (data) =>
  API.post("/api/ai/advisor", data);
