const mongoose = require("mongoose");

const StockTransactionSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockItem",
    required: true,
  },
  action: {
    type: String,
    enum: ["Purchase", "Allocation", "DirectIssue", "TempIssue", "TempReturn"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  toUser: {
    pen: { type: String },
    name: { type: String },
  },
  from: {
    type: String, // Optional for Allocation
  },
  by: {
    pen: { type: String, required: true },
    name: { type: String, required: true },
  },
  remarks: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("StockTransaction", StockTransactionSchema);
