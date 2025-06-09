// models/PendingPurchase.js
const mongoose = require("mongoose");

const PendingPurchaseSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  addedBy: {
    pen: { type: String, required: true },
    name: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PendingPurchase", PendingPurchaseSchema);
