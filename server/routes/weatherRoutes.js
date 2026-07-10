const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getWeatherFromGps } = require("../controllers/weatherController");

router.get("/current", protect, getWeatherFromGps);

module.exports = router;