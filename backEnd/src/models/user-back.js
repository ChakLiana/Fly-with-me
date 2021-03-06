const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nickName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  token: String,
});

module.exports = mongoose.model("User", userSchema);
