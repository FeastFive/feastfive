const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const editUser = require("../../controllers/authController").editUser;

const app = express();
app.use(express.json());
app.post("/api/users/editUser", editUser);

describe("POST /api/editUser", () => {
  beforeEach(() => {
    User.findById.mockClear();
    User.prototype.save.mockClear();
  });

  // it("should edit an existing user successfully", async () => {
  //   const existingUser = {
  //     id: "609b8d4b6d85f720e6a7b945",
  //     name: "John",
  //     surname: "Doe",
  //     email: "john@example.com",
  //   };

  //   User.findById.mockResolvedValue(existingUser);

  //   const updatedUser = {
  //     id: "609b8d4b6d85f720e6a7b945",
  //     name: "John",
  //     surname: "Smith",
  //     email: "john@example.com",
  //   };

  //   User.prototype.save.mockResolvedValue(updatedUser);

  //   const response = await request(app).post("/api/users/editUser").send({
  //     id: "609b8d4b6d85f720e6a7b945",
  //     name: "John",
  //     surname: "Smith",
  //     email: "john@example.com",
  //   });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({
  //     name: updatedUser.name,
  //     surname: updatedUser.surname,
  //     email: updatedUser.email,
  //   });

  //   expect(User.findById).toHaveBeenCalledWith("609b8d4b6d85f720e6a7b945");
  //   expect(User.prototype.save).toHaveBeenCalled();
  // });

  it("should return 404 if user is not found", async () => {
    User.findById.mockResolvedValue(null);

    const response = await request(app).post("/api/users/editUser").send({
      id: "609b8d4b6d85f720e6a7b945",
      name: "John",
      surname: "Smith",
      email: "john@example.com",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ state: "fail", message: "User not found" });
  });

  it("should handle null", async () => {
    User.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app).post("/api/users/editUser").send({});

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ state: "fail", message: "Server error" });
  });

  it("should handle server errors", async () => {
    User.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app).post("/api/users/editUser").send({
      id: "609b8d4b6d85f720e6a7b945",
      name: "John",
      surname: "Smith",
      email: "john@example.com",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ state: "fail", message: "Server error" });
  });
});
