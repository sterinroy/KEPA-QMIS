const mongoose = require("mongoose");

const UserIssuedItemSchema = new mongoose.Schema({
  user: {
    pen: { type: String, required: true },
    name: { type: String, required: true },
  },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "StockItem", required: true },
  quantity: { type: Number, required: true, min: 1 },
  issuedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserIssuedItem", UserIssuedItemSchema);
