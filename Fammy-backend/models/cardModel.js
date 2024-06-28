const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    cardholderName: {
        type : String,
        required : true
    },
    cardNumber: {
        type : Number,
        required : true
    },
    expireMonth: {
        type : String,
        required : true
    },
    cvv: {
        type : Number,
        required : true
    },
    
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Card",cardSchema);