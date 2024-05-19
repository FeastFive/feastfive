const express = require("express");
const router = express.Router();

const {
  addMeal,
  updateMeal,
  deleteMeal,
  getKitchens,
  addComment,
  checkComment,
  updateComment,
} = require("./../controllers/mealController");
router.post("/addMeal", addMeal);
router.post("/updateMeal", updateMeal);
router.post("/deleteMeal", deleteMeal);
router.post("/addComment", addComment);
router.post("/checkComment", checkComment);
router.post("/updateComment", updateComment);
router.get("/getKitchens", getKitchens);

module.exports = router;
