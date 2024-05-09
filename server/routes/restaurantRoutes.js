const express = require("express");
const router = express.Router();

const {
  registerRestaurant,
  loginRestaurant,
  activateRestaurantAccount,
  getRestaurant,
  updateRestaurant,
  updateLabel,
  getSpecificRestaurant,
} = require("../controllers/authRestaurantController");

router.post("/", registerRestaurant);
router.post("/login", loginRestaurant);
router.post("/updateRestaurant", updateRestaurant);
router.post("/updateLabel", updateLabel);
router.get("/verify/:uniqueId", activateRestaurantAccount);
router.get("/getRestaurant", getRestaurant);
router.get("/getSpecificRestaurant", getSpecificRestaurant);

module.exports = router;
