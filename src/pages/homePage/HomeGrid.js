import React, { useState } from "react";
import salata from "../../images/salata.png";
import { getRestaurant } from "../../utils/restaurant/getRestaurant";
import { useEffect } from "react";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";
import { cookieHandler } from "../../components/CookieHandler";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";
export default function HomeGrid({ list }) {
  const navigate = useNavigate();
  const [restaurantFilterList, setRestaurantFilterList] = useState();
  console.log(list);
  const [labelList, setLabelList] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setFoods(list ?? foods);
  }, [list]);

  useEffect(() => {
    const handleRestaurant = async () => {
      try {
        const response = await getRestaurant();

        if (response.status === 200) {
          const result = await response.json();
          setFoods(result.restaurants);
          console.log(result.restaurants);
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
    if (!list && foods.length === 0) {
      handleRestaurant();
    }
  }, []);
  function goRetaurant(element) {
    navigate(`/restaurantFoods/${element._id}`);
    cookieHandler(element);
  }

  useEffect(() => {
    let labelList = [];
    let cookieLabelList = Cookies.get("labelList")
      ? JSON.parse(Cookies.get("labelList"))
      : [];

    if (cookieLabelList.length > 0) {
      foods?.forEach((element) => {
        let value = 0;
        if (element && element.labels) {
          // Add null check for element and labels
          for (let index = 0; index < element.labels.length; index++) {
            let checkLabel = cookieLabelList.find(
              (e) => e.value === element.labels[index].label
            ); // Fix comparison operator
            if (checkLabel) {
              value += checkLabel.count;
            }
          }
          let obj = {
            _id: element._id,
            RestaurantName: element.restaurantName,
            labelValue: value,
          };
          labelList.push(obj);
        }
      });

      const sortedArray = labelList
        .slice()
        .sort((a, b) => b.labelValue - a.labelValue);
      setLabelList(sortedArray);
    }
  }, [foods]);

  useEffect(() => {
    let newRestaurantList = [];

    if (labelList.length > 0) {
      for (let a = 0; a < foods.length; a++) {
        let restaurantObj = foods.find((e) => e?._id === labelList[a]?._id);
        newRestaurantList.push(restaurantObj);
      }

      // Check if the newRestaurantList is different from the current foods state
      if (JSON.stringify(newRestaurantList) !== JSON.stringify(foods)) {
        setFoods(newRestaurantList);
      }
    }
    console.log(labelList);
  }, [labelList, foods]);

  const getLabelCount = (labels, labelCounts) => {
    return labels.reduce(
      (total, label) => total + (labelCounts[label.value]?.count || 0),
      0
    );
  };

  return (
    <div className="relative py-2 pb-24">
      <Loader></Loader>
      <div className=" pt-6 grid grid-cols-1 relative   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center  pt-3 justify-left gap-4 lg:gap-8 justify-left px-2">
        {foods?.length > 0 ? (
          foods.map((element, index) => (
            <div
              key={index}
              className="w-full h-auto pb-3 pt-1 mt-1 rounded-md shadow-md flex flex-col cursor-pointer duration-200 hover:scale-[103%] overflow-hidden"
              onClick={() => goRetaurant(element)}
            >
                <div className="h-[270px] overflow-hidden">
                <img
                  src={
                    element.image
                      ? element.image
                      : "	https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg"
                  }
                  alt="Delicious Food"
                  className="object-cover object-bottom md:h-[170px] lg:h-auto  overflow-hidden rounded-md"
                />
                </div>
              <div className="flex flex-col px-2 pt-3 ">
                <div className="flex flex-row w-full h-full justify-between">
                  <h3 className="text-md font-semibold">
                    {element && element.restaurantName
                      ? element.restaurantName
                      : "The Hunger"}
                  </h3>
                  <div className="flex flex-row">
                    <span className="text-yellow-400 text-lg mt[-2px]">★</span>
                    <p className="font-large pl-2">(2000+)</p>
                  </div>
                </div>
                <div className="flex flex-row w-full h-full text-xs font-medium text-gray-400 pb-1">
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
