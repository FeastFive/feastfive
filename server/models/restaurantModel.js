const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Please provide restaurant name"],
    },
    ownerName: {
      type: String,
      required: [true, "Please provide restaurant name"],
    },
    ownerSurname: {
      type: String,
      required: [true, "Please provide restaurant name"],
    },
    adress: {
      type: Object,
    },
    image: {
      type: String,
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
      enum: ["restaurant"],
      default: "restaurant",
    },
    meals: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    labels: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
