const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

jest.mock("../../models/restaurantModel");
jest.mock("../../models/userModel");

const Restaurant = require("../../models/restaurantModel");
const User = require("../../models/userModel");
const { updateComment } = require("../../controllers/mealController");

const app = express();
app.use(express.json());
app.put("/api/meals", updateComment);

describe("updateComment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).put("/api/meals").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please include all fields");
  });

  it("should return 404 if restaurant is not found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    const res = await request(app).put("/api/meals").send({
      restId: "restaurant1",
      userId: "user1",
      commentId: "comment1",
      updatedComment: {},
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Restaurant not found");
    expect(User.findById).not.toHaveBeenCalled();
  });

  // it("should return 404 if comment is not found in restaurant", async () => {
  //   Restaurant.findById.mockResolvedValue({});
  //   Restaurant.comments = [];

  //   const res = await request(app).put("/api/meals").send({
  //     restId: "restaurant1",
  //     userId: "user1",
  //     commentId: "comment1",
  //     updatedComment: {},
  //   });

  //   expect(res.status).toBe(404);
  //   expect(res.body.message).toBe("Comment not found in restaurant");
  // });

  // it("should return 404 if user is not found", async () => {
  //   Restaurant.findById.mockResolvedValue({});
  //   Restaurant.comments = [{ id: "comment1", text: "Great food!" }];
  //   User.findById.mockResolvedValue(null);

  //   const res = await request(app).put("/api/meals").send({
  //     restId: "restaurant1",
  //     userId: "user1",
  //     commentId: "comment1",
  //     updatedComment: {},
  //   });

  //   expect(res.status).toBe(404);
  //   expect(res.body.message).toBe("User not found");
  // });

  // it("should update comment successfully", async () => {
  //   const existingComment = { id: "comment1", text: "Great food!" };
  //   const updatedComment = { text: "Amazing food!" };

  //   Restaurant.findById.mockResolvedValue({});
  //   Restaurant.comments = [existingComment];
  //   User.findById.mockResolvedValue({});
  //   User.comments = [existingComment];

  //   const res = await request(app).put("/api/meals").send({
  //     restId: "restaurant1",
  //     userId: "user1",
  //     commentId: "comment1",
  //     updatedComment,
  //   });

  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("Comments updated successfully");
  //   expect(res.body.comments.length).toBe(1);
  //   expect(res.body.comments[0].text).toBe("Amazing food!");
  // });

  it("should return 500 on internal server error", async () => {
    Restaurant.findById.mockRejectedValue(new Error("DB error"));

    const res = await request(app).put("/api/meals").send({
      restId: "restaurant1",
      userId: "user1",
      commentId: "comment1",
      updatedComment: {},
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });
});
