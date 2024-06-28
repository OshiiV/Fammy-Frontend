const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    eId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    requestAt: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    reason: String, 
    status: {
        type: String,
        default: 'Pending' // Initial status is pending
    }
}, {
    timestamps: true
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
