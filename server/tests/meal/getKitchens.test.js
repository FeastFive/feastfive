const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

jest.mock("../../models/kithcensModel");

const Kitchen = require("../../models/kithcensModel");
const { getKitchens } = require("../../controllers/mealController");

const app = express();
app.use(express.json());
app.get("/api/meals", getKitchens);

describe("getKitchens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully retrieve kitchens", async () => {
    const kitchensMock = [
      { id: "kitchen1", name: "Kitchen 1" },
      { id: "kitchen2", name: "Kitchen 2" },
    ];

    Kitchen.find.mockResolvedValue(kitchensMock);

    const res = await request(app).get("/api/meals");

    expect(res.status).toBe(200);
    expect(res.body.kitchens).toEqual(kitchensMock);
    expect(Kitchen.find).toHaveBeenCalled();
  });

  it("should return 404 if no kitchens are found", async () => {
    Kitchen.find.mockResolvedValue([]);

    const res = await request(app).get("/api/meals");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No kitchens found");
    expect(Kitchen.find).toHaveBeenCalled();
  });

  it("should return 500 on internal server error", async () => {
    Kitchen.find.mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/meals");

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Internal server error");
    expect(Kitchen.find).toHaveBeenCalled();
  });
});
