const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema({
  sourceType: {
    type: String,
    enum: ["purchase", "requested-issue", "direct-issue"],
    required: true,
  },
  orderNo: { type: String },
  supplyOrderNo: { type: String },
  invoiceDate: { type: Date },
  Qmno: { type: String, required: true },
  itemName: { type: String, required: true },
  itemCategory: { type: String, required: true },
  itemSubCategory: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  make: { type: String },
  model: { type: String },
  modelNo: { type: String },
  fromWhomPurchased: { type: String },
  toWhom: { type: String },
  billInvoiceNo: { type: String },
  amount: { type: Number },
  enteredBy: {
    pen: { type: String },
    name: { type: String },
  },
  serialNumber: { type: String },
  dateOfVerification: { type: Date },
  verifiedBy: {
    pen: { type: String },
    name: { type: String },
  },
  perisible: { type: Boolean, default: false },
  dateOfPurchase: { type: Date },
  dateOfIssue: { type: Date },
  purchaseEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseEntry",
  },
  issuedfrom: { type: String },
  indentNo: { type: String },
  barcodeCode: { type: String },
  barcodeImage: { type: String },
});

module.exports = mongoose.model("StockItem", stockItemSchema);
