const mongoose = require('mongoose');

const tempStockSchema = new mongoose.Schema({
  slNo: { type: String, required: true },
  PENNo: { type: String, required: true },
  toWhom: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String,required: true  },
  dateOfissue: { type: String, required: true },
  amount: { type: Number, required: true },
  itemDescription: { type: String, required: true },
  purpose: { type: String, required: true },
  qty: { type: Number, required: true },
  office: { type: String, required: true },
});

module.exports = mongoose.model('TempStock', tempStockSchema);
