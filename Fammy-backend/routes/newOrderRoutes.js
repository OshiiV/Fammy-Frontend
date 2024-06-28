// Imports
const express = require('express');
const {
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
} = require('../controllers/newOrderControllers');
const empauthMiddleware = require('../middleware/empauthMiddleware');

// Setup the router
const router = express.Router();

// ******************** ROUTES ********************

// 1. Routes for tailor

// Add details (POST)
router.post('/CutOrderForm', empauthMiddleware, addDetails);

// Get details for table (POST)
router.post('/getCutOrderForm', empauthMiddleware, getDetailsForTable);

// Delete data
router.delete('/deletebooking/:id', deleteData);

// /getCutOrderForm2/:id
router.get('/getCutOrderForm2/:id', getCutOrderForm2);

// /updateCutOrderForm/:id
router.put('/updateCutOrderForm/:id', updateCutOrderForm);

// 2. Other routes

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
