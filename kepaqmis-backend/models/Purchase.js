const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  supply_order_no: String,
  invoice_date: Date,
  from_whom: String,
  to_whom: String,
  date_of_verification: Date,
  bill_invoice_no: String,
  amount: Number,
  item: String,
  sub_category: String,
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('Purchase', PurchaseSchema);
