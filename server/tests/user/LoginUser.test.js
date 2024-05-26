const request = require("supertest");
const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const route = require("../../routes/userRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", route);

let server;

beforeAll((done) => {
  server = app.listen(4000, () => {
    console.log("HTTP Server running on port 4000");
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("HTTP server closed.");
    done();
  });
});

describe("Login", () => {
  jest.setTimeout(150000);
  test("login with valid input and return a success response", async () => {
    const customer = {
      mail: "user1@gmail.com",
      password: "User123456",
    };

    const response = await request(app).post("/login").send(customer);

    console.log(response);

    expect(response.statusCode).toBe(200);
    expect(response.state).toBe("success");
  });
  test("login with invalid input and return a fail response", async () => {
    const customer = {
      mail: "11111",
      password: "123",
    };

    const response = await request(app).post("/login").send(customer);

    expect(response.statusCode).toBe(200);
    expect(response.state).toBe("fail");
  });
  test("login with missing inputs and return a fail response", async () => {
    const customer = {
      mail: " ",
      password: "123",
    };

    const response = await request(app).post("/login").send(customer);

    expect(response.statusCode).toBe(200);
    expect(response.state).toBe("fail");
  });
  test("login with null and return a fail response", async () => {
    const customer = {
      mail: null,
      password: null,
    };

    const response = await request(app).post("/login").send(customer);

    expect(response.statusCode).toBe(200);
    expect(response.state).toBe("fail");
  });
});
