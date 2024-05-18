import React, { useState } from "react";
import salata from "../../images/salata.png";
import { getRestaurant } from "../../utils/restaurant/getRestaurant";
import { useEffect } from "react";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";
import { cookieHandler } from "../../components/CookieHandler";
import Cookies from "js-cookie";
export default function HomeGrid({ list }) {
  const navigate = useNavigate();
  const [restaurantFilterList, setRestaurantFilterList] = useState();
  const [favorities, setFavorities] = useState([]);
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
  }, [labelList, foods]);

  useEffect(()=>{
    const storedFavorities = JSON.parse(localStorage.getItem("favorities"));
    if(storedFavorities){
      setFavorities(storedFavorities);
    }

  },[])

  useEffect(()=>{
    console.log(favorities)

  },[favorities])
  function addFavorite(restaurantId) {
    if (favorities.length > 0) {
      let checkedRestaurant = favorities.find(e => e === restaurantId);

      if (checkedRestaurant) {
        let newFilteredList = favorities.filter(a => a !== restaurantId);
        setFavorities(newFilteredList);
        localStorage.setItem("favorities", JSON.stringify(newFilteredList));
        ShowAlert(5, "Removed from favorities.")
      } else {
        let newPushedList = [...favorities, restaurantId];
        console.log(newPushedList);
        setFavorities(newPushedList);
        localStorage.setItem("favorities", JSON.stringify(newPushedList));
        ShowAlert(4, "Added to favorities.")

      }
    } else {
      let newPushedList = [restaurantId];
      setFavorities(newPushedList);
      localStorage.setItem("favorities", JSON.stringify(newPushedList));
      ShowAlert(4, "Added to favorities.")

    }
  }

  function isFavorited(restaurandId) {
    if(favorities.length > 0){
      let checkedRestaurant = favorities.find(e => e == restaurandId);
      
      if(checkedRestaurant){
        return true;

      }else{
        return false;
      }


    }
    else{
      return false;
    }
   

  }

  return (
    <div>
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center pt-3 justify-left gap-8 justify-left">
        {foods?.length > 0 ? (
          foods.map((element, index) => (
            <div
              key={index}
              className="w-full h-auto relative pb-3 pt-1 mt-1 rounded-md shadow-md flex flex-col cursor-pointer duration-200 hover:scale-[103%] overflow-hidden"
            >
              {element && element._id && ( // Check if element is defined and has _id property
                <button onClick={() => addFavorite(element._id)} className="absolute right-2 top-0 z-[300] text-slate-100 px-2 py-1 bg-[#DB3748] rounded-b-full bg-opacity-90">
                  {!isFavorited(element._id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  )}
                </button>
              )}
              <div
                onClick={() => goRetaurant(element._id)}
                className="w-full h-[69%] md:h-[60%] bg-red-400 mt-[-60px] overflow-hidden rounded-md"
              >
                <img
                  src={"https://img.freepik.com/premium-photo/photo-top-view-table-full-delicious-food-composition_1089395-1125.jpg?w=1380"}
                  className="object-cover object-bottom bg-red-400 overflow-hidden rounded-md"
                  alt=""
                />
              </div>
              <div className="flex flex-col px-2 pt-3">
                <div className="flex flex-row w-full h-full justify-between">
                  <h3 className="text-md font-semibold">
                    {element && element.restaurantName ? element.restaurantName : "The Hunger"}
                  </h3>
                  <div className="flex flex-row">
                    <span className="text-yellow-400 text-lg mt[-2px]">★</span>
                    <p className="font-large pl-2">(2000+)</p>
                  </div>
                </div>
                <div className="flex flex-row w-full h-full text-xs font-medium text-gray-400 pb-1">
                  150 TL minimum
                </div>
                <div className="flex flex-row w-full h-full text-sm font-medium">
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
