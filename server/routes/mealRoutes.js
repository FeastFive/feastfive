const express = require("express");
const router = express.Router();

const { addMeal, getKitchens } = require("./../controllers/mealController");
router.post("/addMeal", addMeal);
router.get("/getKitchens", getKitchens);

module.exports = router;
