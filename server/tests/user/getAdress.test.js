const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");
jest.mock("../../models/userModel");

const getAdress = require("../../controllers/authController").getAdress;

const app = express();
app.use(express.json());
app.post("/api/users/getAddress", getAdress);

describe("POST /api/users/getAddress", () => {
  beforeEach(() => {
    User.findById.mockClear();
  });

  it("should retrieve address successfully", async () => {
    const address = [
      { street: "123 Main St", city: "New York", country: "USA" },
      { street: "456 Elm St", city: "Los Angeles", country: "USA" },
    ];

    const user = {
      id: "609b8d4b6d85f720e6a7b945",
      address: address,
    };

    User.findById.mockResolvedValue(user);

    const response = await request(app)
      .post("/api/users/getAddress")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ address: user });

    expect(User.findById).toHaveBeenCalledWith("609b8d4b6d85f720e6a7b945", {
      address: 1,
    });
  });

  it("should return 404 if no user found", async () => {
    User.findById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/users/getAddress")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No user found" });
  });

  it("should handle server errors", async () => {
    User.findById.mockRejectedValue(new Error("Server error"));

    const response = await request(app)
      .post("/api/users/getAddress")
      .send({ id: "609b8d4b6d85f720e6a7b945" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
