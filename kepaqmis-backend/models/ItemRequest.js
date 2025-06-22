const mongoose = require("mongoose");

const itemRequestSchema = new mongoose.Schema({
  requestedBy: {
    pen: { type: String },
    name: { type: String },
  },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "StockItem", required: true },
  requestedQty: { type: Number, required: true },
  unit: { type: String },
  temporary: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "returned"],
    default: "pending"
  },
  remarks: { type: String },
  dateOfrequest: { type: Date },
  toWhom: { type: String },
  mobile: { type: String },
  slNo: { type: String },
  issuedFrom: [{
    stockItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockItem' },
    deductedQty: Number
  }],
  approvedBy: {
    pen: { type: String },
    name: { type: String }
  },
  approvedDate: { type: Date },
  returnDate: { type: Date },
  indentBillId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "IndentBill",
}

});

module.exports = mongoose.model("ItemRequest", itemRequestSchema);
