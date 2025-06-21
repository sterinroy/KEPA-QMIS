const mongoose = require("mongoose");

const purchaseEntrySchema = new mongoose.Schema({
  orderNo: { type: String, required: true },
  supplyOrderNo: { type: String },
  invoiceDate: { type: Date, required: true },
  itemName: { type: String, required: true },
  itemCategory: { type: String, required: true },
  itemSubCategory: { type: String },
  quantity: { type: Number },
  unit: { type: String },
  fromWhomPurchased: { type: String },
  toWhom: { type: String },
  billInvoiceNo: { type: String },
  amount: { type: Number },
  amountType: {
    type: String,
    enum: ["Cash", "Credit"],
    required: true,
  },
  amountDetails: {
    cashAmount: { type: Number },
    creditStatus: {
      type: String,
      enum: ["Pending", "Approved"],
    },
  },
  enteredBy: {
    pen: { type: String },
    name: { type: String },
  },
  status: {
    type: String,
    enum: ["Pending", "Verified"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PurchaseEntry", purchaseEntrySchema);
