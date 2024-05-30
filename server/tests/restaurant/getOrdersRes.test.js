const request = require("supertest");
const express = require("express");
const asyncHandler = require("express-async-handler");

const Restaurant = require("../../models/restaurantModel");
jest.mock("../../models/restaurantModel");

const getOrders =
  require("../../controllers/authRestaurantController").getOrders;
