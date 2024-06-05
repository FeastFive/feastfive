import React, { useState } from "react";
import styles from "../style/OrderRestaurant.module.css";
import { HiMiniCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { doneOrder } from "../utils/order/doneOrder";
import { rejectOrder } from "../utils/order/rejectOrder";

const OrderRestaurant = ({ order }) => {
  const [choose, setChoose] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
        window.location.reload();
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

  const handleRejectOrder = async (restaurantId, userId, orderId) => {
    try {
      const response = await rejectOrder({ restaurantId, userId, orderId });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result.state);
        window.location.reload();
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

  function handleClick(option) {
    if (option !== choose) {
      setChoose(option);
      setCurrentPage(1); // Reset to first page on status change
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
  const filteredOrders = order.orders?.filter(
    (element) => element.status === statusToShow
  ) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.orderContainer}>
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
          Accepted
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
      <div>
        {currentItems.length > 0 ? (
          currentItems.map((element, index) => (
            <div
              className={`${styles.cartComponent} ${
                element.status === "Done"
                  ? styles.cartComponentA
                  : element.status === "Rejected"
                  ? styles.cartComponentR
                  : element.status === "In Progress"
                  ? styles.cartComponentI
                  : ""
              }`}
              key={index}
            >
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
              <p className="ml-auto font-semibold pr-6">
                Cart Total:{" "}
                {calculateInnerCartTotal(element.cartFoodList).toFixed(2)}$
              </p>
              <p>
                {element.status !== "Rejected" &&
                element.status !== "Accepted" &&
                element.status !== "Done" ? (
                  <div className={styles.acceptButtonContainer}>
                    <div
                      onClick={() =>
                        handleDoneOrder(
                          element.restaurantId,
                          element.userId,
                          element.orderId
                        )
                      }
                      className={styles.acceptButtonCont}
                    >
                      <button>Accept</button>
                      <HiMiniCheck />
                    </div>
                    <div
                      onClick={() =>
                        handleRejectOrder(
                          element.restaurantId,
                          element.userId,
                          element.orderId
                        )
                      }
                      className={styles.acceptButtonCont}
                    >
                      <button>Reject</button>
                      <RxCross2 />
                    </div>
                  </div>
                ) : element.status === "Rejected" ? (
                  <div className={styles.done}>Rejected</div>
                ) : element.status === "Done" ? (
                  <div className={styles.done}>Accepted</div>
                ) : (
                  <div className={styles.done}>No Status</div>
                )}
              </p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-xl text-slate-800 font-bold">
              No orders found.
            </h1>
          </div>
        )}
      </div>

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

export default OrderRestaurant;
