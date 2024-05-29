const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const User = require("../models/userModel");
jest.mock("../models/userModel");

const loginUser = require("../controllers/authController").loginUser;

const app = express();
app.use(express.json());
app.post("/api/users/login", loginUser);

describe("POST /api/login", () => {
  let user;

  beforeEach(() => {
    user = {
      _id: "609b8d4b6d85f720e6a7b945",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: bcrypt.hashSync("password123", 10),
      address: "123 Main St",
      createdAt: new Date(),
      loginDate: null,
      role: "user",
      logs: [],
      activated: true,
      save: jest.fn().mockResolvedValue(true),
    };

    User.findOne.mockResolvedValue(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "john@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      address: user.address,
      createdAt: user.createdAt.toISOString(),
      loginDate: expect.any(String),
      role: user.role,
      logs: user.logs,
      activated: user.activated,
    });
  });

  it("should fail with non-activated account", async () => {
    user.activated = false;
    User.findOne.mockResolvedValue(user);

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "john@example.com", password: "password123" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      state: "fail",
      message: "Non activated account",
    });
  });

  it("should fail with invalid credentials", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "john@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      state: "fail",
      message: "Invalid credentials",
    });
  });
});
