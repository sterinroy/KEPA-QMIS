const mongoose = require("mongoose");

const ReturnItemSchema = new mongoose.Schema({
  user: {
    pen: { type: String, required: true },
    name: { type: String, required: true },
  },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "StockItem", required: true },
  quantity: { type: Number, required: true, min: 1 },
  category: {
    type: String,
    enum: ["Damaged", "Repairable", "Reusable"],
    required: true,
  },
  returnDate: { type: Date, default: Date.now },
  processedBy: {
    pen: String,
    name: String,
  },
  processedAt: Date,
});

module.exports = mongoose.model("ReturnItem", ReturnItemSchema);
