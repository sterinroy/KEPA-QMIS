const mongoose = require("mongoose");

const StockItemSchema = new mongoose.Schema({

  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true },
  purchaseType: {
    type: String,
    enum: ["Purchased", "DirectIssue", "Quota"],
    required: true
  },
  make: String,
  model: String,
  batchNo: String,
  description: String,
  location: { type: String, default: "Main Store" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StockItem", StockItemSchema);
