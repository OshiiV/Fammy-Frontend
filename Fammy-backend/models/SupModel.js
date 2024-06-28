const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mat: {
        type:String,
        required: true,
        
    },
    color: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
    },
    quan: {
        type: Number,
        required: true,
    },
   
});


const SupModel = mongoose.model("Supplier", userSchema);
module.exports = SupModel;