import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import styles from "./Given.module.css";
import OrderUser from "../../components/OrderUser";
import OrderRestaurant from "../../components/OrderRestaurant";
const GivenOrders = () => {
  const [checkUserRole, setCheckUserRole] = useState("");

  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);
  useEffect(() => {
    if (user.role === "user") {
      setCheckUserRole("user");
    } else if (restaurant.role === "restaurant") {
      setCheckUserRole("restaurant");
    } else {
      setCheckUserRole("");
    }
  }, [user, restaurant]);

  const DUMMY_ORDERS_USER = [
    {
      Meal: "Burger",
      Price: 100,
      IsActive: "true",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
    {
      Meal: "Kebap",
      Price: 80,
      IsActive: "false",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
    {
      Meal: "Kebap",
      Price: 80,
      IsActive: "canceled",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
  ];
  const DUMMY_ORDERS_RESTAURANT = [
    {
      Meal: "Burger",
      Price: 100,
      IsAccepted: "waiting",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
    {
      Meal: "Kebap",
      Price: 80,
      IsAccepted: "accepted",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
    {
      Meal: "Salat",
      Price: 60,
      IsAccepted: "accepted",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
    {
      Meal: "Soup",
      Price: 10,
      IsAccepted: "rejected",
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        {checkUserRole == "user" ? (
          <OrderUser data={DUMMY_ORDERS_USER} />
        ) : (
          <OrderRestaurant data={DUMMY_ORDERS_RESTAURANT} />
        )}
      </div>
    </div>
  );
};

export default GivenOrders;
