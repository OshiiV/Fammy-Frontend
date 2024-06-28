const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    city: {
        type : String,
        required : true
    },
    zip: {
        type : String,
        required : true
    },
    country: {
        type : String,
        required : true
    },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment",userSchema);