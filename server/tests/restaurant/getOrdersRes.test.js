const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const Restaurant = require("../../models/restaurantModel");
jest.mock("../../models/restaurantModel");

const getOrders =
  require("../../controllers/authRestaurantController").getOrders;

const app = express();
app.use(express.json());
app.post("/api/restaurants/getOrders", getOrders);

describe("POST /api/restaurants/getOrders", () => {
  beforeEach(() => {
    Restaurant.findById.mockClear();
  });

  it("should retrieve orders successfully", async () => {
    const orders = [
      { orderId: "1", orderDate: "2024-05-30" },
      { orderId: "2", orderDate: "2024-05-31" },
    ];

    const restaurant = {
      id: "609b8d4b6d85f720e6a7b945",
      orders: orders,
    };

    Restaurant.findById.mockResolvedValue(restaurant);

    const response = await request(app)
      .post("/api/restaurants/getOrders")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      orders: {
        id: "609b8d4b6d85f720e6a7b945",
        orders: orders,
      },
    });

    expect(Restaurant.findById).toHaveBeenCalledWith(
      "609b8d4b6d85f720e6a7b945",
      {
        _id: 0,
        orders: 1,
      }
    );
  });

  it("should return 404 if no orders found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/restaurants/getOrders")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No order found" });
  });

  it("should handle server errors", async () => {
    Restaurant.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/restaurants/getOrders")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
