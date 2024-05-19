import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import styles from "./Given.module.css";
import OrderUser from "../../components/OrderUser";
import OrderRestaurant from "../../components/OrderRestaurant";
import { getOrders } from "../../utils/restaurant/getOrders";
import { getUserOrders } from "../../utils/user/getUserOrders";
import { ShowAlert } from "../../components/alert/ShowAlert";
const GivenOrders = () => {
  const [checkUserRole, setCheckUserRole] = useState("");
  const [orderUser, setOrderUser] = useState([]);
  const [orderRest, setOrderRest] = useState([]);

  const user = useSelector((state) => state.user);
  const userId = user.id;
  const restaurant = useSelector((state) => state.restaurant);
  const restId = restaurant.id;

  useEffect(() => {
    if (user.role === "user") {
      setCheckUserRole("user");
    } else if (restaurant.role === "restaurant") {
      setCheckUserRole("restaurant");
    } else {
      setCheckUserRole("");
    }
  }, [user, restaurant]);

  useEffect(() => {
    const handleOrder = async () => {
      try {
        if (checkUserRole === "user") {
          const response = await getUserOrders(userId);
          if (response.status === 200) {
            const result = await response.json();
            setOrderUser(result.orders);
          } else if (response.status === 403) {
            ShowAlert(3, "An error occurred while fetching orders");
          } else {
            ShowAlert(3, "An error occurred while fetching orders");
          }
        } else if (checkUserRole === "restaurant") {
          const response = await getOrders(restId);
          if (response.status === 200) {
            const result = await response.json();
            console.log(result.orders);
            setOrderRest(result.orders);
          } else if (response.status === 403) {
            ShowAlert(3, "An error occurred while fetching orders");
          } else {
            ShowAlert(3, "An error occurred while fetching orders");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        ShowAlert(3, "An error occurred while fetching orders");
      }
    };

    console.log(orderUser);
    if (checkUserRole) {
      handleOrder();
    }
  }, [checkUserRole, userId, restId]);

  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        {checkUserRole == "user" ? (
          <OrderUser order={orderUser} />
        ) : (
          <OrderRestaurant order={orderRest} />
        )}
      </div>
    </div>
  );
};

export default GivenOrders;
