const axios = require('axios');

const getSatelliteData = async (latitude, longitude) => {
  try {
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10).replace(/-/g, '');
    const endDate = startDate; // For single day
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN,T2M,RH2M&community=RE&longitude=${longitude}&latitude=${latitude}&start=${startDate}&end=${endDate}&format=JSON`;
    const response = await axios.get(url);
    const data = response.data;
    if (!data.properties || !data.properties.parameter) {
      throw new Error('No data available for the given date');
    }
    const params = data.properties.parameter;
    // Assuming single day, take the value
    const solarRadiation = params.ALLSKY_SFC_SW_DWN[startDate];
    const temperature = params.T2M[startDate];
    const humidity = params.RH2M[startDate];
    return {
      solarRadiation,
      temperature,
      humidity
    };
  } catch (error) {
    throw new Error(`Failed to fetch satellite data: ${error.message}`);
  }
};

module.exports = {
  getSatelliteData
};