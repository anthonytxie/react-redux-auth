const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
