const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    surname: {
      type: String,
      required: [true, "Please provide a surname"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    loginDate: {
      type: Date,
      default: Date.now,
    },
    uniqueId: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    comments: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    address: {
      type: Array,
      default: [],
    },
    // image: {
    //   type: String,
    //   default: "",
    // },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
