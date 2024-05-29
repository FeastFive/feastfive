const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const addAdress = require("../../controllers/authController").addAdress;

const app = express();
app.use(express.json());
app.post("/api/users/addAdress", addAdress);

describe("POST /api/addAdress", () => {
  beforeEach(() => {
    User.findById.mockClear();
    User.prototype.save.mockClear();
  });

  it("should add address successfully", async () => {
    const user = {
      id: "609b8d4b6d85f720e6a7b945",
      address: [],
      save: jest.fn(),
    };

    User.findById.mockResolvedValue(user);

    const response = await request(app)
      .post("/api/users/addAdress")
      .send({ id: "609b8d4b6d85f720e6a7b945", address: "123 Main St" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      state: "success",
      message: "Address updated successfully",
    });

    expect(user.save).toHaveBeenCalled();
  });

  it("should return 404 if no user found", async () => {
    User.findById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/users/addAdress")
      .send({ id: "609b8d4b6d85f720e6a7b945", address: "123 Main St" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      state: "fail",
      message: "No user found by id",
    });
  });

  it("should handle server errors", async () => {
    User.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/users/addAdress")
      .send({ id: "609b8d4b6d85f720e6a7b945", address: "123 Main St" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
