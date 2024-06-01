const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const { registerUser } = require("../../controllers/authController");
const { sendActivationEmail } = require("../../controllers/mailer");
jest.mock("../../controllers/mailer", () => jest.fn().mockResolvedValue(true));

const randString = jest.fn(() => "uniqueId");
const generateToken = jest.fn(() => "token");

const app = express();
app.use(express.json());
app.post("/api/users", registerUser);

describe("POST /api/users", () => {
  let user;

  beforeEach(() => {
    user = {
      _id: "609b8d4b6d85f720e6a7b945",
      name: "John",
      surname: "Doe",
      email: "zeugurlu@outlook.com",
      password: bcrypt.hashSync("password123", 10),
      loginDate: new Date(),
      uniqueId: "someUniqueId",
      role: "user",
      activated: false,
    };

    User.create.mockResolvedValue(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("server error", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).post("/api/users").send({
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({});
  });

  it("should fail with empty obj", async () => {
    const response = await request(app).post("/api/users").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      state: "fail",
      message: "Please include all fields",
    });
  });

  it("should fail with missing fields", async () => {
    const response = await request(app).post("/api/users").send({
      email: "zeugurlu@outlook.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      state: "fail",
      message: "Please include all fields",
    });
  });

  it("should fail if user already exists", async () => {
    User.findOne.mockResolvedValue(user);

    const response = await request(app).post("/api/users").send({
      name: "John",
      surname: "Doe",
      email: "zeugurlu@outlook.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      state: "fail",
      message: "User already exists",
    });
  });

  it("should handle unexpected errors", async () => {
    const response = await request(app).post("/api/users").send({
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      state: "fail",
      message: "User already exists",
    });
  });
});
