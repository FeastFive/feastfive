import React, { useState } from 'react';
import { UserData } from "./Data";
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';

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
    <div>
                <h2 className='text-center text-3xl font-semibold py-4 pb-6 px-4 text-slate-900'>Restaurant Statistics</h2>
                <div className='flex flex-row flex-wrap justify-center place-items-center gap-12 px-24 lg:px-4 pb-24'>
        

        <div className='w-[480px] lg:w-[640px] flex justify-center py-6'>
          <BarChart chartData={userData} />
        </div>
        <div className='w-[480px] lg:w-[640px] flex justify-center py-6'>
          <LineChart chartData={userData} />
        </div>
        <div className='w-[480px] lg:w-[640px] flex justify-center py-6'>
          <PieChart chartData={userData} />
        </div>
        <div className='w-[480px] lg:w-[640px] flex justify-center py-6'>
          <PieChart chartData={userData} />
        </div>
      </div>
    </div>
   
  );
}
