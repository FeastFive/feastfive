const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

jest.mock("../../models/restaurantModel");
jest.mock("../../models/userModel");

const Restaurant = require("../../models/restaurantModel");
const User = require("../../models/userModel");
const { addComment } = require("../../controllers/mealController");

const app = express();
app.use(express.json());
app.post("/api/meals", addComment);

describe("addComment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/meals").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required fields");
  });

  it("should return 404 if restaurant is not found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const res = await request(app).post("/api/meals").send({
      restId: "restaurant1",
      userId: "user1",
      orderId: "order1",
      rating: 5,
      comment: "Great food!",
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
    expect(User.findById).not.toHaveBeenCalled();
  });

  it("should return 404 if user is not found", async () => {
    Restaurant.findById.mockResolvedValue({});
    User.findById.mockResolvedValue(null);

    const res = await request(app).post("/api/meals").send({
      restId: "restaurant1",
      userId: "user1",
      orderId: "order1",
      rating: 5,
      comment: "Great food!",
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should return 500 if comment get server error", async () => {
    const existingComment = { orderId: "order1", text: "Great food!" };

    Restaurant.findById.mockResolvedValue({});
    User.findById.mockResolvedValue({});
    Restaurant.comments = [existingComment];

    const res = await request(app).post("/api/meals").send({
      restId: "restaurant1",
      userId: "user1",
      orderId: "order1",
      rating: 5,
      comment: "Great food!",
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });

  // it("should add a new comment successfully", async () => {
  //   Restaurant.findById.mockResolvedValue({});
  //   User.findById.mockResolvedValue({});
  //   Restaurant.comments = [];

  //   const res = await request(app)
  //     .post("/api/meals")
  //     .send({
  //       restId: "restaurant1",
  //       userId: "user1",
  //       orderId: "order1",
  //       rating: 5,
  //       comment: "Great food!",
  //     });

  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("Comment added successfully");
  //   expect(res.body.comments.length).toBe(1);
  //   expect(Restaurant.comments[0]).toEqual(
  //     expect.objectContaining({
  //       orderId: "order1",
  //       rating: 5,
  //       comment: "Great food!",
  //     })
  //   );
  // });

  it("should return 500 on internal server error", async () => {
    Restaurant.findById.mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/api/meals").send({
      restId: "restaurant1",
      userId: "user1",
      orderId: "order1",
      rating: 5,
      comment: "Great food!",
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });
});
