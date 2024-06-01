const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

jest.mock("../../models/restaurantModel");
jest.mock("../../models/userModel");

const Restaurant = require("../../models/restaurantModel");
const User = require("../../models/userModel");
const { rejectOrder } = require("../../controllers/mealController");

const app = express();
app.use(express.json());
app.put("/api/meals", rejectOrder);

describe("rejectOrder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if restaurant is not found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const res = await request(app).put("/api/meals").send({
      restaurantId: "restaurant1",
      userId: "user1",
      orderId: "order1",
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
  });

  it("should return 404 if user is not found", async () => {
    Restaurant.findById.mockResolvedValue({});
    User.findById.mockResolvedValue(null);

    const res = await request(app).put("/api/meals").send({
      restaurantId: "restaurant1",
      userId: "user1",
      orderId: "order1",
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should return 404 if order is not found in restaurant", async () => {
    const mockRestaurant = { orders: [] };
    Restaurant.findById.mockResolvedValue(mockRestaurant);
    User.findById.mockResolvedValue({});

    const res = await request(app).put("/api/meals").send({
      restaurantId: "restaurant1",
      userId: "user1",
      orderId: "order1",
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });

  it("should return 404 if order is not found in user", async () => {
    const mockRestaurant = { orders: [{ orderId: "order1" }] };
    Restaurant.findById.mockResolvedValue(mockRestaurant);
    User.findById.mockResolvedValue({ orders: [] });

    const res = await request(app).put("/api/meals").send({
      restaurantId: "restaurant1",
      userId: "user1",
      orderId: "order1",
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Order not found in user");
  });

  // it("should reject order successfully", async () => {
  //   const mockRestaurant = {
  //     orders: [{ orderId: "order1", status: "In Progress", activate: true }],
  //   };
  //   const mockUser = {
  //     orders: [{ orderId: "order1", status: "In Progress", activate: true }],
  //   };

  //   Restaurant.findById.mockResolvedValue(mockRestaurant);
  //   User.findById.mockResolvedValue(mockUser);

  //   const res = await request(app).put("/api/meals").send({
  //     restaurantId: "restaurant1",
  //     userId: "user1",
  //     orderId: "order1",
  //   });

  //   expect(res.status).toBe(200);
  //   expect(res.body.state).toBe("success");
  //   expect(mockRestaurant.orders[0].status).toBe("Rejected");
  //   expect(mockRestaurant.orders[0].activate).toBe(true);
  //   expect(mockUser.orders[0].status).toBe("Rejected");
  //   expect(mockUser.orders[0].activate).toBe(true);
  // });

  it("should return 500 on internal server error", async () => {
    Restaurant.findById.mockRejectedValue(new Error("DB error"));

    const res = await request(app).put("/api/meals").send({
      restaurantId: "restaurant1",
      userId: "user1",
      orderId: "order1",
    });

    expect(res.status).toBe(500);
    expect(res.body.state).toBe("fail");
    expect(res.body.message).toBe("Internal server error");
  });
});
