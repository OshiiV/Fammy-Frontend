const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const ResModel = require('../models/ResModel');

//add details
router.post('/ResForm', async (req, res) => {
    try {
        const booking = new ResModel(req.body); // Update model name
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
});

// get details for table
router.get('/getResForm', async (req, res) => {
    try {
        const bookings = await ResModel.find();
        // .sort({ createdAt: -1 });
        if (!bookings || bookings.length === 0) {
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
});

//delete data
router.delete('/deletebooking/:id'),
    async (req, res) => {
        try {
            const ResRoute = await ResModel.findByIdAndDelete(req.params.id);
            if (!ResRoute) {
                return res
                    .status(404)
                    .send({
                        message: 'Reservation not found.',
                        success: false,
                    });
            }
            res.status(200).send({
                message: 'Reservation deleted successfully',
                success: true,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Failed to delete Reservation.',
                success: false,
                error,
            });
        }
    };
// router.get("/getResForm", async (req, res) => {
//   try {
//     const bookings = await ResModel.find();
//     const currentTime = new Date();
//     bookings.forEach((booking) => {
//       const timeDifference =
//         (currentTime - booking.createdAt) / (1000 * 60 * 60);
//       booking.canModify = timeDifference <= 1; // Set flag based on time difference
//     });
//     if (!bookings || bookings.length === 0) {
//       return res
//         .status(404)
//         .send({ message: "No Booking found.", success: false });
//     }
//     res.status(200).send({ bookings, success: true });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ message: "Failed to retrieve Booking.", success: false, error });
//   }
// });

//delete data
router.delete('/deletebooking/:id', async (req, res) => {
    try {
        const ResRoute = await ResModel.findByIdAndDelete(req.params.id);
        if (!ResRoute) {
            return res
                .status(404)
                .send({ message: 'Employee not found.', success: false });
        }
        res.status(200).send({
            message: 'Employee deleted successfully',
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Failed to delete Employee.',
            success: false,
            error,
        });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getResForm2/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await ResModel.findById(id);
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
});

//
router.put('/updateResForm/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;

        // Check if the reservation is currently approved
        const existingReservation = await ResModel.findById(id);
        if (existingReservation.adminDecision === 'Approved') {
            // If the reservation is approved, change the status back to pending
            updatedValues.adminDecision = 'Pending';
        }

        const updatedReservation = await ResModel.findByIdAndUpdate(
            id,
            updatedValues,
            { new: true }
        );
        if (!updatedReservation) {
            return res
                .status(404)
                .json({ success: false, message: 'Reservation not found.' });
        }

        res.json({
            success: true,
            message: 'Reservation updated successfully.',
            booking: updatedReservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
});

//

// new update

// Approve a reservation
router.patch('/admin/approve/:id', async (req, res) => {
    try {
        const updatedReservation = await ResModel.findByIdAndUpdate(
            req.params.id,
            { adminDecision: 'Approved' },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).send({ message: 'Reservation not found' });
        }

        res.status(200).send(updatedReservation);
    } catch (error) {
        res.status(500).send({ message: 'Failed to approve reservation' });
    }
});

// Reject a reservation
router.patch('/admin/reject/:id', async (req, res) => {
    try {
        const updatedReservation = await ResModel.findByIdAndUpdate(
            req.params.id,
            { adminDecision: 'Rejected' },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).send({ message: 'Reservation not found' });
        }

        res.status(200).send(updatedReservation);
    } catch (error) {
        res.status(500).send({ message: 'Failed to reject reservation' });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
