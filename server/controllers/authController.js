const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendActivationEmail } = require("./mailer");

// register a new user
// route /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;
  //validation
  if (!name || !surname || !email || !password) {
    res.status(400);
    console.log(name, surname, email, password);
    throw new Error("Please include all fields");
  }
  //Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  }
  const uniqueId = randString();
  //Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    surname,
    email,
    loginDate: new Date(),
    password: hashedPassword,
    uniqueId: uniqueId,
    role: "user",
  });

  if (user) {
    sendActivationEmail(user.uniqueId, user.email);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      loginDate: user.loginDate,
      uniqueId: user.uniqueId,
      token: generateToken(user._id),
      activated: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.activated) {
      user.loginDate = new Date();
      await user.save();
      res.status(200).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        createdAt: user.createdAt,
        loginDate: user.loginDate,
        role: user.role,
        logs: user.logs,
        activated: user.activated,
      });
    } else {
      res.status(403).json({ state: "fail", message: "Non activated account" });
    }
  } else {
    res.status(401).json({ state: "fail", message: "Invalid credential" });
  }
});

const activateAccount = asyncHandler(async (req, res) => {
  try {
    const { uniqueId } = req.params;

    console.log("Activation code, uniqueId:", uniqueId);

    const user = await User.findOne({ uniqueId: uniqueId });

    if (user) {
      user.activated = true;
      await user.save();
      console.log(user);
      return res.redirect("http://localhost:3000/login");
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get restaurant
// route api/users/getOrders
const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const order = await User.findById(id, {
      _id: 0,
      orders: 1,
    });

    console.log(order);

    if (!order) {
      res.status(404).json({ message: "No order found" });
      return;
    }

    res.status(200).json({
      orders: order,
    });
  } catch (error) {
    console.error("Error retrieving users from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10) + 1;
    randStr += ch;
  }
  return randStr;
};

//Generating a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  activateAccount,
  getOrders,
};
