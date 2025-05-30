const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  pen: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  action: { type: String, enum: ["login", "logout"], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);
