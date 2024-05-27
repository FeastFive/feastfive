import React, { useState } from "react";
import { UserData } from "./Data";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";

export default function RestaurantCharts() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Orders Completed",
        data: UserData.map((data) => data.ordersCompleted),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="ml-10 mr-10">
      <h3 className="text-4xl font-semibold text-left my-2 py-8 flex flex-col">
        {" "}
        Restaurant Dashboard
      </h3>
      <div className="flex flex-row flex-wrap justify-center place-items-center gap-6   lg:px-4">
        <div className="w-[480px] sm:w-[550px] lg:w-[29%] flex justify-center">
          <BarChart chartData={userData} />
        </div>
        <div className="w-[480px] sm:w-[550px] lg:w-[29%] flex justify-center">
          <LineChart chartData={userData} />
        </div>
        <div className="w-[480px] sm:w-[550px] lg:w-[29%] flex justify-center">
          <BarChart chartData={userData} />
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-6 pt-12 py-24">
        <div className="bg-cyan-300 bg-opacity-40 w-[500px] lg:w-[370px] h-[200px] rounded-md shadow-md px-12 py-12">
          <h3 className="text-right text-4xl font-semibold pr-2 py-1">12</h3>

          <h3 className="text-right text-4xl font-bold">Total Visits</h3>
        </div>
        <div className="bg-violet-300 bg-opacity-40 w-[600px] lg:w-[470px]  h-[200px] rounded-md shadow-md px-12 py-12">
          <h3 className="text-right text-4xl font-semibold pr-2 py-1">4</h3>

          <h3 className="text-right text-4xl font-bold">Daily Orders</h3>
        </div>
        <div className="bg-orange-300 bg-opacity-40 w-[600px] lg:w-[470px]  h-[200px] rounded-md shadow-md px-12 py-12">
          <h3 className="text-right text-4xl font-semibold pr-2 py-1">27</h3>

          <h3 className="text-right text-4xl font-bold">Total Orders</h3>
        </div>
      </div>
    </div>
  );
}
