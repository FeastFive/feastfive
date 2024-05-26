const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  activateAccount,
  getOrders,
  editUser,
  deleteUser,
  addAdress,
  getAdress,
} = require("../controllers/authController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/editUser", editUser);
router.post("/deleteUser", deleteUser);
router.post("/addAdress", addAdress);
router.post("/getOrders", getOrders);
router.post("/getAdress", getAdress);
router.get("/verify/:uniqueId", activateAccount);

module.exports = router;
