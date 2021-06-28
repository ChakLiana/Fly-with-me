const mongoose = require("mongoose");

const Ivent = mongoose.model("Ivent", {
  coords: {
    type: Array,
    required: true,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateOfEvent: Date,
  IventImg: String,
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: String,
  description: String,
  stopList: String,
});

module.exports = Ivent;
