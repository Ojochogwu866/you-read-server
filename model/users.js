const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    facebookId: {
      type: String,
      unique: true,
      required: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    email: {
      type: String,
      maxlength: 255,
      minlength: 6,
    },
    password: {
      type: String,
      maxlength: 1024,
      minlength: 6,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
