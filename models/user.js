const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt-as-promised");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.statics.findOrCreateUser = async function(email, password) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      return user;
    } else {
      const newUser = new User({ email: email, password: password });
      return newUser.save();
    }
  } catch (e) {
    return e;
  }
};

userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (e) {
    throw new Error("invalid password");
  }
};

userSchema.pre("save", async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (e) {
    next(e);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
