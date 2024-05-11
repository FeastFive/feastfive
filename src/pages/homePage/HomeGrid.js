import React, { useState } from "react";
import salata from "../../images/salata.png";
import { getRestaurant } from "../../utils/restaurant/getRestaurant";
import { useEffect } from "react";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";

export default function HomeGrid({ list }) {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const handleRestaurant = async () => {
      try {
        const response = await getRestaurant();

        if (response.status === 200) {
          const result = await response.json();
          setFoods(result.restaurants);
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

  useEffect(() => {
    if (list) {
      setFoods(list);
    }
    console.log(foods);
  }, [foods]);
  return (
    <div>
      <div className=" pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center  pt-3 justify-left gap-8 justify-left ">
        {foods.length > 1 ? (
          foods.map((element, index) => (
            <div
              key={index}
              className="w-full h-auto pb-3 pt-1 mt-1 rounded-md shadow-md flex flex-col cursor-pointer duration-200  hover:scale-[103%] overflow-hidden"
              onClick={() => navigate(`/restaurantFoods/${element._id}`)}
            >
              <div className="w-full h-[69%] md:h-[60%] bg-red-400   mt-[-60px] overflow-hidden rounded-md">
                <img
                  src={
                    "https://img.freepik.com/premium-photo/photo-top-view-table-full-delicious-food-composition_1089395-1125.jpg?w=1380"
                  }
                  className="object-cover object-bottom bg-red-400   overflow-hidden rounded-md"
                ></img>
              </div>
              <div className="flex flex-col px-2 pt-3 ">
                <div className="flex flex-row  w-full h-full justify-between">
                  <h3 className="text-md font-semibold">
                    {foods ? element.restaurantName : "The Hunger"}
                  </h3>
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
          ))
        ) : (
          <h3>No restaurants</h3>
        )}
      </div>
    </div>
  );
}
