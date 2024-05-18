const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  activateAccount,
  getOrders,
} = require("../controllers/authController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/getOrders", getOrders);
router.get("/verify/:uniqueId", activateAccount);

module.exports = router;
