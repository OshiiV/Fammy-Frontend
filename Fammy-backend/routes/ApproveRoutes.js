const express = require("express");
const router = express.Router();
const ResModel = require("../models/ResModel");

// Get reservations for admin approval
// Get all reservations for admin approval
router.post("/admin/reservations", async (req, res) => {
  try {
    const reservations = await ResModel.find();
    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .send({ message: "No reservations found", success: false });
    }
    res.status(200).send({ reservations, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Failed to retrieve reservations",
        success: false,
        error,
      });
  }
});

// Approve a reservation

router.patch("/admin/approve/:id", async (req, res) => {
  try {
    const updatedReservation = await ResModel.findByIdAndUpdate(
      req.params.id,
      { adminDecision: "Approved" },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).send({ message: "Reservation not found" });
    }

    res
      .status(200)
      .send({
        message: "Reservation approved successfully",
        updatedReservation,
      });
  } catch (error) {
    res.status(500).send({ message: "Failed to approve reservation" });
  }
});






// Reject a reservation

// 
router.patch("/admin/reject/:id", async (req, res) => {
  try {
    const updatedReservation = await ResModel.findByIdAndUpdate(
      req.params.id,
      { adminDecision: "Rejected" },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).send({ message: "Reservation not found" });
    }

    res.status(200).send({
      message: "Reservation rejected successfully",
      updatedReservation,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to reject reservation" });
  }
});

// 


module.exports = router;
