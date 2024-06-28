const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },

  measurements: {
    type: String,
    required: true,
  },
  materials: {
    type: String,
    required: true,
  },
  advance: {
    type: Number,
    required: true,
  },

});

const CutOrderModel = mongoose.model("OrderDetas", userSchema);

module.exports = CutOrderModel;