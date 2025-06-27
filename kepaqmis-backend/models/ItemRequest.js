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
    deductedQty: Number,
    returnedQty: { type: Number, default: 0 }
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
},
technicalReportRequired: { type: Boolean, default: false },
technicalWing: { type: String },
technicalReportNo: { type: String },
returnCategory: {
  type: String,
  enum: ["Damaged", "Repairable", "Reusable"],
}


});

module.exports = mongoose.model("ItemRequest", itemRequestSchema);
