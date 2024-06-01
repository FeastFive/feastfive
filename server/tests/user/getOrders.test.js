const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const getOrders = require("../../controllers/authController").getOrders;

const app = express();
app.use(express.json());
app.post("/api/users/getOrders", getOrders);

describe("POST /api/users/getOrders", () => {
  beforeEach(() => {
    User.findById.mockClear();
  });

  it("should retrieve orders successfully", async () => {
    const orders = [
      { orderId: "1", orderDate: "2024-05-30" },
      { orderId: "2", orderDate: "2024-05-31" },
    ];

    const user = {
      id: "609b8d4b6d85f720e6a7b945",
      orders: orders,
    };

    User.findById.mockResolvedValue(user);

    const response = await request(app)
      .post("/api/users/getOrders")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(200);
    // expect(response.body).toEqual({ orders: orders });

    expect(User.findById).toHaveBeenCalledWith("609b8d4b6d85f720e6a7b945", {
      _id: 0,
      orders: 1,
    });
  });

  it("should return 404 if no order found", async () => {
    User.findById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/users/getOrders")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No order found" });
  });

  it("should handle server errors", async () => {
    User.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/users/getOrders")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
