const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      loginDate: user.loginDate,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
};
