const express = require("express");
const router = express.Router();
const{
    createPayment,
    getAllPayments,
    getPaymentById,
}=require("../controllers/paymentController");

// Route to create a new payment
router.post("/", createPayment);

// Route to get all payments
router.get("/", getAllPayments);

// Route to get a specific payment by ID
router.get("/:id", getPaymentById);

module.exports = router;