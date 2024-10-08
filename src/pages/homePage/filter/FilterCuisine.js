import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRestaurant } from "../../../utils/restaurant/getRestaurant";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import Navbar from "../../../components/Navbar";
import styles from "./Filter.module.css";
import HomeGrid from "../HomeGrid";

const FilterCuisine = () => {
  const [choosedAdress, setChoosedAdress] = useState(
    localStorage.getItem("adress")
      ? JSON.parse(localStorage.getItem("adress"))
      : {}
  );
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { cuisine } = location.state || {};
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (cuisine && cuisine.name) {
      setSelectedCategories([cuisine.name]);
    }
  }, [cuisine]);

  useEffect(() => {
    const handleRestaurant = async () => {
      setLoading(true);
      try {
        const response = await getRestaurant();

        if (response.status === 200) {
          const result = await response.json();
          setRestaurants(result.restaurants);
        } else {
          ShowAlert(3, "An error occurred while fetching restaurant");
        }
      } catch (error) {
        console.error("Error:", error);
        ShowAlert(3, "An error occurred while fetching restaurant");
      } finally {
        setLoading(false);
      }
    };

    handleRestaurant();
  }, []);

  useEffect(() => {
    if (restaurants.length > 0) {
      let filteredRestaurants = restaurants;

      // Filter by selected categories
      if (selectedCategories.length > 0) {
        filteredRestaurants = filteredRestaurants.filter((restaurant) =>
          restaurant.labels.some((label) =>
            selectedCategories.includes(label.value)
          )
        );
      }

      // Filter by address
      if (choosedAdress.province && choosedAdress.districts) {
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) =>
            restaurant.adress?.province === choosedAdress.province &&
            restaurant.adress?.district === choosedAdress.districts
        );
      }

      setFiltered(filteredRestaurants);
    }
  }, [restaurants, selectedCategories, choosedAdress]);

  useEffect(() => {
    if (!isEmpty) {
      setTimeout(() => {
        setIsEmpty(true);
      }, [1400]);
    }
  }, []);

  return (
    <div className="pb-24 overflow-x-hidden">
      <div className="pt-4 px-8 md:px-16 lg:px-32">
        <div className="flex flex-row justify-left gap-3 pb-7 pt-8 border-b-2 border-gray-300 w-full lg:w-[400px] relative">
          <img
            src={cuisine?.image}
            alt="cuisine"
            className="rounded-md shadow-lg h-[140px] w-auto"
          />
          <h3 className="text-3xl font-bold pt-1 pl-2">{cuisine?.name}</h3>
        </div>

        <div className="pt-8 lg:pt-4 relative pb-12">
          <h3 className="text-3xl font-semibold">
            Restaurants with{" "}
            <span className="text-[#DB3748]">{cuisine?.name}</span>
          </h3>

          {loading ? (
            <div className="h-screen"></div>
          ) : filtered.length > 0 ? (
            <HomeGrid list={filtered}></HomeGrid>
          ) : (
            <h1 className="text-xl text-slate-800 font-bold">
              Sorry, there is no restaurant.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};



export default FilterCuisine;
