const express = require("express");
const router = express.Router();
const Leave = require('../models/EmpLeaveModel');
const ApprovedLeaveModel = require('../models/ApprovedLeaveModel');
const RejectedLeaveModel = require('../models/RejectedLeaveModel');
const empauthMiddleware = require("../middleware/empauthMiddleware");


// Route to submit a leave request
router.post("/leaveHRsup", empauthMiddleware,async (req, res) => {
    try {
        const newLeave = new Leave(req.body);
        await newLeave.save();
        res.status(200).send({ message: "Leave submission successful.", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Leave submission unsuccessful.", success: false, error });
    }
});

// Route to get all leave requests
router.get("/leaveHRsup", async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).send({ data: leaves, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch leave data.", success: false, error });
    }
});

// Route to handle leave approval
router.put("/approveLeave/:leave_id", async (req, res) => {
    try {
        const { leave_id } = req.params;
        const leave = await Leave.findById(leave_id);
        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave not found." });
        }
        // Update leave status to "Approved"
        leave.status = "Approved";
        await leave.save();
        
        // Move approved leave to ApprovedLeave collection
        const approvedLeave = new ApprovedLeaveModel(leave.toObject());
        await approvedLeave.save();
        
        // Remove leave from Leave collection
        await Leave.findByIdAndDelete(leave_id);

        res.status(200).json({ success: true, message: "Leave approved successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

// Route to handle leave rejection
router.put("/rejectLeave/:leave_id", async (req, res) => {
    try {
        const { leave_id } = req.params;
        const leave = await Leave.findById(leave_id);
        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave not found." });
        }
        // Update leave status to "Rejected"
        leave.status = "Rejected";
        await leave.save();
        
        // Move rejected leave to RejectedLeave collection
        const rejectedLeave = new RejectedLeaveModel(leave.toObject());
        await rejectedLeave.save();
        
        // Remove leave from Leave collection
        await Leave.findByIdAndDelete(leave_id);

        res.status(200).json({ success: true, message: "Leave rejected successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

router.get('/getempLeaveList', async (req, res) => {
    try {
        const approvedBookings = await ApprovedLeaveModel.find(); 
        const rejectedBookings = await RejectedLeaveModel.find();
        
        if ((!approvedBookings || approvedBookings.length === 0) && (!rejectedBookings || rejectedBookings.length === 0)) {
            return res.status(404).send({ message: "No bookings found.", success: false });
        }

        res.status(200).send({ approvedBookings, rejectedBookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve bookings.", success: false, error });
    }
});

/*
router.get('/getempLeaveList', async (req, res) => {
    try {
        const bookings = await ApprovedLeaveModel.find(); 
        if (!bookings || bookings.length === 0) {
            return res.status(404).send({ message: "No Booking found.", success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve Booking.", success: false, error });
    }
});

router.get('/getempLeaveList', async (req, res) => {
    try {
        const bookings = await RejectedLeaveModel.find(); 
        if (!bookings || bookings.length === 0) {
            return res.status(404).send({ message: "No Booking found.", success: false });
        }
        res.status(200).send({ bookings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve Booking.", success: false, error });
    }
});*/

module.exports = router;
