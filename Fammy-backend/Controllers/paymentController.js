const Payment = require('../models/paymentModel');

// Controller function to create a new payment
const createPayment = async (req, res) => {
    const payment = new Payment({
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
    });

    try {
        const newPayment = await payment.save();
        res.status(201).json({
            message: 'Payment details created successfully',
            data: newPayment,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({
            message: 'All payment details retrieved successfully',
            data: payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a specific payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findOne({
            _id: req.params.id,
        });

        if (!payment) {
            return res.status(404).json({ message: 'payment not found' });
        }
        res.status(200).json({
            message: 'payment retrieved successfully',
            data: payment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
};
