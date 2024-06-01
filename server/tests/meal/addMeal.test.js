const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

jest.mock("../../models/restaurantModel");

const Restaurant = require("../../models/restaurantModel");
const { addMeal } = require("../../controllers/mealController");

const app = express();
app.use(express.json());
app.post("/api/meals", addMeal);

describe("addMeal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully add a meal", async () => {
    const restaurantMock = {
      _id: "restaurant1",
      meals: [],
      save: jest.fn().mockResolvedValue(true),
    };

    Restaurant.findById.mockResolvedValue(restaurantMock);

    const mealData = {
      id: "meal1",
      name: "Chicken Curry",
      price: 15,
      description: "Delicious chicken curry",
      image: "chicken_curry.jpg",
      options: ["Spicy", "Mild"],
    };

    const res = await request(app)
      .post("/api/meals")
      .send({ id: "restaurant1", ...mealData });

    expect(res.status).toBe(200);
    expect(res.body.meals).toHaveLength(1);
    // expect(Restaurant.findById).toHaveBeenCalledWith("restaurant1");
    // expect(restaurantMock.save).toHaveBeenCalled();
  });

  it("should return 404 if restaurant is not found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/meals")
      .send({ id: "restaurant1", name: "Meal 1", price: 10 });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
    // expect(Restaurant.findById).toHaveBeenCalledWith("restaurant1");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/meals")
      .send({ id: "restaurant1", description: "Meal 1 description" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please include all fields");
  });

  it("should return 500 on internal server error", async () => {
    Restaurant.findById.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/meals")
      .send({ id: "restaurant1", name: "Meal 1", price: 10 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });
});
