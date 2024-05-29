const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const deleteUser = require("../../controllers/authController").deleteUser;

const app = express();
app.use(express.json());
app.post("/api/users/deleteUser", deleteUser);

describe("POST /api/deleteUser", () => {
  beforeEach(() => {
    User.findByIdAndDelete.mockClear();
  });

  it("should delete an existing user successfully", async () => {
    const existingUser = {
      _id: "609b8d4b6d85f720e6a7b945",
    };

    User.findByIdAndDelete.mockResolvedValue(existingUser);

    const response = await request(app)
      .post("/api/users/deleteUser")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "User deleted successfully",
    });

    expect(User.findByIdAndDelete).toHaveBeenCalledWith(
      "609b8d4b6d85f720e6a7b945"
    );
  });

  it("should return 404 if user is not found", async () => {
    User.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/users/deleteUser")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "fail",
      message: "User not found",
    });
  });

  it("should handle server errors", async () => {
    User.findByIdAndDelete.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/users/deleteUser")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ status: "fail", message: "Server error" });
  });
});
