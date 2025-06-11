const mongoose = require("mongoose");

const purchaseEntrySchema = new mongoose.Schema({
  orderNo: { type: String },
  supplyOrderNo: { type: String },
  invoiceDate: { type: Date },
  itemCategory: { type: String },
  quantity: { type: Number },
  fromWhomPurchased: { type: String },
  toWhom: { type: String },
  billInvoiceNo: { type: String },
  amount: { type: Number },
  enteredBy: {
    pen: { type: String },
    name: { type: String }
  },
  status: {
    type: String,
    enum: ["Pending", "Verified"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PurchaseEntry", purchaseEntrySchema);