import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import styles from "./Given.module.css";
const GivenOrders = () => {
  // Assuming you will replace useSelector with real usage when needed
  // const user = useSelector((state) => state.user);

  const DUMMY_ORDERS = [
    {
      Meal: "Burger",
      Price: 100,
      IsActive: true,
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
    {
      Meal: "Kebap",
      Price: 80,
      IsActive: false,
      Address: "Customers Address",
      Image:
        "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.orderContainer}>
          {DUMMY_ORDERS.map((order, index) => (
            <div className={styles.cartComponent} key={index}>
              <div className={styles.innerCart}>
                <img src={order.Image} alt="" className={styles.orderImage} />
                <div className={styles.innerContent}>
                  <p className={styles.mealTitle}>{order.Meal}</p>
                  <p className={styles.price}>{order.Price}$</p>
                </div>
              </div>
              <p className={order.IsActive ? styles.statusP : styles.statusD}>
                {order.IsActive ? "Preparing" : "Done"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GivenOrders;
