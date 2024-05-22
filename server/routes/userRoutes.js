const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  activateAccount,
  getOrders,
  editUser,
} = require("../controllers/authController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/editUser", editUser);
router.post("/getOrders", getOrders);
router.get("/verify/:uniqueId", activateAccount);

module.exports = router;
