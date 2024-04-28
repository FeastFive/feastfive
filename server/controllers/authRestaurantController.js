const Restaurant = require("../models/restaurantModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendActivationRestaurantEmail } = require("./mailer");

//register as a new restaurant
// route api/restaurant/
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

  const uniqueId = randString();
  // Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create restaurant
  const restaurant = await Restaurant.create({
    restaurantName,
    ownerName,
    ownerSurname,
    email,
    uniqueId: uniqueId,
    loginDate: new Date(),
    password: hashedPassword,
  });

  if (restaurant) {
    console.log(restaurant.email);
    sendActivationRestaurantEmail(restaurant.uniqueId, restaurant.email);
    res.status(201).json({
      _id: restaurant._id,
      restaurantName: restaurant.restaurantName,
      ownerName: restaurant.ownerName,
      ownerSurname: restaurant.ownerSurname,
      email: restaurant.email,
      uniqueId: restaurant.uniqueId,
      loginDate: restaurant.loginDate,
      token: generateToken(restaurant._id),
      activated: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid restaurant data");
  }
});

// route api/restaurant/login
const loginRestaurant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find restaurant
  const restaurant = await Restaurant.findOne({ email });

  if (restaurant && (await bcrypt.compare(password, restaurant.password))) {
    if (restaurant.activated) {
      restaurant.loginDate = new Date();
      await restaurant.save();
      res.status(200).json({
        _id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        ownerName: restaurant.ownerName,
        email: restaurant.email,
        uniqueId: restaurant.uniqueId,
        createdAt: restaurant.createdAt,
        loginDate: restaurant.loginDate,
        role: restaurant.role,
        meals: restaurant.meals,
        orders: restaurant.orders,
        labels: restaurant.labels,
        activated: restaurant.activated,
      });
    } else {
      res.status(403).json({ state: "fail", message: "Non activated account" });
    }
  } else {
    res.status(401).json({ state: "fail", message: "Invalid credential" });
  }
});

const activateRestaurantAccount = asyncHandler(async (req, res) => {
  try {
    const { uniqueId } = req.params;
    console.log("Activation code, uniqueId:", uniqueId);

    const restaurant = await Restaurant.findOne({ uniqueId: uniqueId });

    if (restaurant) {
      restaurant.activated = true;
      await restaurant.save();
      console.log(restaurant);
      return res.redirect("http://localhost:3000/restaurantLogin");
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
  registerRestaurant,
  loginRestaurant,
  activateRestaurantAccount,
};
