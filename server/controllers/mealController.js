const Meal = require("./../models/mealModel");
const Restaurant = require("./../models/restaurantModel");
const asyncHandler = require("express-async-handler");

const addMeal = asyncHandler(async (req, res) => {
  const { restaurantId, name, price, description, image, options } = req.body;

  if (!name || !price || !description || !image) {
    res.status(400).json({ message: "Please include all fields" });
    return;
  }

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId);
  } catch (err) {
    console.error("Error finding restaurant:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  if (!restaurant) {
    res.status(404).json({ message: "Restaurant not found" });
    return;
  }

  const newMeal = { name, price, description, image, options };
  restaurant.meals.push(newMeal);

  try {
    await restaurant.save();
  } catch (err) {
    console.error("Error saving restaurant:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  let meal;
  try {
    meal = await Meal.create({
      restaurantName: restaurant.name,
      restaurantId: restaurant.id,
      name,
      price,
      description,
      image,
      options,
      additionDate: new Date(),
    });
  } catch (err) {
    console.error("Error creating meal:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  res.status(201).json(meal);
});

module.exports = addMeal;
