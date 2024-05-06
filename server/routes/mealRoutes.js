const express = require("express");
const router = express.Router();

const {
  addMeal,
  updateMeal,
  deleteMeal,
  getKitchens,
} = require("./../controllers/mealController");
router.post("/addMeal", addMeal);
router.get("/getKitchens", getKitchens);
router.post("/updateMeal", updateMeal);
router.post("/deleteMeal", deleteMeal);

module.exports = router;
