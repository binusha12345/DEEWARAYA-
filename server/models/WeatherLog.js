const mongoose = require("mongoose");

const weatherLogSchema = new mongoose.Schema(
  {
    boat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boat",
      required: true,
    },
    boatName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    
    checkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkedByName: { type: String },
    checkedByRole: { type: String }, // owner or driver

    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      placeName: { type: String, default: "" },
    },

    weather: {
      temperature: Number,
      humidity: Number,
      windSpeedKts: Number,
      visibilityKm: Number,
      description: String,
      estimatedWaveHeight: Number,
    },

    alerts: [
      {
        title: String,
        message: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeatherLog", weatherLogSchema);