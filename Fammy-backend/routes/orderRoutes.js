// Imports
const express = require('express');
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderControllers');

// Setup the router
const router = express.Router();

// ******************** ROUTES ********************

// Retrieve all orders (GET)
router.get('/', getAllOrders);

// Retrieve order by ID (GET)
router.get('/:id', getOrderById);

// Create new order (POST)
router.post('/', createOrder);

// Update existing order (PATCH)
router.patch('/:id', updateOrder);

// Delete order (DELETE)
router.delete('/:id', deleteOrder);

// Export the router
module.exports = router;
