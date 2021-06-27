const mongoose = require("mongoose");
const Schema = mongoose.Schema;





const userSchema = new Schema({
  email: { type: String, unique: false },
  password: { type: String, required: true },
  nickName: { type: String, unique: false, required: false },
  age: Number,
  weight: Number,
  tel: Number,
  photo: String,
  experience: Number,
  fHours: Number,
  role: { type: String, required: true },
  ivents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ivent" }],
  id: String,
});


// Create reference to User & export
const User = mongoose.model("User", userSchema);
module.exports = User;
