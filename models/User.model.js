const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userModel = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.+\S+/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: true,
    match: [
      /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/,
      "Must contain at least one letter and one number or special character.",
    ],
  },
});

module.exports = model("User", userModel);
