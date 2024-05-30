import React, { useState, useEffect } from "react";
import styles from "../style/OrderUser.module.css";
import ReactStars from "react-rating-stars-component";
import { FaAngleDown } from "react-icons/fa";
import { addComment } from "../utils/comment/addComment";
import { ShowAlert } from "./alert/ShowAlert";
import { checkComment } from "../utils/comment/checkComment";
import Loader from "./Loader";
import Loader4sec from "./Loader4sec";

const OrderUser = ({ order }) => {
  const orderLength = Array.isArray(order.orders) ? order.orders.length : 0;
  const [textareaValue, setTextareaValue] = useState("");
  const [rating, setRating] = useState();
  const [expanderStatus, setExpanderStatus] = useState(
    Array(orderLength).fill(false)
  );
  const [ordersWithComments, setOrdersWithComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delayOver, setDelayOver] = useState(Array(orderLength).fill(false));

  useEffect(() => {
    const fetchCommentsForOrders = async () => {
      if (!Array.isArray(order.orders)) {
        setLoading(false);
        return;
      }

      const ordersWithCommentsList = [];

      for (const orderElement of order.orders) {
        const obj1 = {
          restId: orderElement.restaurantId,
          userId: orderElement.userId,
          orderId: orderElement.orderId,
        };
        try {
          const response = await checkComment(obj1);
          if (response.status === 200) {
            const result = await response.json();
            if (result.comment) {
              ordersWithCommentsList.push(orderElement.orderId);
            }
          }
        } catch (error) {
          console.error("Error checking comment:", error);
        }
      }
      setOrdersWithComments(ordersWithCommentsList);
      setLoading(false);
    };

    fetchCommentsForOrders();
  }, [order.orders]);

  useEffect(() => {
    if (!Array.isArray(order.orders)) return;

    const timers = order.orders.map((_, index) => {
      return setTimeout(() => {
        setDelayOver((prev) => {
          const newDelayOver = [...prev];
          newDelayOver[index] = true;
          return newDelayOver;
        });
      }, 4000);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [order.orders]);

  const expandOnClick = (index) => {
    setExpanderStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const ratingChanged = (newRating) => {
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

  const handleCommentSubmit = async (restaurantId, userId, orderId) => {
    try {
      if (!rating || !textareaValue) {
        ShowAlert(3, "Please provide rating and comment");
        return;
      }

      const obj = {
        restId: restaurantId,
        userId: userId,
        orderId: orderId,
        rating: rating,
        comment: textareaValue,
      };

      const response = await addComment(obj);

      if (response.ok) {
        const result = await response.json();
        ShowAlert(1, "Saved successfully");
      } else if (response.status === 403) {
        ShowAlert(3, "You have already commented for this order");
      } else {
        ShowAlert(3, "An error occurred while saving comments");
      }
    } catch (error) {
      ShowAlert(3, "An error occurred while saving comments");
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  if (!Array.isArray(order.orders) || order.orders.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div className={styles.orderContainer}>
      <Loader4sec />
      {order.orders.map((element, index) => (
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
            <p className="ml-auto font-semibold">
              Cart Total:{" "}
              {calculateInnerCartTotal(element.cartFoodList).toFixed(2)}$
            </p>
            <p className={element.activate ? styles.statusP : styles.statusD}>
              {element.status}
            </p>
          </div>
          {!element.activate &&
          !ordersWithComments.includes(element.orderId) &&
          delayOver[index] ? (
            <div className={styles.expander}>
              <div>
                <button
                  onClick={() => expandOnClick(index)}
                  className={styles.commendButton}
                >
                  Leave Comment <FaAngleDown />
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
                    Leave a comment here:
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
                          element.userId,
                          element.orderId
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
