const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const changePassword =
  require("../../controllers/authController").changePassword;

const app = express();
app.use(express.json());
app.post("/api/users/changePassword", changePassword);

describe("POST /api/users/changePassword", () => {
  beforeEach(() => {
    User.findOne.mockClear();
    User.prototype.save.mockClear();
  });

  it("should change password successfully", async () => {
    const user = {
      uniqueId: "609b8d4b6d85f720e6a7b945",
      newPassword: "newPassword123",
      save: jest.fn(),
    };

    User.findOne.mockResolvedValue(user);

    const response = await request(app).post("/api/users/changePassword").send({
      uniqueId: "609b8d4b6d85f720e6a7b945",
      newPassword: "newPassword123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Password successfully changed" });

    expect(User.findOne).toHaveBeenCalledWith({
      uniqueId: "609b8d4b6d85f720e6a7b945",
    });
    expect(user.save).toHaveBeenCalled();
  });

  it("should return 400 if new password does not exist", async () => {
    const response = await request(app)
      .post("/api/users/changePassword")
      .send({ uniqueId: "609b8d4b6d85f720e6a7b945", newPassword: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Password does not exist" });
  });

  it("should return 404 if user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).post("/api/users/changePassword").send({
      uniqueId: "609b8d4b6d85f720e6a7b945",
      newPassword: "newPassword123",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });

  it("should handle server errors", async () => {
    User.findOne.mockRejectedValue(new Error("Server error"));

    const response = await request(app).post("/api/users/changePassword").send({
      uniqueId: "609b8d4b6d85f720e6a7b945",
      newPassword: "newPassword123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});
