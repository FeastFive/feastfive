import React from "react";
import styles from "../style/OrderRestaurant.module.css"; // Import the styles
import { HiMiniCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
const OrderRestaurant = (props) => {
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
              order.IsAccepted === "waiting"
                ? styles.statusD
                : order.IsAccepted === "accepted"
                ? styles.statusP
                : order.IsAccepted === "rejected"
                ? styles.statusC
                : ""
            }
          >
            {order.IsAccepted === "waiting" ? (
              //ZEHRA ON CLICKI acceptButtonContainer DIVINE KOY
              <div className={styles.acceptButtonContainer}>
                <div className={styles.acceptButtonCont}>
                  <button>Accept</button>
                  <HiMiniCheck />
                </div>
                <div className={styles.acceptButtonCont}>
                  <button>Reject</button>
                  <RxCross2 />
                </div>
              </div>
            ) : order.IsAccepted === "accepted" ? (
              "Accepted"
            ) : order.IsAccepted === "rejected" ? (
              "Rejected"
            ) : (
              ""
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderRestaurant;
