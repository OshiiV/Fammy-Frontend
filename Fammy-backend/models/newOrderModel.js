// Imports
const { default: mongoose } = require('mongoose');

// New schema for orders
const newOrderSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    measurements: {
        type: String,
        required: true,
    },
    materials: {
        type: String,
        required: true,
    },
    orderTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    dateOfCreation: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateOfCompletion: {
        type: Date,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
});

// Build feedback model from above defined schema
const newOrderModel = mongoose.model('newOrders', newOrderSchema);

// Export the new model
module.exports = newOrderModel;