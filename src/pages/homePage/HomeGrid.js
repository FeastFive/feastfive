import React, { useState } from "react";
import salata from "../../images/salata.png";
import { getRestaurant } from "../../utils/restaurant/getRestaurant";
import { useEffect } from "react";

export default function HomeGrid({ list }) {
  const [restaurant, setRestaurant] = useState([]);
  const [foods, sedFoods] = useState([1, 2, 3, 4]);
  useEffect(() => {
    const handleRestaurant = async () => {
      try {
        const response = await getRestaurant();

        if (response.status === 200) {
          const result = await response.json();
          console.log(result.restaurants);
          setRestaurant(result.restaurant);
        } else if (response.status === 403) {
          ShowAlert(3, "An error occurred while fetching restaurant");
        } else {
          ShowAlert(3, "An error occurred while fetching restaurant");
        }
      } catch (error) {
        console.error("Error:", error);
        ShowAlert(3, "An error occurred while fetching restaurant");
      }
    };
    handleRestaurant();
  }, []);

  return (
    <div>
      <div className=" pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center  pt-3 justify-left gap-8 justify-left ">
        {(list ?? foods).map((element) => (
          <div
            key={element}
            className="w-full h-full  mt-4 rounded-md shadow-md flex flex-col cursor-pointer duration-200  hover:scale-[103%]"
          >
            <div className="w-full h-[69%] md:h-[60%] bg-red-400  overflow-hidden rounded-md">
              <img
                src={
                  "https://img.freepik.com/premium-photo/photo-top-view-table-full-delicious-food-composition_1089395-1125.jpg?w=1380"
                }
                className="object-cover  mt-[-10px] bg-red-400  overflow-hidden rounded-md"
              ></img>
            </div>
            <div className="flex flex-col px-2 pt-1 ">
              <div className="flex flex-row  w-full h-full justify-between">
                <h3 className="text-md font-semibold">The Hunger</h3>
                <div className="flex flex-row">
                  <span className="text-yellow-400 text-lg mt[-2px]">★</span>
                  <p className="font-large pl-2">(2000+)</p>
                </div>
              </div>
              <div className="flex flex-row  w-full h-full text-xs font-medium  text-gray-400 pb-1">
                150 TL minimum
              </div>

              <div className="flex flex-row w-full h-full text-sm font-medium ">
                30 min <span className="text-pink-600 pl-2">Ücretsiz</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
