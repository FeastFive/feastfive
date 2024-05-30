const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Restaurant = require("../../models/restaurantModel");
jest.mock("../../models/restaurantModel");
const {
  registerRestaurant,
} = require("../../controllers/authRestaurantController");
const { sendActivationRestaurantEmail } = require("../../controllers/mailer");
jest.mock("../../controllers/mailer", () => jest.fn().mockResolvedValue(true));

const randString = jest.fn(() => "uniqueId");
const generateToken = jest.fn(() => "token");

const app = express();
app.use(express.json());
app.post("/api/restaurants", registerRestaurant);

describe("POST /api/restaurants", () => {
  let restaurant;

  beforeEach(() => {
    restaurant = {
      _id: "609b8d4b6d85f720e6a7b945",
      restaurantName: "Test Restaurant",
      ownerName: "John",
      ownerSurname: "Doe",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
      loginDate: new Date(),
      uniqueId: "someUniqueId",
      activated: false,
    };

    Restaurant.create.mockResolvedValue(restaurant);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 500 if there is a server error", async () => {
    Restaurant.findOne.mockResolvedValue(null);

    const response = await request(app).post("/api/restaurants").send({
      restaurantName: "Test Restaurant",
      ownerName: "John",
      ownerSurname: "Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });

  it("should fail with empty object", async () => {
    const response = await request(app).post("/api/restaurants").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail with missing fields", async () => {
    const response = await request(app).post("/api/restaurants").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail if restaurant already exists", async () => {
    Restaurant.findOne.mockResolvedValue(restaurant);

    const response = await request(app).post("/api/restaurants").send({
      restaurantName: "Test Restaurant",
      ownerName: "John",
      ownerSurname: "Doe",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({});
  });

  it("should handle unexpected errors", async () => {
    Restaurant.findOne.mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    const response = await request(app).post("/api/restaurants").send({
      restaurantName: "Test Restaurant",
      ownerName: "John",
      ownerSurname: "Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });
});
