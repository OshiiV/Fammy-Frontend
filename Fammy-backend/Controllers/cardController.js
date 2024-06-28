const Card = require('../models/cardModel'); 

// Controller function to create a new card
const createCard = async (req, res) => {
    const card = new Card({
        cardholderName: req.body.cardholderName,
        cardNumber: req.body.cardNumber,
        expireMonth: req.body.expireMonth,
        cvv: req.body.cvv,
    });

    try {
        const newCard = await card.save();
        res.status(201).json({
            message: 'Card details created successfully',
            data: newCard,
        });

    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Controller function to get all cards
const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json({
            message: 'All card details retrieved successfully',
            data: cards,
        });
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

// Controller function to get a specific card by ID
const getCardById = async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.id,
            });
            
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({
            message: 'Card retrieved successfully',
            data: card,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Controller function to update a card by ID
const updateCardById = async (req, res) => {
try {
        const card = await Card.findOne({
            _id: req.params.id,
        });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        if (req.body.cardholderName != null) {
            card.cardholderName = req.body.cardholderName;
        }
        if (req.body.cardNumber != null) {
            card.cardNumber = req.body.cardNumber;
        }
        if (req.body.expireMonth != null) {
            card.expireMonth = req.body.expireMonth;
        }
        if (req.body.cvv != null) {
            card.cvv = req.body.cvv;
        }

        const updatedCard = await card.save();

        res.status(200).json({
            message:'Card updated successfully',
            data: updatedCard
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Controller function to delete a card by ID
const deleteCardById = async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({
            _id: req.params.id,
        });
        if (!card) {
            return res.status(404).json({ 
                message: "Card not found" });
        }
        res.json({message: 'Deleted card successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    updateCardById,
    deleteCardById,
};
