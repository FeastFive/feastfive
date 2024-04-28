const express = require("express");
const router = express.Router();

const {
  registerRestaurant,
  loginRestaurant,
} = require("../controllers/authRestaurantController");

router.post("/", registerRestaurant);
router.post("/login", loginRestaurant);

module.exports = router;
