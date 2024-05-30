const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const Restaurant = require("../../models/restaurantModel");
jest.mock("../../models/restaurantModel");

const deleteRestaurant =
  require("../../controllers/authRestaurantController").deleteRestaurant;

const app = express();
app.use(express.json());
app.post("/api/restaurants/deleteRestaurant", deleteRestaurant);

describe("POST /api/restaurants/deleteRestaurant", () => {
  beforeEach(() => {
    Restaurant.findByIdAndDelete.mockClear();
  });

  it("should delete an existing restaurant successfully", async () => {
    const existingRestaurant = {
      _id: "609b8d4b6d85f720e6a7b945",
    };

    Restaurant.findByIdAndDelete.mockResolvedValue(existingRestaurant);

    const response = await request(app)
      .post("/api/restaurants/deleteRestaurant")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Restaurant deleted successfully",
    });

    expect(Restaurant.findByIdAndDelete).toHaveBeenCalledWith(
      "609b8d4b6d85f720e6a7b945"
    );
  });

  it("should return 404 if restaurant is not found", async () => {
    Restaurant.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/restaurants/deleteRestaurant")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "fail",
      message: "Restaurant not found",
    });
  });

  it("should handle server errors", async () => {
    Restaurant.findByIdAndDelete.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/restaurants/deleteRestaurant")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });
});
