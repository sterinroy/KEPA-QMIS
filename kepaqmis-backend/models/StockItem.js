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
  billInvoiceNo: { type: String },
  verifyDate: { type: Date },
  Qmno: { type: String },
  itemName: { type: String },
  itemCategory: { type: String },
  itemSubCategory: { type: String },
  quantity: { type: Number },
  unit: { type: String },
  make: { type: String },
  model: { type: String },
  modelNo: { type: String },
  fromWhomPurchased: { type: String },
  toWhom: { type: String },
  warranty: { type: Number },
  typeofFund: { type: String, enum: ["A", "B", "C"] },
  amount: { type: Number },
  amountType: { type: String, enum: ["Cash", "Credit"] },
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
