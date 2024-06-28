const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  stockid: {
    type: String,
    required: true,
  },
  supplierid: {
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
  price: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("InventoryDB", InventorySchema);
