const mongoose = require("mongoose");

const itemCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subcategories: [{ type: String }],
});

module.exports = mongoose.model("Item Category", itemCategorySchema);
