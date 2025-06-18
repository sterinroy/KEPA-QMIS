const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subcategories: [{ type: String }]
});

module.exports = mongoose.model("ItemCategory", categorySchema);
