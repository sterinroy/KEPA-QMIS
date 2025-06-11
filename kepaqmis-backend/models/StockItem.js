const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema({
  sourceType: {
    type: String,
    enum: ["purchase", "requested-issue"],
    required: true
  },
  Qmno: { type: String, required: true },
  itemName: { type: String, required: true },
  category: { type: String },
  quantity: { type: Number, required: true },
  unit: { type: String },
  make: { type: String },
  model: { type: String },
  serialNumber: { type: String },
  dateOfVerification: { type: Date },
  verifiedBy: {
    pen: { type: String },
    name: { type: String }
  },
  dateOfPurchase: { type: Date },
  dateOfIssue: { type: Date },
  from: { type: String },
  purchaseEntryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "PurchaseEntry" 
  },
  barcodeCode: { type: String },   
  barcodeImage: { type: String }
});

module.exports = mongoose.model("StockItem", stockItemSchema);