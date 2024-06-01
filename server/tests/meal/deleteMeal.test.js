const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

jest.mock("../../models/restaurantModel");

const Restaurant = require("../../models/restaurantModel");
const { deleteMeal } = require("../../controllers/mealController");

const app = express();
app.use(express.json());
app.delete("/api/meals", deleteMeal);

describe("deleteMeal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully delete a meal", async () => {
    const restaurantMock = {
      _id: "restaurant1",
      meals: [
        { id: "meal1", name: "Meal 1", price: 10 },
        { id: "meal2", name: "Meal 2", price: 15 },
      ],
      save: jest.fn().mockResolvedValue(true),
    };

    Restaurant.findById.mockResolvedValue(restaurantMock);

    const res = await request(app)
      .delete("/api/meals")
      .send({ id: "restaurant1", mealId: "meal1" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Meal deleted successfully");
    expect(res.body.meals.length).toBe(1);
    expect(Restaurant.findById).toHaveBeenCalledWith("restaurant1");
    expect(restaurantMock.save).toHaveBeenCalled();
  });

  it("should return 404 if restaurant is not found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const res = await request(app)
      .delete("/api/meals")
      .send({ id: "restaurant1", mealId: "meal1" });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
    expect(Restaurant.findById).toHaveBeenCalledWith("restaurant1");
  });

  it("should return 404 if meal is not found", async () => {
    const restaurantMock = {
      _id: "restaurant1",
      meals: [{ id: "meal2", name: "Meal 2", price: 15 }],
      save: jest.fn().mockResolvedValue(true),
    };

    Restaurant.findById.mockResolvedValue(restaurantMock);

    const res = await request(app)
      .delete("/api/meals")
      .send({ id: "restaurant1", mealId: "meal1" });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Meal not found");
    expect(Restaurant.findById).toHaveBeenCalledWith("restaurant1");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).delete("/api/meals").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please include all fields");
  });

  it("should return 500 on internal server error", async () => {
    Restaurant.findById.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .delete("/api/meals")
      .send({ id: "restaurant1", mealId: "meal1" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
    expect(Restaurant.findById).toHaveBeenCalledWith("restaurant1");
  });
});
