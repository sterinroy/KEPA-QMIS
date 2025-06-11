const mongoose = require("mongoose");

const userIssuedItemSchema = new mongoose.Schema({
  user: {
    pen: { type: String, required: true },
    name: { type: String, required: true }
  },
  stockItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockItem",
    required: true
  },
  quantity: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now },
  issuedBy: {
    pen: { type: String },
    name: { type: String }
  },
  isTemporary: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["active", "returned"],
    default: "active"
  }
});

module.exports = mongoose.model("UserIssuedItem", userIssuedItemSchema);