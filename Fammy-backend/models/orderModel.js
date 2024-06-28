// Imports
const { default: mongoose } = require('mongoose');

// Schema for orders
const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
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
    orderTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    customer: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
});

// Build feedback model from above defined schema
const orderModel = mongoose.model('orders', orderSchema);

// Export the model
module.exports = orderModel;
