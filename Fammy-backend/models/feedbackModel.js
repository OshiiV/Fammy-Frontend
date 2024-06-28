// Imports
const { default: mongoose } = require('mongoose');

// Schema for feedback
const feedbackSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    starCount: {
        type: Number,
        required: true,
    },
    feedbackMessage: {
        type: String,
        required: false,
    },
});

// Build feedback model from above defined schema
const feedbackModel = mongoose.model('feedbacks', feedbackSchema);

// Export the model
module.exports = feedbackModel;
