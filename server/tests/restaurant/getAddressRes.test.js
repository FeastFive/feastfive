const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const Restaurant = require("../../models/restaurantModel");
jest.mock("../../models/restaurantModel");

const updateRestaurant =
  require("../../controllers/authRestaurantController").updateRestaurant;

const app = express();
app.use(express.json());
app.post("/api/restaurants/updateRestaurant", updateRestaurant);

describe("POST /api/restaurants/updateRestaurant", () => {
  beforeEach(() => {
    Restaurant.findById.mockClear();
    Restaurant.findByIdAndUpdate.mockClear();
  });

  it("should return 404 if no restaurant found by id", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/restaurants/updateRestaurant")
      .send({ id: "609b8d4b6d85f720e6a7b945", updatedFields: {} });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      state: "fail",
      message: "No restaurant found by id",
    });
  });

  it("should handle server errors", async () => {
    Restaurant.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/restaurants/updateRestaurant")
      .send({ id: "609b8d4b6d85f720e6a7b945", updatedFields: {} });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
