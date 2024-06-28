const express = require("express");
const router = express.Router();
const {
    createCard,
    getAllCards,
    getCardById,
    updateCardById,
    deleteCardById,
} = require("../controllers/cardController");

// Route to create a new card
router.post("/", createCard);

// Route to get all cards
router.get("/", getAllCards);

// Route to get a specific card by ID
router.get("/:id", getCardById);

// Route to update a card by ID
router.patch("/:id", updateCardById);

// Route to delete a card by ID
router.delete("/:id", deleteCardById);

module.exports = router;
