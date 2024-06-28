// Imports
const feedbackModel = require('../models/feedbackModel');

// ***************************** CONTROLLERS *****************************

// -----------------------------------------------------------------------
// @description         Retrieve all feedback from database
// @methods             GET
// @route               /feedbacks
// @access              OPEN
// -----------------------------------------------------------------------

const getAllFeedback = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${getAllFeedback.name}() controller has been invoked`
    );

    try {
        // Get all feedback from database
        const feedbacks = await feedbackModel.find();

        // Send response to client
        res.status(200).json({
            message: `All feedback retrieved successfully`,
            data: feedbacks,
        });

        // Display retrieved feedback in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    All feedback retrieved successfully`
        );
        console.log(feedbacks);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send error message to client
        res.status(500).json({ message: error.message });

        // Display caught server error
        console.error(
            `\x1b[31mERROR\x1b[0m      An internal server error has occurred!`
        );
        console.log(
            `**************************************************************`
        );
    }
};

// -----------------------------------------------------------------------
// @description         Retrieve feedback from database based on ID
// @methods             GET
// @route               /feedbacks/:id
// @access              OPEN
// -----------------------------------------------------------------------

const getFeedbackById = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${getFeedbackById.name}() controller has been invoked`
    );

    try {
        // Get relevant feedback from database (using ID in request params)
        const feedback = await feedbackModel.findOne({
            _id: req.params.id,
        });

        // Display error if feedback cannot be found
        if (!feedback) {
            return res.status(404).json({ message: 'Cannot find feedback' });
        }

        // Send response to client
        res.status(200).json({
            message: `Feedback ${req.params.id} retrieved successfully`,
            data: feedback,
        });

        // Display details of retrieved feedback in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    Feedback retrieved successfully`
        );
        console.log(feedback);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send error message to client
        res.status(500).json({ message: error.message });

        // Display error message in terminal
        console.error(
            `\x1b[31mERROR\x1b[0m      An internal server error has occured!`
        );
        console.log(
            `**************************************************************`
        );
    }
};

// -----------------------------------------------------------------------
// @description         Retrieve feedback from database based on Order ID
// @methods             GET
// @route               /feedbacks/order/:id
// @access              OPEN
// -----------------------------------------------------------------------

const getFeedbackByOrderId = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${getFeedbackByOrderId.name}() controller has been invoked`
    );

    try {
        // Get relevant feedback from database (using ID in request params)
        const feedback = await feedbackModel.findOne({
            orderId: req.params.id,
        });

        // Display error if feedback cannot be found
        if (!feedback) {
            return res.status(404).json({ message: 'Cannot find feedback' });
        }

        // Send response to client
        res.status(200).json({
            message: `Feedback ${req.params.id} retrieved successfully`,
            data: feedback,
        });

        // Display details of retrieved feedback in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    Feedback retrieved successfully`
        );
        console.log(feedback);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send error message to client
        res.status(500).json({ message: error.message });

        // Display error message in terminal
        console.error(
            `\x1b[31mERROR\x1b[0m      An internal server error has occured!`
        );
        console.log(
            `**************************************************************`
        );
    }
};

// -----------------------------------------------------------------------
// @description         Create new feedback
// @methods             POST
// @route               /feedbacks
// @access              OPEN
// -----------------------------------------------------------------------

const createFeedback = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${createFeedback.name}() controller has been invoked`
    );

    // Create feedback object from the data in the request body
    const feedback = new feedbackModel({
        orderId: req.body.orderId,
        starCount: req.body.starCount,
        feedbackMessage: req.body.feedbackMessage,
    });

    try {
        // Save new feedback in database
        const newFeedback = await feedback.save();

        // Send response to client
        res.status(201).json({
            message: 'Feedback created successfully',
            data: newFeedback,
        });

        // Display details of created feedback in terminal
        console.log(`\x1b[32mSUCCESS\x1b[0m    Feedback created successfully`);
        console.log(newFeedback);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send error message to client
        res.status(400).json({ message: error.message });

        // Display error message in terminal
        console.error(
            `\x1b[31mERROR\x1b[0m      Bad request: invalid syntax detected!`
        );
        console.log(
            `**************************************************************`
        );
    }
};

// -----------------------------------------------------------------------
// @description         Update existing feedback in database
// @methods             PATCH
// @route               /feedbacks/:id
// @access              OPEN
// -----------------------------------------------------------------------

const updateFeedback = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${updateFeedback.name}() controller has been invoked`
    );

    try {
        // Retrieve feedback to be updated from the database (based on ID)
        const feedback = await feedbackModel.findOne({
            orderId: req.params.id,
        });

        // Display error if relevant feedback cannot be found
        if (!feedback) {
            // Display error message in terminal
            console.error(
                `\x1b[31mERROR\x1b[0m      Cannot find requested feedback!`
            );
            console.log(
                `**************************************************************`
            );

            // Send 404 response to client
            return res.status(404).json({ message: 'Cannot find feedback' });
        }

        // Update details of feedback using data from request body
        if (req.body.orderId != null) {
            feedback.orderId = req.body.orderId;
        }
        if (req.body.starCount != null) {
            feedback.starCount = req.body.starCount;
        }
        if (req.body.feedbackMessage != null) {
            feedback.feedbackMessage = req.body.feedbackMessage;
        }

        // Save the updated feedback in the database
        const updatedFeedback = await feedback.save();

        // Set response to client
        res.status(200).json({
            message: `Feedback ${req.params.id} updated successfully`,
            data: updatedFeedback,
        });

        // Display details of updated feedback in terminal
        console.log(`\x1b[32mSUCCESS\x1b[0m    Feedback updated successfully`);
        console.log(updatedFeedback);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send 400 response to client
        res.status(400).json({ message: error.message });

        // Display error message in terminal
        console.error(
            `\x1b[31mERROR\x1b[0m      Bad request: invalid syntax detected!`
        );
        console.log(
            `**************************************************************`
        );
    }
};

// -----------------------------------------------------------------------
// @description         Delete existing feedback from database
// @methods             DELETE
// @route               /feedbacks/:id
// @access              OPEN
// -----------------------------------------------------------------------

const deleteFeedback = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${deleteFeedback.name}() controller has been invoked`
    );

    try {
        // Find and delete relevant feedback from database
        const feedback = await feedbackModel.findOneAndDelete({
            orderId: req.params.id,
        });

        // Display error message if relevant feedback is not found
        if (!feedback) {
            // Display error message in terminal
            console.error(
                `\x1b[31mERROR\x1b[0m      Cannot find requested feedback!`
            );
            console.log(
                `**************************************************************`
            );

            // Send 404 response to client
            return res.status(404).json({
                message: `Cannot find feedback with ID ${req.params.id}`,
            });
        }

        // Send response to client
        res.json({ message: `Deleted feedback ${req.params.id} successfully` });

        // Display details of deleted feedback in terminal
        console.log(`\x1b[32mSUCCESS\x1b[0m    Feedback deleted successfully`);
        console.log(feedback);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send 500 error message to client
        res.status(500).json({ message: error.message });

        // Display error message in terminal
        console.error(
            `\x1b[31mERROR\x1b[0m      An internal server error has occurred!`
        );
        console.log(
            `**************************************************************`
        );
    }
};

// Export the controllers
module.exports = {
    getAllFeedback,
    getFeedbackById,
    getFeedbackByOrderId,
    createFeedback,
    updateFeedback,
    deleteFeedback,
};
