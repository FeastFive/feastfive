import React from "react";
import styles from "../style/OrderUser.module.css";

const OrderUser = ({ order }) => {
  console.log(order); // Include an expression here
  return (
    <div className={styles.orderContainer}>
      {order.orders?.map((element, index) => (
        <div className={styles.cartComponent} key={index}>
          {element?.cartFoodList?.map((food, foodIndex) => (
            <div className={styles.innerCart} key={foodIndex}>
              <div className={styles.innerContent}>
                <p className={styles.mealTitle}>{food.name}</p>
                <p className={styles.price}>
                  {food.price / 100}$ x {food.quantity}
                </p>
                <ul>
                  {food?.foodInfo?.map((info, i) => (
                    <li key={i}>
                      <p>Price: {info.price}$</p>
                      <p>Options: {info.options.join(", ")}</p>
                      <p>Count: {info.count}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <p
            className={
              element.activate ? styles.statusActive : styles.statusInactive
            }
          ></p>
        </div>
      ))}
    </div>
  );
};

export default OrderUser;
