const express = require('express');
const router = express.Router();
const LedFinancial = require('../models/LedFinancial'); // Update import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const empauthMiddleware = require('../middleware/empauthMiddleware');


//add details
router.post('/LedForm', empauthMiddleware,async (req, res) => {
    try {
        const booking = new LedFinancial(req.body); // Update model name
        await booking.save();
        res.status(200).send({ message: " uploaded Successfully", success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: " upload unsuccessful.", success: false, error });
    }
});

//get details for table
router.post('/getLedForm', empauthMiddleware, async (req, res) => {
    try {
        const { employeeId } = req.body; // Assuming employeeId is sent in the request body
        const bookings = await LedFinancial.find({ employeeId }); 
        if (!bookings || bookings.length === 0) {
            return res.status(404).send({ message: "No Booking found for this employee.", success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to retrieve Booking.", success: false, error });
    }
});




//delete data
router.delete('/deletebooking/:id', async (req, res) => {
    try {
        const LedFinacialRoutes= await LedFinancial.findByIdAndDelete(req.params.id);
        if (!LedFinacialRoutes) {
            return res.status(404).send({ message: "Employee not found.", success: false });
        }
        res.status(200).send({ message: "Employee deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to delete Employee.", success: false, error });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getLedForm2/:id', async (req, res) => {
    try {
        const{id} = req.params;
        const bookings = await LedFinancial.findById(id); 
        if (!bookings ) {
            return res.status(404).send({ message: "No Booking found.", success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve Booking.", success: false, error });
    }
});

router.put('/updateLedForm/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await LedFinancial.findByIdAndUpdate(id, req.body, { new: true });
        if(!updated) {
            return res.status(404).json({ success: false, message: "Announcement not found." });
        }
        res.json({ success: true, message: "Announcement updated successfully.", booking: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;