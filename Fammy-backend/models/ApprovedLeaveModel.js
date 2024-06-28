const mongoose = require('mongoose');

const approvedLeaveSchema = new mongoose.Schema({
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
        default: 'Approved'
    }
}, {
    timestamps: true
});

const ApprovedLeave = mongoose.model("ApprovedLeave", approvedLeaveSchema);
module.exports = ApprovedLeave;
