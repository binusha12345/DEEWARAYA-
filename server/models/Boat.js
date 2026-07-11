const mongoose = require("mongoose");

const boatSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boatName: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    boatType: {
      type: String,
      required: true,
    },
    modelYear: {
      type: String,
      required: true,
    },
    engineSerial: {
      type: String,
      default: "",
    },
    fuelCapacity: {
      type: Number,
      default: 0,
    },
    horsepower: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    boatStatus: {
      type: String,
      enum: ["ACTIVE", "MAINTENANCE", "NON-ACTIVE"],
      default: "ACTIVE",
    },
    latitude: {
    type: Number,
    default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Boat", boatSchema);