const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true,
    },
    cnumber: {
        type: Number,
        required: true,
    },
    cgmail: {
        type: String,
        required: true,
    },
    cdetails: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // new update
    adminDecision: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
});

const ResModel = mongoose.model('res', userSchema);

module.exports = ResModel;
