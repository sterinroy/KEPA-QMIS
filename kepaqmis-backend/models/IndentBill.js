const mongoose = require("mongoose");

const IndentBillSchema = new mongoose.Schema({
  stationNo: String,
  officeNo: String,
  storeNo: String,
  indentFor: [String],
  qty: [String],
  subCategory: String,
  date: String,
  nameAndDesignation: String,
  createdBy: {
    pen: String,
    name: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("IndentBill", IndentBillSchema);
