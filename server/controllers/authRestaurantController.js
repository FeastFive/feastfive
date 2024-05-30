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
    // console.log(restaurantName, ownerName, ownerSurname, email, password);
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
    // console.log(restaurant.email);
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
        ownerSurname: restaurant.ownerSurname,
        email: restaurant.email,
        adress: restaurant.adress,
        // image: restaurant.image,
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
    // console.log("Activation code, uniqueId:", uniqueId);

    const restaurant = await Restaurant.findOne({ uniqueId: uniqueId });

    if (restaurant) {
      restaurant.activated = true;
      await restaurant.save();
      // console.log(restaurant);
      return res.redirect("http://localhost:3000/restaurantLogin");
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get restaurant
// route api/restaurant/getRestaurant
const getRestaurant = asyncHandler(async (req, res) => {
  try {
    const rest = await Restaurant.find(
      {},
      { password: 0, meals: 0, orders: 0 }
    );

    // console.log(rest);

    if (!rest || rest.length === 0) {
      res.status(404).json({ message: "No kitchens found" });
      return;
    }

    const restaurants = Object.values(rest);

    res.status(200).json({
      restaurants: restaurants,
    });
  } catch (error) {
    console.error("Error retrieving restaurants from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//post restaurant
// route api/restaurant/updateRestaurant
const updateRestaurant = asyncHandler(async (req, res) => {
  const { id, updatedFields } = req.body;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ state: "fail", message: "No restaurant found by id" });
    }

    Object.assign(restaurant, updatedFields);

    await restaurant.save();

    res.status(200).json({
      state: "success",
      message: "Restaurant updated successfully",
      updatedRestaurant: restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const editRestaurant = asyncHandler(async (req, res) => {
  const { id, ownerName, ownerSurname, restaurantName, adress, image } =
    req.body;

  const updateData = {
    ownerName,
    ownerSurname,
    restaurantName,
    adress,
  };

  if (image) {
    updateData.image = image;
  }

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, upsert: true, runValidators: true }
  );

  if (updatedRestaurant) {
    res.status(200).json({
      ownerName: updatedRestaurant.ownerName,
      ownerSurname: updatedRestaurant.ownerSurname,
      adress: updatedRestaurant.adress,
      restaurantName: updatedRestaurant.restaurantName,
      image: updatedRestaurant.image,
    });
  } else {
    res.status(404).json({ status: "fail", message: "Restaurant not found" });
  }
});

const deleteRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

  if (deletedRestaurant) {
    res.status(200).json({
      status: "success",
      message: "Restaurant deleted successfully",
    });
  } else {
    res.status(404).json({ status: "fail", message: "Restaurant not found" });
  }
});

//get restaurant
// route api/restaurants/getSpecificRestaurant
const getSpecificRestaurant = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  // console.log(id);
  try {
    const rest = await Restaurant.findById(id, {
      password: 0,
      orders: 0,
    });

    console.log(rest);

    if (!rest) {
      res.status(404).json({ message: "No restaurant found" });
      return;
    }

    res.status(200).json({
      restaurant: rest,
    });
  } catch (error) {
    console.error("Error retrieving restaurants from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get restaurant
// route api/restaurants/getOrders
const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const order = await Restaurant.findById(id, {
      _id: 0,
      orders: 1,
    });

    // console.log(order);

    if (!order) {
      res.status(404).json({ message: "No order found" });
      return;
    }

    res.status(200).json({
      orders: order,
    });
  } catch (error) {
    console.error("Error retrieving restaurants from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getSearchRestaurants = asyncHandler(async (req, res) => {
  const key = req.body.key;
  const regex = new RegExp(`^${key}`, "i");

  try {
    const filteredRestaurants = await Restaurant.find(
      {
        $or: [
          { restaurantName: { $regex: regex } },
          { labels: { $elemMatch: { label: { $regex: regex } } } },
        ],
      },
      {
        password: 0,
        meals: 0,
        image: 0,
        labels: 0,
        orders: 0,
      },
      {
        sort: {
          restaurantName: 1,
          labels: 1,
        },
        limit: 3000,
      }
    );

    if (filteredRestaurants.length > 0) {
      res.status(200).send(filteredRestaurants);
    } else {
      res.status(404).send({ state: "fail", cause: "Can't find products" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const updateLabel = asyncHandler(async (req, res) => {
  const { id, labels } = req.body;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ state: "fail", message: "No restaurant found by id" });
    } else {
      restaurant.labels = labels;

      await restaurant.save();

      res
        .status(200)
        .json({ state: "success", message: "Labels updated successfully" });
    }
  } catch (error) {
    console.error("Error updating restaurant label from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const forgotPassRestaurant = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Please include all fields" });
    return;
  }

  try {
    const resExists = await Restaurant.findOne({ email });
    if (!resExists) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    await forgotPasswordEmail(resExists.uniqueId, resExists.email);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const forgotPassRedirect = asyncHandler(async (req, res) => {
  try {
    const { uniqueId } = req.params;

    console.log("Activation code, uniqueId:", uniqueId);

    const restaurant = await Restaurant.findOne({ uniqueId: uniqueId });

    if (restaurant) {
      return res.redirect(
        `http://localhost:3000/restaurantChangePassword?uniqueId=${uniqueId}`
      );
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    // const { uniqueId } = req.query;
    const { uniqueId, newPassword } = req.body;
    // console.log("uniqueId");
    // console.log(uniqueId);

    if (!newPassword) {
      return res.status(400).json({ error: "Password does not exist" });
    }

    const restaurant = await Restaurant.findOne({ uniqueId: uniqueId });

    if (!restaurant) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    restaurant.password = hashedPassword;
    await restaurant.save();

    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  updateRestaurant,
  updateLabel,
  getRestaurant,
  getSpecificRestaurant,
  getSearchRestaurants,
  getOrders,
  editRestaurant,
  deleteRestaurant,
  forgotPassRestaurant,
  forgotPassRedirect,
  changePassword,
};
