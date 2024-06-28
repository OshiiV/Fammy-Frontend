const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AllocateSchema = new Schema({
  stockid: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Allocate", AllocateSchema);
