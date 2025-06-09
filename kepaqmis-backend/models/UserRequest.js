const mongoose = require("mongoose");

const UserRequestSchema = new mongoose.Schema({
  user: {
    pen: { type: String, required: true },
    name: { type: String, required: true },
  },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "StockItem", required: true },
  quantity: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedAt: { type: Date, default: Date.now },
  approvedAt: Date,
  approvedBy: {
    pen: String,
    name: String,
  },
});

module.exports = mongoose.model("UserRequest", UserRequestSchema);
