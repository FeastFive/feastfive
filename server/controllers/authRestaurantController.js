const Restaurant = require("./../models/restaurantModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendActivationEmail } = require("./mailer");

//register as a new restaurant
// route api/users/resRegister
const registerRestaurant = asyncHandler(async (req, res) => {
  const { restaurantName, ownerName, ownerSurname, email, password } = req.body;

  //validation
  if (!restaurantName || !ownerName || !ownerSurname || !email || !password) {
    res.status(400);
    console.log(restaurantName, ownerName, ownerSurname, email, password);
    throw new Error("Please include all fields");
  }

  //Find if restaurant already exists
  const restaurantExists = await Restaurant.findOne({ email });
  if (restaurantExists) {
    res.status(401);
    throw new Error("Restaurant already exists");
  }

  // Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create restaurant
  const restaurant = await Restaurant.create({
    restaurantName,
    ownerName,
    ownerSurname,
    email,
    loginDate: new Date(),
    password: hashedPassword,
  });

  if (restaurant) {
    sendActivationEmail(restaurant.email);
    res.status(201).json({
      _id: restaurant._id,
      restaurantName: restaurant.restaurantName,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
      loginDate: restaurant.loginDate,
      token: generateToken(user._id),
      activated: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid restaurant data");
  }
});

const loginRestaurant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find restaurant
  const restaurant = await Restaurant.findOne({ email });

  if (restaurant && (await bcrypt.compare(password, user.password))) {
    //if(restauran.activated)
    restaurant.loginDate = new Date();
    await restaurant.save();
    res.status(200).json({
      _id: restaurant._id,
      restaurantName: restaurant.restaurantName,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
      createdAt: restaurant.createdAt,
      loginDate: restaurant.loginDate,
      role: user.role,
      meals: restaurant.meals,
      orders: restaurant.orders,
      labels: restaurant.labels,
      activated: user.activated,
    });
  } else {
    res.status(401).json({ state: "fail", message: "Invalid credential" });
  }
});

//Generating a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = {
  registerRestaurant,
  loginRestaurant,
};
