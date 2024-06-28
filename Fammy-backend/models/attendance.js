const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  // Define your schema fields here

  employeeId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
  hoursWorked: {
    type: Number,
    required: true,
},
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
