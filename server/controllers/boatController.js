const Boat = require("../models/Boat");

const createBoat = async (req, res) => {
  try {
    const {
      boatName,
      registrationNumber,
      boatType,
      modelYear,
      engineSerial,
      fuelCapacity,
      horsepower,
      boatStatus,
      latitude,
      longitude,
    } = req.body;

    if (!boatName || !registrationNumber || !boatType || !modelYear) {
      return res.status(400).json({
        message: "Boat name, registration number, boat type, model year are required",
      });
    }

    const existingBoat = await Boat.findOne({ registrationNumber });
    if (existingBoat) {
      return res.status(400).json({
        message: "This registration number already exists",
      });
    }

    // Multer uploads file info comes here
    const imageUrl = req.file ? `/uploads/boats/${req.file.filename}` : "";

    const boat = await Boat.create({
      owner: req.user.id,
      boatName,
      registrationNumber,
      boatType,
      modelYear,
      engineSerial,
      fuelCapacity: fuelCapacity ? Number(fuelCapacity) : 0,
      horsepower: horsepower ? Number(horsepower) : 0,
      imageUrl,
      boatStatus: boatStatus || "ACTIVE",
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
    });

    res.status(201).json({
      message: "Boat registered successfully",
      boat,
    });
  } catch (error) {
    console.error("Create Boat Error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyBoats = async (req, res) => {
  try {
    const boats = await Boat.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(boats);
  } catch (error) {
    console.error("Get Boats Error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get ALL boats (for weather page - accessible by both owner and driver)
const getAllBoats = async (req, res) => {
  try {
    const boats = await Boat.find({}).sort({ createdAt: -1 });
    res.status(200).json(boats);
  } catch (error) {
    console.error("Get All Boats Error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createBoat,
  getMyBoats,
  getAllBoats,
};