const axios = require("axios");

const detectLeak = async (data) => {

  const response = await axios.post(
    "http://localhost:8000/detect-leak",
    data
  );

  return response.data;
};

module.exports = { detectLeak };