const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Restaurant = require("../../models/restaurantModel");
jest.mock("../../models/restaurantModel");
jest.mock("bcryptjs");

const loginRestaurant =
  require("../../controllers/authRestaurantController").loginRestaurant;

const app = express();
app.use(express.json());
app.post("/api/restaurants/login", loginRestaurant);

describe("POST /api/restaurants/login", () => {
  beforeEach(() => {
    Restaurant.findOne.mockClear();
    bcrypt.compare.mockClear();
  });

  it("should return 401 if email or password is missing", async () => {
    const response = await request(app).post("/api/restaurants/login").send({
      email: "sadece@mail.com",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credential",
      state: "fail",
    });
  });

  it("should return 401 if restaurant is not found", async () => {
    Restaurant.findOne.mockResolvedValue(null);

    const response = await request(app).post("/api/restaurants/login").send({
      email: "restaurant@bulunamadi.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credential",
      state: "fail",
    });
  });

  it("should return 401 if password is incorrect", async () => {
    const mockRestaurant = {
      _id: "609b8d4b6d85f720e6a7b945",
      restaurantName: "Test Restaurant",
      email: "user1@gmail.com",
      password: "hashedPassword",
    };

    Restaurant.findOne.mockResolvedValue(mockRestaurant);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post("/api/restaurants/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credential",
      state: "fail",
    });
  });

  it("should handle server errors", async () => {
    Restaurant.findOne.mockRejectedValue(new Error("Server error"));

    const response = await request(app).post("/api/restaurants/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
  });
});
