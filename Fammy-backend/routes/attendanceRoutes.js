const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');


// GET all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Failed to fetch attendance records' });
  }
});

// POST create a new attendance record
router.post('/', async (req, res) => {
  try {
    const newAttendance = await Attendance.create(req.body);
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).json({ message: 'Failed to create attendance record' });
  }
});

module.exports = router;
