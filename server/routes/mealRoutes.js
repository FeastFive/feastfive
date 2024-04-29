const express = require("express");
const router = express.Router();

const { addMeal } = require("./../controllers/mealController");
router.post("/addMeal", addMeal);

module.exports = router;
