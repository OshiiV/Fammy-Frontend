// Imports
const orderModel = require('../models/orderModel');

// ***************************** CONTROLLERS *****************************

// -----------------------------------------------------------------------
// @description         Retrieve all orders from database
// @methods             GET
// @route               /orders
// @access              OPEN
// -----------------------------------------------------------------------

const getAllOrders = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${getAllOrders.name}() controller has been invoked`
    );

    try {
        // Get all orders from database
        const orders = await orderModel.find();

        // Send response to client
        res.status(200).json({
            message: `All orders retrieved successfully`,
            data: orders,
        });

        // Display retrieved orders in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    All orders retrieved successfully`
        );
        console.log(orders);
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
// @description         Retrieve order from database based on ID
// @methods             GET
// @route               /orders/:id
// @access              OPEN
// -----------------------------------------------------------------------

const getOrderById = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${getOrderById.name}() controller has been invoked`
    );

    try {
        // Get relevant order from database (using ID in request params)
        const order = await orderModel.findOne({
            orderId: req.params.id,
        });

        // Display error if event cannot be found
        if (!order) {
            return res.status(404).json({ message: 'Cannot find order' });
        }

        // Send response to client
        res.status(200).json({
            message: `Order ${req.params.id} retrieved successfully`,
            data: order,
        });

        // Display details of retrieved order in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    Order ${req.params.id} retrieved successfully`
        );
        console.log(order);
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
// @description         Create new order
// @methods             POST
// @route               /orders
// @access              OPEN
// -----------------------------------------------------------------------

const createOrder = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${createOrder.name}() controller has been invoked`
    );

    // Create new order object from data in request body
    const order = new orderModel({
        orderId: req.body.orderId,
        dateOfCreation: new Date(req.body.dateOfCreation),
        dateOfCompletion: new Date(req.body.dateOfCompletion),
        orderTotal: req.body.orderTotal,
        customer: req.body.customer,
        orderStatus: req.body.orderStatus,
    });

    try {
        // Save the new order to the database
        const newOrder = await order.save();

        // Send response to client
        res.status(201).json({
            message: 'Order created successfully',
            data: newOrder,
        });

        // Display details of created order in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    Order ${req.body.orderId} created successfully`
        );
        console.log(newOrder);
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
// @description         Update existing order in database
// @methods             PATCH
// @route               /orders/:id
// @access              OPEN
// -----------------------------------------------------------------------

const updateOrder = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${updateOrder.name}() controller has been invoked`
    );

    try {
        // Retrieve order to be updated from the database (based on ID)
        const order = await orderModel.findOne({
            orderId: req.params.id,
        });

        // Check whether relevant order is found or not
        if (!order) {
            // Display error message in terminal
            console.error(
                `\x1b[31mERROR\x1b[0m      Cannot find order ${req.params.id}!`
            );
            console.log(
                `**************************************************************`
            );

            // Send 404 response to client
            return res.status(404).json({ message: 'Cannot find order' });
        }

        // Update details of order using data from request body
        if (req.body.orderId != null) {
            order.orderId = req.body.orderId;
        }
        if (req.body.dateOfCreation != null) {
            order.dateOfCreation = req.body.dateOfCreation;
        }
        if (req.body.dateOfCompletion != null) {
            order.dateOfCompletion = req.body.dateOfCompletion;
        }
        if (req.body.orderTotal != null) {
            order.orderTotal = req.body.orderTotal;
        }
        if (req.body.customer != null) {
            order.customer = req.body.customer;
        }
        if (req.body.orderStatus != null) {
            order.orderStatus = req.body.orderStatus;
        }

        // Save the updated order in the database
        const updatedOrder = await order.save();

        // Send JSON response to client
        res.status(200).json({
            message: `Order ${req.params.id} updated successfully`,
            data: updatedOrder,
        });

        // Display details of updated order in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    Order ${updatedOrder.orderId} updated successfully`
        );
        console.log(updatedOrder);
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
// @description         Delete existing order from database
// @methods             DELETE
// @route               /orders/:id
// @access              OPEN
// -----------------------------------------------------------------------

const deleteOrder = async (req, res) => {
    // Display controller invocation
    console.log(
        `\x1b[36mINFO\x1b[0m       The ${deleteOrder.name}() controller has been invoked`
    );

    try {
        // Find and delete relevant order from database
        const order = await orderModel.findOneAndDelete({
            orderId: req.params.id,
        });

        // Check whether relevant order is found or not
        if (!order) {
            // Display error message in terminal
            console.error(
                `\x1b[31mERROR\x1b[0m      Cannot find order ${req.params.id}!`
            );
            console.log(
                `**************************************************************`
            );

            // Send 404 response to client
            return res
                .status(404)
                .json({ message: `Cannot find order ${req.params.id}` });
        }

        // Send JSON response to client
        res.json({ message: `Deleted order ${req.params.id} successfully` });

        // Display details of deleted order in terminal
        console.log(
            `\x1b[32mSUCCESS\x1b[0m    Order ${req.params.id} deleted successfully`
        );
        console.log(order);
        console.log(
            `**************************************************************`
        );
    } catch (error) {
        // Send 500 error message to client
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

// Export the controllers
module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
