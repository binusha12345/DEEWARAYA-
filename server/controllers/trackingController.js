const Location = require("../models/Location");
const Boat = require("../models/Boat");

// Save new GPS location
const updateLocation = async (req, res) => {
  try {
    const { boatId, latitude, longitude, speed, zone } = req.body;
    
    console.log("updateLocation called");
    console.log("REQ BODY:", req.body);

    if (!boatId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Boat ID, latitude, longitude are required",
      });
    }

    const boat = await Boat.findById(boatId);

    if (!boat) {
      return res.status(404).json({
        message: "Boat not found",
      });
    }

    const location = await Location.create({
      boat: boatId,
      latitude,
      longitude,
      speed: speed || 0,
      zone: zone || "Unknown",
    });

    res.status(201).json({
      message: "Location saved successfully",
      location,
    });
  } catch (error) {
    console.error("Update Location Error:", error.message);
    res.status(500).json({
      message: "Server error",
      
    });
  }
};

// Get latest location
const getLatestLocation = async (req, res) => {
  try {
    const { boatId } = req.params;

    const location = await Location.findOne({ boat: boatId }).sort({
      recordedAt: -1,
    });

    if (!location) {
      return res.status(404).json({
        message: "No location found",
      });
    }

    res.status(200).json(location);
  } catch (error) {
    console.error("Get Latest Location Error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get location history
const getLocationHistory = async (req, res) => {
  try {
    const { boatId } = req.params;

    const history = await Location.find({ boat: boatId }).sort({
      recordedAt: -1,
    });

    res.status(200).json(history);
  } catch (error) {
    console.error("Get Location History Error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  updateLocation,
  getLatestLocation,
  getLocationHistory,
};