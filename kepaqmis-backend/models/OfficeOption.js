const mongoose = require("mongoose");

const officeOptionSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("OfficeOption", officeOptionSchema);
