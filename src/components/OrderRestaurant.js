import React from "react";
import styles from "../style/OrderRestaurant.module.css";
import { HiMiniCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

const OrderRestaurant = ({ order }) => {
  // Function to calculate total price for a food item
  const calculateTotalPrice = (food) => {
    return (food.price / 100) * food.quantity;
  };

  // Function to calculate total price for all items within an innerCart
  const calculateInnerCartTotal = (cart) => {
    return cart.reduce((acc, food) => {
      return acc + calculateTotalPrice(food);
    }, 0);
  };

  return (
    <div className={styles.orderContainer}>
      {order.orders?.map((element, index) => (
        <div className={styles.cartComponent} key={index}>
          <div className={styles.foodList}>
            {element?.cartFoodList?.map((food, foodIndex) => (
              <div className={styles.innerCart} key={foodIndex}>
                <div className={styles.innerContent}>
                  <p className={styles.mealTitle}>{food.name}</p>
                  <p className={styles.price}>
                    {food.price / 100}$ x {food.quantity} :{" "}
                    {calculateTotalPrice(food).toFixed(2)}$
                  </p>
                  {/* Display total price for the food item */}

                  <ul>
                    {food?.foodInfo?.map((info, i) => (
                      <li key={i}></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* Display total price for all items within the innerCart */}
          <p className={styles.innerCartTotal}>
            Inner Cart Total:{" "}
            {calculateInnerCartTotal(element.cartFoodList).toFixed(2)}$
          </p>
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
              <div className={styles.done}>Done</div>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderRestaurant;
