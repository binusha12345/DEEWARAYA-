const express = require("express");
const router = express.Router();
console.log("Loading tracking routes...");

const { protect } = require("../middleware/authMiddleware");
const {
  updateLocation,
  getLatestLocation,
  getLocationHistory,
} = require("../controllers/trackingController");

router.post("/update", protect, updateLocation);
router.get("/latest/:boatId", protect, getLatestLocation);
router.get("/history/:boatId", protect, getLocationHistory);


module.exports = router;