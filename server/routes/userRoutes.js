const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  activateAccount,
} = require("../controllers/authController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/verify/:_id", activateAccount);

module.exports = router;
