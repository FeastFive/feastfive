import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const GivenOrders = () => {
  // Assuming you will replace useSelector with real usage when needed
  // const user = useSelector((state) => state.user);

  const DUMMY_ORDERS = [
    { Meal: "Burger", Price: 100, IsActive: true },
    { Meal: "Kebap", Price: 80, IsActive: false },
  ];

  return (
    <div>
      <Navbar />
      {DUMMY_ORDERS.map((order, index) => (
        <div key={index}>
          <p>Meal: {order.Meal}</p>
          <p>Price: {order.Price}</p>
          <p>Active: {order.IsActive ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default GivenOrders;
