const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Please provide restaurant name"],
    },
    restaurantId: {
      type: Object,
      required: [true, "Id is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide meal name"],
    },
    price: {
      type: Number,
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
