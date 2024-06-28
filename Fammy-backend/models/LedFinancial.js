const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },

    month: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },

    other: {
        type: Number,
        required: true,
    },

});

const LedFinancial = mongoose.model("LedFinancial", userSchema);

module.exports = LedFinancial;