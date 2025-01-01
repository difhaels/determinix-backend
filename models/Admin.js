const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
