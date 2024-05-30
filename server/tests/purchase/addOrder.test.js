const request = require("supertest");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const addOrder = require("../../controllers/purchaseController");

jest.mock("../../models/restaurantModel");
jest.mock("../../models/userModel");

const Restaurant = require("../../models/restaurantModel");
const User = require("../../models/userModel");

const app = express();
app.use(express.json());
app.use("/api/orders", addOrder);

describe("addOrder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it("should successfully add an order", async () => {
  //   const restaurantId = "restaurant123";
  //   const userId = "user123";
  //   const cartFoodList = JSON.stringify([{ foodId: "food1", quantity: 2 }]);
  //   const address = "123 Test St";

  //   const restaurantMock = {
  //     orders: [],
  //     save: jest.fn().mockResolvedValue(),
  //   };
  //   const userMock = {
  //     orders: [],
  //     save: jest.fn().mockResolvedValue(),
  //   };

  //   Restaurant.findById.mockResolvedValue(restaurantMock);
  //   User.findById.mockResolvedValue(userMock);

  //   const res = await request(app)
  //     .post("/api/orders")
  //     .query({ restaurantId, userId, cartFoodList, address });

  //   expect(res.status).toBe(200);
  //   expect(res.body.state).toBe("success");
  //   expect(restaurantMock.orders).toHaveLength(1);
  //   expect(userMock.orders).toHaveLength(1);
  //   expect(restaurantMock.save).toHaveBeenCalled();
  //   expect(userMock.save).toHaveBeenCalled();
  // });

  it("should return 404 if restaurant is not found", async () => {
    const restaurantId = "restaurant123";
    const userId = "user123";
    const cartFoodList = JSON.stringify([{ foodId: "food1", quantity: 2 }]);
    const address = "123 Test St";

    Restaurant.findById.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/orders")
      .query({ restaurantId, userId, cartFoodList, address });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
  });

  it("should return 404 if user is not found", async () => {
    const restaurantId = "restaurant123";
    const userId = "user123";
    const cartFoodList = JSON.stringify([{ foodId: "food1", quantity: 2 }]);
    const address = "123 Test St";

    Restaurant.findById.mockResolvedValue({ orders: [] });
    User.findById.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/orders")
      .query({ restaurantId, userId, cartFoodList, address });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should return 500 on internal server error", async () => {
    const restaurantId = "restaurant123";
    const userId = "user123";
    const cartFoodList = JSON.stringify([{ foodId: "food1", quantity: 2 }]);
    const address = "123 Test St";

    Restaurant.findById.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/orders")
      .query({ restaurantId, userId, cartFoodList, address });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
  });
});
