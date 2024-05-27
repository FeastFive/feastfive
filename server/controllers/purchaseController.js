const Restaurant = require("./../models/restaurantModel");
const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const addOrder = asyncHandler(async (req, res) => {
  const { restaurantId, userId, cartFoodList, adress } = req.query;

  console.log(adress);

  try {
    const restaurant = await findRestaurantById(restaurantId);
    const user = await findUserById(userId);

    if (!restaurant) {
      return sendErrorResponse(res, 404, "Restaurant not found");
    }

    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const orderId = uuidv4();
    const parsedCartFoodList = JSON.parse(cartFoodList);
    const newOrder = {
      restaurantId: restaurantId,
      userId: userId,
      orderId: orderId,
      adress: adress,
      cartFoodList: parsedCartFoodList,
      status: "In Progress",
      activate: true,
    };
    console.log(cartFoodList[0]);

    restaurant.orders.push(newOrder);
    user.orders.push(newOrder);

    await Promise.all([restaurant.save(), user.save()]);

    res.status(200).redirect("http://localhost:3000/purchaseAccepted").json({
      orders: user.orders,
      state: "success",
    });
  } catch (error) {
    console.error("Error adding order:", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
});

const findRestaurantById = async (id) => {
  try {
    return await Restaurant.findById(id);
  } catch (error) {
    console.error("Error finding restaurant:", error);
    return null;
  }
};

const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
};

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

module.exports = addOrder;
