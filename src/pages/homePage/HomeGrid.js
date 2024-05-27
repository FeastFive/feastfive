import React, { useState, useEffect } from "react";
import { getRestaurant } from "../../utils/restaurant/getRestaurant";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";
import { cookieHandler } from "../../components/CookieHandler";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";

export default function HomeGrid({ list }) {
  const navigate = useNavigate();
  const [favorities, setFavorities] = useState([]);
  const [foods, setFoods] = useState([]);
  console.log(foods);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (list) {
      setFoods(list);
      const calculatedRatings = list.map((restaurant) => {
        if (restaurant.comments.length > 0) {
          const totalRating = restaurant.comments.reduce(
            (total, comment) => total + comment.rating,
            0
          );
          const averageRating = (
            totalRating / restaurant.comments.length
          ).toFixed(1);
          return {
            restaurantName: restaurant.restaurantName,
            rating: averageRating,
          };
        } else {
          return { restaurantName: restaurant.restaurantName, rating: 0 };
        }
      });
      setRatings(calculatedRatings);
    }
  }, [list]);

  useEffect(() => {
    const handleRestaurant = async () => {
      try {
        const response = await getRestaurant();

        if (response.status === 200) {
          const result = await response.json();
          // console.log(result.restaurants[15].image);

          // Restoranları yükle
          setFoods(result.restaurants);

          const calculatedRatings = result.restaurants.map((restaurant) => {
            if (restaurant.comments.length > 0) {
              const totalRating = restaurant.comments.reduce(
                (total, comment) => total + comment.rating,
                0
              );
              const averageRating = (
                totalRating / restaurant.comments.length
              ).toFixed(1);
              return {
                restaurantName: restaurant.restaurantName,
                rating: averageRating,
              };
            } else {
              return { restaurantName: restaurant.restaurantName, rating: 0 };
            }
          });
          setRatings(calculatedRatings);
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
  }, [list, foods]);

  function goRestaurant(element, setRating) {
    navigate(`/restaurantFoods/${element?._id}`);
    cookieHandler(element);
  }

  useEffect(() => {
    const storedFavorities = JSON.parse(localStorage.getItem("favorities"));
    if (storedFavorities) {
      setFavorities(storedFavorities);
    }
  }, []);

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
            );
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
      let newList = labelList
        .slice()
        .sort((a, b) => b.labelValue - a.labelValue);

      if (newList.length > 0) {
        const newRestaurantList = [];
        for (let a = 0; a < newList.length; a++) {
          const labelId = newList[a]._id;
          const restaurantObj = foods.find((e) => e && e._id === labelId);
          if (restaurantObj) {
            newRestaurantList.push(restaurantObj);
          }
        }

        if (JSON.stringify(newRestaurantList) !== JSON.stringify(foods)) {
          // Update foods state with newRestaurantList
          setFoods(newRestaurantList);
        }
      }
    }
  }, [foods]);

  useEffect(() => {
    const storedFavorities = JSON.parse(localStorage.getItem("favorities"));
    if (storedFavorities) {
      setFavorities(storedFavorities);
    }
  }, []);

  function addFavorite(restaurantId) {
    const updatedFavorities = favorities.includes(restaurantId)
      ? favorities.filter((id) => id !== restaurantId)
      : [...favorities, restaurantId];

    setFavorities(updatedFavorities);
    localStorage.setItem("favorities", JSON.stringify(updatedFavorities));
    ShowAlert(
      updatedFavorities.includes(restaurantId) ? 4 : 5,
      updatedFavorities.includes(restaurantId)
        ? "Added to favorities."
        : "Removed from favorities."
    );
  }

  function isFavorited(restaurantId) {
    return favorities.includes(restaurantId);
  }

  return (
    <div className="relative py-2">
      <Loader />
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center pt-3 justify-left gap-8 justify-left">
        {foods.length > 0 ? (
          foods.map((element, index) => (
            <div
              key={index}
              className="w-full h-auto relative pb-3 pt-1 mt-1 rounded-md shadow-md flex flex-col cursor-pointer duration-200 hover:scale-[103%] overflow-hidden"
            >
              {element && element._id && (
                <button
                  onClick={() => addFavorite(element._id)}
                  className="absolute right-2 top-0 z-[300] text-slate-100 px-2 py-1 bg-[#DB3748] rounded-b-full bg-opacity-90"
                >
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
                onClick={() => goRestaurant(element)}
                className="w-full h-[69%] md:h-[60%] bg-red-400 mt-[-60px] overflow-hidden rounded-md"
              >
                <img
                  src={
                    element.image
                      ? element.image
                      : "https://img.freepik.com/premium-photo/photo-top-view-table-full-delicious-food-composition_1089395-1125.jpg?w=1380"
                  }
                  alt="Delicious Food"
                  className="object-cover object-bottom bg-red-400 overflow-hidden rounded-md"
                />
              </div>
              <div
                className="flex flex-col px-2 pt-3"
                onClick={() => goRestaurant(element)}
              >
                <div className="flex flex-row w-full h-full justify-between">
                  <h3 className="text-md font-semibold">
                    {element &&
                      element.restaurantName &&
                      element.restaurantName}
                  </h3>
                  <div className="flex flex-row">
                    <span className="text-yellow-400 text-lg mt[-2px]">★</span>
                    <p className="font-large pl-2">
                      {ratings.find(
                        (item) => item.restaurantName === element.restaurantName
                      )?.rating || "0"}
                    </p>
                    <p className="font-large pl-2">
                      ({element.comments.length}+)
                    </p>
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
