const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InformSchema = new Schema({
  name: {
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

module.exports = mongoose.model("Inform", InformSchema);
