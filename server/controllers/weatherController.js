const axios = require("axios");
const Boat = require("../models/Boat");

const getWeatherFromGps = async (req, res) => {
  try {
    const { boatId, lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    let boat = null;

    if (boatId) {
      boat = await Boat.findById(boatId);
      if (!boat) {
        return res.status(404).json({ message: "Boat not found" });
      }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
    const { data } = await axios.get(url);

    const temperature = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const visibilityKm = data.visibility ? +(data.visibility / 1000).toFixed(1) : 0;
    const windSpeedKts = +(data.wind.speed * 1.94384).toFixed(0);
    const estimatedWaveHeight = +(data.wind.speed / 2.5).toFixed(1);
    const description = data.weather?.[0]?.description || "N/A";
    const icon = data.weather?.[0]?.icon || "01d";

    const alerts = [];

    if (windSpeedKts >= 20) {
      alerts.push({
        type: "danger",
        title: "High Wind Advisory",
        message: `Wind speed is ${windSpeedKts} kts.`,
      });
    }

    if (visibilityKm <= 5) {
      alerts.push({
        type: "warning",
        title: "Low Visibility",
        message: `Visibility is only ${visibilityKm} km.`,
      });
    }

    if (humidity >= 85) {
      alerts.push({
        type: "info",
        title: "High Humidity",
        message: `Humidity is ${humidity}%.`,
      });
    }

    if (temperature >= 32) {
      alerts.push({
        type: "warning",
        title: "Heat Advisory",
        message: `Temperature is ${temperature}°C.`,
      });
    }

    return res.status(200).json({
      boat: boat
        ? {
            id: boat._id,
            boatName: boat.boatName,
            registrationNumber: boat.registrationNumber,
            boatStatus: boat.boatStatus,
          }
        : null,
      location: {
        latitude: Number(lat),
        longitude: Number(lon),
        source: "device_gps",
      },
      weather: {
        temperature,
        humidity,
        visibilityKm,
        windSpeedKts,
        estimatedWaveHeight,
        description,
        icon,
      },
      alerts,
    });
  } catch (error) {
    console.error("Weather From GPS Error:", error.message);
    return res.status(500).json({
      message: "Weather data fetch failed",
    });
  }
};

module.exports = {
  getWeatherFromGps,
};