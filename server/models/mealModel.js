const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
    },
    restaurantId: {
      type: String,
      required: [true, "Id is required"],
      unique: true,
    },
    restaurantEmail: {
      type: String,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Please provide meal name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    options: {
      type: Array,
      default: [],
    },
    additionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
