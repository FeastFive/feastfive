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
  getSearchRestaurants,
  getOrders,
  editRestaurant,
  deleteRestaurant,
  forgotPassRestaurant,
  forgotPassRedirect,
  changePassword,
} = require("../controllers/authRestaurantController");

router.post("/", registerRestaurant);
router.post("/login", loginRestaurant);
router.post("/updateRestaurant", updateRestaurant);
router.post("/updateLabel", updateLabel);
router.post("/editRestaurant", editRestaurant);
router.post("/deleteRestaurant", deleteRestaurant);
router.post("/getSearchRestaurants", getSearchRestaurants);
router.get("/verify/:uniqueId", activateRestaurantAccount);
router.get("/getRestaurant", getRestaurant);
router.post("/getOrders", getOrders);
router.post("/getSpecificRestaurant", getSpecificRestaurant);
router.post("/forgotPassRestaurant", forgotPassRestaurant);
router.get("/forgot/:uniqueId", forgotPassRedirect);
router.post("/changePassword", changePassword);

module.exports = router;
