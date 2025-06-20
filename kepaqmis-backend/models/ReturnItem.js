const mongoose = require("mongoose");

const returnItemSchema = new mongoose.Schema({
  user: {
    pen: { type: String, required: true },
    name: { type: String, required: true },
  },
  stockItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockItem",
    required: true,
  },
  quantity: { type: Number, required: true },
  itemCategory: {
    type: String,
    enum: ["Damaged", "Repairable", "Reusable"],
  },
  returnDate: { type: Date, default: Date.now },
  processedBy: {
    pen: { type: String },
    name: { type: String },
  },
  processedAt: { type: Date },
});

module.exports = mongoose.model("ReturnItem", returnItemSchema);
