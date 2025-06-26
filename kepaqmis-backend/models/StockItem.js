const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema({
  sourceType: {
    type: String,
    enum: ["purchase", "requested-issue", "direct-issue"],
    required: true,
  },
  orderNo: { type: String, required: true },
  supplyOrderNo: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  billInvoiceNo: { type: String, required: true },
  verifyDate: { type: Date },
  Qmno: { type: String, required: true },
  itemName: { type: String, required: true },
  itemCategory: { type: String, required: true },
  itemSubCategory: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String },
  make: { type: String, required: true },
  model: { type: String, required: true },
  modelNo: { type: String, required: true },
  fromWhomPurchased: { type: String, required: true },
  toWhom: { type: String, required: true },
  warranty: { type: Number },
  typeofFund: { type: String, enum: ["A", "B", "C"] },
  amount: { type: Number },
  amountType: { type: String, enum: ["Cash", "Credit"], required: true },
  amountDetails: {
    cashAmount: { type: Number },
    creditStatus: { type: String, enum: ["Pending", "Approved"] },
  },
  enteredBy: {
    pen: { type: String },
    name: { type: String },
  },
  serialNumber: { type: String },
  dateOfVerification: { type: Date },
  verifiedBy: {
    pen: { type: String },
  },
  perishable: { type: Boolean, default: false },
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
