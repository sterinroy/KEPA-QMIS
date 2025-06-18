const mongoose = require("mongoose");

const itemRequestSchema = new mongoose.Schema({
  requestedBy: {
    pen: { type: String },
    name: { type: String },
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockItem",
    required: true
  },
  requestedQty: { type: Number, required: true },
  unit: { type: String },
  temporary: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "returned"],
    default: "pending"
  },
  issuedFrom: [{
  stockItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockItem' },
  deductedQty: Number
}],
  approvedBy: {
    pen: { type: String },
    name: { type: String }
  },
  approvedDate: { type: Date },
  returnDate: { type: Date }
});

module.exports = mongoose.model("ItemRequest", itemRequestSchema);
