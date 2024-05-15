import React from "react";
import styles from "../style/OrderUser.module.css";

const OrderUser = (props) => {
  return (
    <div className={styles.orderContainer}>
      {props.data.map((order, index) => (
        <div className={styles.cartComponent} key={index}>
          <div className={styles.innerCart}>
            <img src={order.Image} alt="" className={styles.orderImage} />
            <div className={styles.innerContent}>
              <p className={styles.mealTitle}>{order.Meal}</p>
              <p className={styles.price}>{order.Price}$</p>
            </div>
          </div>
          <p
            className={
              order.IsActive === "true"
                ? styles.statusP
                : order.IsActive === "false"
                ? styles.statusD
                : order.IsActive === "canceled"
                ? styles.statusC
                : ""
            }
          >
            {order.IsActive === "true"
              ? "Active Order"
              : order.IsActive === "false"
              ? "Delivered"
              : order.IsActive === "canceled"
              ? "Canceled"
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderUser;
