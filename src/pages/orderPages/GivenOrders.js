import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
<<<<<<< Updated upstream

const GivenOrders = () => {
  // Assuming you will replace useSelector with real usage when needed
  // const user = useSelector((state) => state.user);

  const DUMMY_ORDERS = [
    { Meal: "Burger", Price: 100, IsActive: true },
    { Meal: "Kebap", Price: 80, IsActive: false },
  ];
=======
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
            console.log(result.orders);
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

    if (checkUserRole) {
      handleOrder();
    }
  }, [checkUserRole, userId, restId]);

  // const DUMMY_ORDERS_USER = [
  //   {
  //     Meal: "Burger",
  //     Price: 100,
  //     IsActive: "true",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  //   {
  //     Meal: "Kebap",
  //     Price: 80,
  //     IsActive: "false",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  //   {
  //     Meal: "Kebap",
  //     Price: 80,
  //     IsActive: "canceled",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  // ];
  // const DUMMY_ORDERS_RESTAURANT = [
  //   {
  //     Meal: "Burger",
  //     Price: 100,
  //     IsAccepted: "waiting",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  //   {
  //     Meal: "Kebap",
  //     Price: 80,
  //     IsAccepted: "accepted",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  //   {
  //     Meal: "Salat",
  //     Price: 60,
  //     IsAccepted: "accepted",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  //   {
  //     Meal: "Soup",
  //     Price: 10,
  //     IsAccepted: "rejected",
  //     Address: "Customers Address",
  //     Image:
  //       "https://dinnerthendessert.com/wp-content/uploads/2017/09/Korean-Fried-Chicken2-scaled.jpg",
  //   },
  // ];
>>>>>>> Stashed changes

  return (
    <div>
      <Navbar />
<<<<<<< Updated upstream
      {DUMMY_ORDERS.map((order, index) => (
        <div key={index}>
          <p>Meal: {order.Meal}</p>
          <p>Price: {order.Price}</p>
          <p>Active: {order.IsActive ? "Yes" : "No"}</p>
        </div>
      ))}
=======
      <div className={styles.mainContainer}>
        {checkUserRole == "user" ? (
          <OrderUser order={orderUser} />
        ) : (
          <OrderRestaurant order={orderRest} />
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default GivenOrders;
