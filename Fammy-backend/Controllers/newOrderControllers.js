// Imports
const orderModel = require('../models/orderModel');
const CutOrderModel = require('../models/CutOrderModel');
const newOrderModel = require('../models/newOrderModel');

// ***************************** CONTROLLERS *****************************

// 1. Tailor's controllers

const addDetails = async (req, res) => {
    try {
        const booking = new newOrderModel(req.body); // Update model name
        await booking.save();
        res.status(200).send({
            message: ' uploaded Successfully',
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: ' upload unsuccessful.',
            success: false,
            error,
        });
    }
};

const getDetailsForTable = async (req, res) => {
    try {
        const { employeeId } = req.body; // Assuming employeeId is sent in the request body
        const bookings = await newOrderModel.find({ employeeId }); // Find bookings for the given employeeId
        if (!bookings || bookings.length === 0) {
            return res.status(404).send({
                message: 'No Booking found for this employee.',
                success: false,
            });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Failed to retrieve Booking.',
            success: false,
            error,
        });
    }
};

const deleteData = async (req, res) => {
    try {
        const CutOrderRoute = await newOrderModel.findByIdAndDelete(
            req.params.id
        );
        if (!CutOrderRoute) {
            return res
                .status(404)
                .send({ message: 'Order not found.', success: false });
        }
        res.status(200).send({
            message: 'Order deleted successfully',
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Failed to delete order.',
            success: false,
            error,
        });
    }
};

const getCutOrderForm2 = async (req, res) => {
    try {
        const { id } = req.params;
        const orderId = id;
        const bookings = await newOrderModel.findById(orderId);
        if (!bookings) {
            return res
                .status(404)
                .send({ message: 'No Booking found.', success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Failed to retrieve Booking.',
            success: false,
            error,
        });
    }
};

const updateCutOrderForm = async (req, res) => {
    try {
        const { id } = req.params;
        const orderId = id;
        const updated = await newOrderModel.findByIdAndUpdate(
            orderId,
            req.body,
            {
                new: true,
            }
        );
        if (!updated) {
            return res
                .status(404)
                .json({ success: false, message: 'Announcement not found.' });
        }
        res.json({
            success: true,
            message: 'Announcement updated successfully.',
            booking: updated,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};

// 2. Other controllers

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
        const orders = await newOrderModel.find();

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
        const order = await newOrderModel.findOne({
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
    const order = new newOrderModel({
        employeeId: req.body.employeeId,
        orderId: req.body.orderId,
        name: req.body.name,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        item: req.body.item,
        measurements: req.body.measurements,
        materials: req.body.materials,
        orderTotal: req.body.orderTotal,
        dateOfCreation: new Date(req.body.dateOfCreation),
        dateOfCompletion: new Date(req.body.dateOfCompletion),
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
        const order = await newOrderModel.findOne({
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
        if (req.body.employeeId != null) {
            order.employeeId = req.body.employeeId;
        }
        if (req.body.orderId != null) {
            order.orderId = req.body.orderId;
        }
        if (req.body.name != null) {
            order.name = req.body.name;
        }
        if (req.body.address != null) {
            order.address = req.body.address;
        }
        if (req.body.phonenumber != null) {
            order.phonenumber = req.body.phonenumber;
        }
        if (req.body.item != null) {
            order.item = req.body.item;
        }
        if (req.body.measurements != null) {
            order.measurements = req.body.measurements;
        }
        if (req.body.materials != null) {
            order.materials = req.body.materials;
        }
        if (req.body.orderTotal != null) {
            order.orderTotal = req.body.orderTotal;
        }
        if (req.body.dateOfCreation != null) {
            order.dateOfCreation = req.body.dateOfCreation;
        }
        if (req.body.dateOfCompletion != null) {
            order.dateOfCompletion = req.body.dateOfCompletion;
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
        const order = await newOrderModel.findOneAndDelete({
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
    addDetails,
    getDetailsForTable,
    deleteData,
    getCutOrderForm2,
    updateCutOrderForm,

    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
