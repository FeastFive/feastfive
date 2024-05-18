const Meal = require("./../models/mealModel");
const Restaurant = require("./../models/restaurantModel");
const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const Kitchen = require("./../models/kithcensModel");
const { v4: uuidv4 } = require("uuid");

const getKitchens = asyncHandler(async (req, res) => {
  try {
    const getKitchens = await Kitchen.find();
    console.log(getKitchens);

    if (!getKitchens || getKitchens.length === 0) {
      res.status(404).json({ message: "No kitchens found" });
      return;
    }

    const kitchens = Object.values(getKitchens);

    res.status(200).json({
      kitchens: kitchens,
    });
  } catch (error) {
    console.error("Error retrieving kitchens from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateMeal = asyncHandler(async (req, res) => {
  const { id, mealId, updatedMealData } = req.body;
  console.log(req.body);

  if (!id || !mealId || !updatedMealData) {
    res
      .status(400)
      .json({ state: "fail", message: "Please include all fields" });
    return;
  }

  try {
    const restaurant = await Restaurant.findById(id);
    console.log(restaurant);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const mealIndex = restaurant.meals.findIndex((meal) => meal.id === mealId);
    if (mealIndex === -1) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }
    restaurant.meals[mealIndex] = {
      ...restaurant.meals[mealIndex],
      ...updatedMealData,
    };

    await restaurant.save();

    res
      .status(200)
      .json({ message: "Meal updated successfully", meals: restaurant.meals });
  } catch (err) {
    console.error("Error updating meal:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteMeal = asyncHandler(async (req, res) => {
  const { id, mealId } = req.body;

  if (!id || !mealId) {
    res
      .status(400)
      .json({ state: "fail", message: "Please include all fields" });
    return;
  }

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const mealIndex = restaurant.meals.findIndex((meal) => meal.id === mealId);
    if (mealIndex === -1) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    restaurant.meals.splice(mealIndex, 1);

    await restaurant.save();

    res
      .status(200)
      .json({ message: "Meal deleted successfully", meals: restaurant.meals });
  } catch (err) {
    console.error("Error deleting meal:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const addMeal = asyncHandler(async (req, res) => {
  const { id, name, price, description, image, options } = req.body;
  // if (!name || !price || !description || !image) {
  if (!name || !price) {
    res.status(400).json({ message: "Please include all fields" });
    return;
  }

  let restaurant;
  try {
    restaurant = await Restaurant.findById({ _id: id });
  } catch (err) {
    console.error("Error finding restaurant:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  if (!restaurant) {
    res.status(404).json({ message: "Restaurant not found" });
    return;
  }
  const mealId = uuidv4();

  const newMeal = {
    id: mealId,
    name,
    price,
    description,
    image,
    options,
  };
  restaurant.meals.push(newMeal);

  try {
    await restaurant.save();
    res.status(200).json({
      meals: restaurant.meals,
      state: "success",
    });
  } catch (err) {
    console.error("Error saving restaurant:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  // let meal;
  // try {
  //   meal = await Meal.create({
  //     restaurantName,
  //     restaurantEmail,
  //     name,
  //     price,
  //     description,
  //     image,
  //     options,
  //     additionDate: new Date(),
  //   });
  // } catch (err) {
  //   console.error("Error creating meal:", err);
  //   res.status(500).json({ message: "Internal server error" });
  //   return;
  // }

  // res.status(201).json(meal);
});

const addComment = asyncHandler(async (req, res) => {
  const { restId, userId, rating, comment } = req.body;

  try {
    if (!restId || !userId || !rating || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const restaurant = await Restaurant.findById(restId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = { id: uuidv4(), rating, comment };

    restaurant.comments.push(newComment);
    user.comments.push(newComment);

    await restaurant.save();
    await user.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comments: restaurant.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { addMeal, updateMeal, deleteMeal, getKitchens, addComment };
