const mongoose = require('mongoose');

const rejectedLeaveSchema = new mongoose.Schema({
    // Same schema as EmpLeaveModel
    employeeId: {
        type: String,
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
        default: 'Rejected'
    }
}, {
    timestamps: true
});

const RejectedLeave = mongoose.model("RejectedLeave", rejectedLeaveSchema);
module.exports = RejectedLeave;
