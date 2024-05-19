import React, { useState } from "react";
import styles from "../style/OrderUser.module.css";
import ReactStars from "react-rating-stars-component";
import { FaAngleDown } from "react-icons/fa";
import { addComment } from "../utils/comment/addComment";
import { ShowAlert } from "./alert/ShowAlert";

const OrderUser = ({ order }) => {
  console.log(order.orders);

  const orderLength = order.orders ? order.orders.length : 0;
  const [textareaValue, setTextareaValue] = useState("");
  const [rating, setRating] = useState();
  const [open, setOpen] = useState(false);
  const [expanderStatus, setExpanderStatus] = useState(
    Array(orderLength).fill(false)
  );

  console.log(expanderStatus);

  const expandOnClick = (index) => {
    setExpanderStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  const submitCommendOnClick = (index) => {
    setExpanderStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = false;
      return newStatus;
    });
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const calculateTotalPrice = (food) => {
    return (food.price / 100) * food.quantity;
  };

  const calculateInnerCartTotal = (cart) => {
    if (!Array.isArray(cart)) {
      return 0;
    }
    return cart.reduce((acc, food) => {
      return acc + calculateTotalPrice(food);
    }, 0);
  };

  if (!order?.orders || order?.orders.length === 0) {
    return <div>No orders found</div>;
  }
  const handleCommentSubmit = async (restaurantId, userId) => {
    try {
      if (!rating || !textareaValue) {
        ShowAlert(3, "Please provide rating and comment");
        return;
      }

      const obj = {
        restId: restaurantId,
        userId: userId,
        rating: rating,
        comment: textareaValue,
      };

      const response = await addComment(obj);
      setOpen(true);
      if (response.ok) {
        const result = await response.json();
        ShowAlert(1, "Saved successfully");
      } else {
        ShowAlert(3, "An error occurred while saving comments");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while saving comments");
    }
  };

  return (
    <div className={styles.orderContainer}>
      {order?.orders?.map((element, index) => (
        <div className={styles.cartComponent} key={index}>
          <div className={styles.innerCartComponent}>
            {Array.isArray(element.cartFoodList) ? (
              element.cartFoodList.map((food, foodIndex) => (
                <div className={styles.innerCart} key={foodIndex}>
                  <div className={styles.innerContent}>
                    <p className={styles.mealTitle}>{food.name}</p>
                    <p className={styles.price}>
                      {food.price / 100}$ x {food.quantity} :{" "}
                      {calculateTotalPrice(food).toFixed(2)}$
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No food items found</p>
            )}
            <p className={styles.innerCartTotal}>
              Inner Cart Total:{" "}
              {calculateInnerCartTotal(element.cartFoodList).toFixed(2)}$
            </p>
            <p className={element.activate ? styles.statusP : styles.statusD}>
              {element.activate ? "InProgress" : "Done"}
            </p>
          </div>
          {!element.activate && !open ? (
            <div className={styles.expander}>
              <div>
                <button
                  onClick={() => expandOnClick(index)}
                  className={styles.commendButton}
                >
                  Leave Commend <FaAngleDown />
                </button>
              </div>

              {expanderStatus[index] && (
                <div className={styles.innerExpander}>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  <label className={styles.commendLabel}>
                    Leave a commend here:
                    <textarea
                      className={styles.commendTextArea}
                      value={textareaValue}
                      onChange={handleTextareaChange}
                    />
                  </label>
                  <div className={styles.submitContainer}>
                    <button
                      className={styles.submitButton}
                      onClick={() =>
                        handleCommentSubmit(
                          element.restaurantId,
                          element.userId
                        )
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default OrderUser;
