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
  const [choose, setChoose] = useState(1);
  const itemsPerPage = 3;

  const [expanderStatus, setExpanderStatus] = useState(
    Array(orderLength).fill(false)
  );
  const [ordersWithComments, setOrdersWithComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delayOver, setDelayOver] = useState(Array(orderLength).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
  const [showNoOrders, setShowNoOrders] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!Array.isArray(order.orders) || order.orders.length === 0) {
        setShowNoOrders(true);
      }
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [order.orders]);
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

  // Pagination Controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  if (!Array.isArray(order.orders) || order.orders.length === 0) {
    if (showNoOrders) {
      return <div>No orders found</div>;
    }
  }

  function handleClick(option) {
    if (option !== choose) {
      paginate(1)
      setChoose(option);
    }
  }
  const getStatusToShow = (choose) => {
    switch (choose) {
      case 0:
        return "Done";
      case 1:
        return "In Progress";
      case 2:
        return "Rejected";
      default:
        return "";
    }
  };

  const statusToShow = getStatusToShow(choose);

  // Pagination data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredOrders = order.orders?.filter(
    (element) => element.status === statusToShow
  ) || [];
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.orderContainer}>
      <Loader4sec />
      <div className="flex flex-row gap-4">
        <button
          onClick={() => handleClick(0)}
          className={
            `border-2  w-auto px-4 py-2 rounded-sm shadow-sm  duration-200 font-semibold text-sm` +
            (choose == 0
              ? " bg-green-500 text-slate-50 hover:bg-green-500 border-green-500 "
              : " hover:bg-green-200 border-green-300 text-slate-900  ")
          }
        >
          Done
        </button>
        <button
          onClick={() => handleClick(1)}
          className={
            `border-2  w-auto px-4 py-2 rounded-sm shadow-sm duration-200 font-semibold text-sm` +
            (choose == 1
              ? " bg-yellow-400 text-slate-50 hover:bg-yellow-400 border-yellow-400 "
              : " hover:bg-yellow-200  border-yellow-300 text-slate-900  ")
          }
        >
          Waiting
        </button>
        <button
          onClick={() => handleClick(2)}
          className={
            `border-2  w-auto px-4 py-2 rounded-sm shadow-sm  duration-200 font-semibold text-sm` +
            (choose == 2
              ? " bg-red-500 text-slate-50 hover:bg-red-500 border-red-500 "
              : " hover:bg-red-200 border-red-300 text-slate-900  ")
          }
        >
          Rejected
        </button>
      </div>
      {currentOrders.map((element, index) => (
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
      
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        {Array.from({
          length: Math.ceil(filteredOrders.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 border rounded-md shadow-sm font-semibold ${
              currentPage === index + 1
                ? "bg-[#DB3748] text-white"
                : "bg-white text-[#DB3748]"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <p className="h-[300px]"></p>
    </div>
  );
};

export default OrderUser;

