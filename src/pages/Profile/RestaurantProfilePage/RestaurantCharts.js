import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";

export default function RestaurantCharts() {
  const restaurant = useSelector((state) => state.restaurant);
  console.log(restaurant.orders);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);

  const calculateTotalEarnings = (orders) => {
    return orders.reduce((total, order) => {
      if (order.status === "Done") {
        const orderTotal = order.cartFoodList.reduce((orderSum, item) => {
          return orderSum + (item.price || 0);
        }, 0);
        return total + orderTotal;
      }
      return total;
    }, 0);
  };

  const calculateUniqueUsers = (orders) => {
    const userIds = new Set();
    orders.forEach((order) => {
      userIds.add(order.userId);
    });
    return userIds.size;
  };

  useEffect(() => {
    if (restaurant.orders) {
      const earnings = calculateTotalEarnings(restaurant.orders);
      setTotalEarnings(earnings);

      const uniqueUserCount = calculateUniqueUsers(restaurant.orders);
      setUniqueUsers(uniqueUserCount);
    }
  }, [restaurant.orders]);

  const barChartData = {
    labels: restaurant.orders.map((_, index) => index + 1),
    datasets: [
      {
        label: "Order Totals",
        data: restaurant.orders.map((order) => calculateTotalEarnings([order])),
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: restaurant.orders.map((_, index) => index + 1),
    datasets: [
      {
        label: "Total Earnings Over Time",
        data: restaurant.orders.map((order) => calculateTotalEarnings([order])),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Unique Users", "Other Users"],
    datasets: [
      {
        data: [uniqueUsers, restaurant.orders.length - uniqueUsers],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h3 className=" px-24 lg:pl-28 text-4xl font-bold pt-8 pb-2 ">Dashboard</h3>
      <div className="flex flex-row flex-wrap justify-center gap-6 pt-12 py-24">
        <div className="bg-cyan-300 bg-opacity-40 w-[600px] lg:w-[470px] h-[200px] rounded-md shadow-md px-8 py-8">
          <h3 className="text-right text-4xl font-semibold pr-2 py-1">
            {restaurant?.orders.length}
          </h3>
          <h3 className="text-right text-4xl font-bold">Total Orders</h3>
        </div>
        
        <div className="bg-violet-300 bg-opacity-40 w-[600px] lg:w-[470px] h-[200px] rounded-md shadow-md px-8 py-8">
          <h3 className="text-right text-4xl font-semibold pr-2 py-1">
            ${totalEarnings.toFixed(2)}
          </h3>
          <h3 className="text-right text-4xl font-bold">Total Earnings</h3>
        </div>
        <div className="bg-orange-300 bg-opacity-40 w-[600px] lg:w-[470px] h-[200px] rounded-md shadow-md px-8 py-8">
          <h3 className="text-right text-4xl font-semibold pr-2 py-1">
            {uniqueUsers}
          </h3>
          <h3 className="text-right text-4xl font-bold">Unique Users</h3>
        </div>
      </div>
      <h3 className=" px-24 lg:pl-28 text-4xl font-semibold py-4 border-t-2 pt-8 ">Charts</h3>
      <div className="flex flex-col lg:flex-row px-4 lg:px-24 gap-3">
        <div className="flex flex-col w-full lg:w-1/2 p-4">
          <div className="w-full p-4">
            <BarChart chartData={barChartData} />
          </div>
          <div className="w-full p-4">
            <LineChart chartData={lineChartData} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <PieChart chartData={pieChartData} />
        </div>
      </div>
    </div>
  );
}
