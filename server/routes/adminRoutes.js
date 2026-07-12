const express = require('express');
const router = express.Router();
const { adminLogin, verifyAdmin } = require('../controllers/adminController');
const {
  getAllUsers,
  getUserById,
  verifyUser,
  banUser,
  unbanUser,
  deleteUser,
  sendMessageToUser,
  getUserStats
} = require('../controllers/adminUserController');
const adminAuth = require('../middleware/adminAuth');
//  Boat controllers
const {
  getAllBoats,
  getBoatById,
  approveBoat,
  suspendBoat,
  deleteBoat,
} = require('../controllers/adminBoatController');
// Import weather controllers
const {
  getOnlineBoatsWithWeather,
  getWeatherStats
} = require('../controllers/adminWeatherController');

// Public route
router.post('/login', adminLogin);

// Protected route
router.get('/verify', adminAuth, verifyAdmin);

// User management routes
router.get('/users', adminAuth, getAllUsers);
router.get('/users/stats', adminAuth, getUserStats);
router.get('/users/:id', adminAuth, getUserById);
router.put('/users/:id/verify', adminAuth, verifyUser);
router.put('/users/:id/ban', adminAuth, banUser);
router.put('/users/:id/unban', adminAuth, unbanUser);
router.delete('/users/:id', adminAuth, deleteUser);
router.post('/users/:id/message', adminAuth, sendMessageToUser);

//Boat management routes
router.get('/boats', adminAuth, getAllBoats);
router.get('/boats/:id', adminAuth, getBoatById);
router.put('/boats/:id/approve', adminAuth, approveBoat);
router.put('/boats/:id/suspend', adminAuth, suspendBoat);
router.delete('/boats/:id', adminAuth, deleteBoat);

// Weather management routes
router.get('/weather/boats', adminAuth, getOnlineBoatsWithWeather);
router.get('/weather/stats', adminAuth, getWeatherStats);


module.exports = router;