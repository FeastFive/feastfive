const express = require("express");
const router = express.Router();

const {
  addMeal,
  updateMeal,
  getKitchens,
} = require("./../controllers/mealController");
router.post("/addMeal", addMeal);
router.get("/getKitchens", getKitchens);
router.post("/updateMeal", updateMeal);

module.exports = router;
