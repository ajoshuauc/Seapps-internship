//controllers/attendanceController.js
const Attendance = require('../models/attendance');

const timeIn = async (req, res) => {
  const userId = req.body.userId
  //console.log(userId)
  try {
    // Check if there's already an active time in record
    const existingRecord = await Attendance.findOne({ userId, timeOut: null });
    if (existingRecord) {
      return res.status(400).json({ message: 'You have already timed in.' });
    }

    // Create a new time in record
    const attendance = new Attendance({ userId });
    await attendance.save();
    res.status(200).json({ message: 'Time in successful', attendance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const timeOut = async (req, res) => {
  try {
    const userId = req.body.userId

    // Find the active time in record
    const attendance = await Attendance.findOne({ userId, timeOut: null });
    if (!attendance) {
      return res.status(400).json({ message: 'You have not timed in yet.' });
    }

    // Update the time out
    attendance.timeOut = new Date();
    await attendance.save();
    res.status(200).json({ message: 'Time out successful', attendance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { timeIn, timeOut };