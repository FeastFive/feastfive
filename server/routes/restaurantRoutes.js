const express = require("express");
const router = express.Router();

const {
  registerRestaurant,
  loginRestaurant,
  activateRestaurantAccount,
  getRestaurant,
} = require("../controllers/authRestaurantController");

router.post("/", registerRestaurant);
router.post("/login", loginRestaurant);
router.get("/verify/:uniqueId", activateRestaurantAccount);
router.get("/getRestaurant", getRestaurant);

module.exports = router;
