import React from "react";
import styles from "../style/OrderRestaurant.module.css";
import { HiMiniCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { doneOrder } from "../utils/order/doneOrder";

const OrderRestaurant = ({ order }) => {
  console.log(order);
  const calculateTotalPrice = (food) => {
    return (food.price / 100) * food.quantity;
  };

  const calculateInnerCartTotal = (cart) => {
    return cart.reduce((acc, food) => {
      return acc + calculateTotalPrice(food);
    }, 0);
  };
  const handleDoneOrder = async (restaurantId, userId, orderId) => {
    try {
      const response = await doneOrder({ restaurantId, userId, orderId });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result.state);
        return result.state;
      } else if (response.status === 404) {
        console.error("Restaurant or user not found");
      } else {
        console.error("An error occurred while completing order");
      }
    } catch (error) {
      console.error("Error completing order:", error);
    }
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

                  <ul>
                    {food?.foodInfo?.map((info, i) => (
                      <li key={i}></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
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
                  <button
                    onClick={() =>
                      handleDoneOrder(
                        element.restaurantId,
                        element.userId,
                        element.orderId
                      )
                    }
                  >
                    Done
                  </button>

                  <HiMiniCheck />
                </div>
                {/* <div className={styles.acceptButtonCont}>
                  <button>Reject</button>
                  <RxCross2 />
                </div> */}
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
