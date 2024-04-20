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
    role: "user",
  });

  if (user) {
    sendActivationEmail(user._id, user.email, generateToken(user._id));
    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      loginDate: user.loginDate,
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
    // if (user.activated) {
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

    // } else {
    //   res.status(403).json({ state: "fail", message: "Non activated account" });
    // }
  } else {
    res.status(401).json({ state: "fail", message: "Invalid credential" });
  }
});
const activateAccount = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ token: token });

    if (user) {
      user.activated = true;
      await user.save();

      return res.redirect("/login");
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

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
};
