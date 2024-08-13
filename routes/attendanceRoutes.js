// routes/attendanceRoutes.js
const express = require('express');
const { timeIn, timeOut } = require('../controllers/attendanceControllers');

const router = express.Router();

// Routes for time in and time out
router.post('/timein', timeIn);
router.post('/timeout', timeOut);

module.exports = router;