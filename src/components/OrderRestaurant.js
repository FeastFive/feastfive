import React from "react";
import styles from "../style/OrderRestaurant.module.css";
import { HiMiniCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

const OrderRestaurant = ({ order }) => {
  // if (order.orders.length === 0) {
  //   return <div>No orders found</div>;
  // }

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
          >
            {element.activate ? (
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
            ) : (
              "Inactive"
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderRestaurant;
