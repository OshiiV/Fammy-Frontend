const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const SupModel = require('../models/SupModel');

//add details
router.post('/SupForm', async (req, res) => {
    try {
        const booking = new SupModel(req.body); // Update model name
        await booking.save();
        res.status(200).send({ message: " uploaded Successfully", success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: " upload unsuccessful.", success: false, error });
    }
});

//get details for table
router.get('/getSupForm', async (req, res) => {
    try {
        const bookings = await SupModel.find(); 
        if (!bookings || bookings.length === 0) {
            return res.status(404).send({ message: "No Booking found.", success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve Booking.", success: false, error });
    }
});


//delete data
router.delete('/deletebooking/:id', async (req, res) => {
    try {
        const SupRoute= await SupModel.findByIdAndDelete(req.params.id);
        if (!SupRoute) {
            return res.status(404).send({ message: "Employee not found.", success: false });
        }
        res.status(200).send({ message: "Supplier deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to delete Supplier.", success: false, error });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//update data
router.get('/getSupForm2/:id', async (req, res) => {
    try {
        const{id} = req.params;
        const bookings = await SupModel.findById(id); 
        if (!bookings ) {
            return res.status(404).send({ message: "No Booking found.", success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve Booking.", success: false, error });
    }
});

router.put('/updateSupForm/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await SupModel.findByIdAndUpdate(id, req.body, { new: true });
        if(!updated) {
            return res.status(404).json({ success: false, message: "Supplier not found." });
        }
        res.json({ success: true, message: "Supplier updated successfully.", booking: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;