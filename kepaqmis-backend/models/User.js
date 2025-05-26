const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  pen: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['QuarterMaster', 'User', 'Admin'],
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
