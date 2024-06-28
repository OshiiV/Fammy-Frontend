// Imports
const express = require('express');
const {
    getAllFeedback,
    getFeedbackById,
    getFeedbackByOrderId,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} = require('../controllers/feedbackControllers');

// Setup the router
const router = express.Router();

// ******************** ROUTES ********************

// Retrieve all feedback (GET)
router.get('/', getAllFeedback);

// Retrieve feedback by ID (GET)
router.get('/:id', getFeedbackById);

// Retrieve feedback by Order ID (GET)
router.get('/order/:id', getFeedbackByOrderId);

// Create new feedback (POST)
router.post('/', createFeedback);

// Update existing feedback (PATCH)
router.patch('/:id', updateFeedback);

// Delete feedback (DELETE)
router.delete('/:id', deleteFeedback);

// Export the router
module.exports = router;
