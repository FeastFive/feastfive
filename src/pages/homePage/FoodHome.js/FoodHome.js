import React, { useState, useEffect } from "react";
import HomeGrid from "../HomeGrid";
import Navbar from "../../../components/Navbar";
import { getRestaurant } from "../../../utils/restaurant/getRestaurant";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function FoodHome() {
  const navigate = useNavigate();
  const [radioList, setTRadioList] = useState([
    "Suggested",
    "Most preferred",
    "Most liked",
  ]);

  const [categories, setCategories] = useState([
    "Meat",
    "Chicken",
    "Pasta",
    "Pizza",
    "Kebap",
    "Salad",
    "Burger",
    "Sushi",
    "Homemade",
    "Vegan",
    "Sandwich",
    "Dessert",
    "Drinks",
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("selectedCategories");

  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurant();
        if (response.status === 200) {
          const result = await response.json();
          setFiltered(result.restaurants);
          setRestaurants(result.restaurants);
        } else {
          handleFetchError();
        }
      } catch (error) {
        ShowAlert(3, "Failed to fetch restaurants. Please try again later.");
      }
    };

    fetchRestaurants();
  }, []);

  const handleFilter = () => {
    if (restaurants.length > 0) {
      if (selectedCategories.length > 0) {
        const filtereds = restaurants.filter((restaurant) =>
          restaurant.labels.some((label) =>
            selectedCategories.includes(label.value)
          )
        );
        setFiltered(filtereds);
      } else {
        setFiltered(restaurants);
      }
    } else {
      setFiltered([]);
    }
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      
      <div className=" grid grid-cols-5 md:px-12 lg-px-24 gap-6 pt-12 ">
        
        <div className="col-span-1 w-full h-screen sticky top-0 overflow-scrool  px-3 pl-5 pt-6 bg-[#F9FCFB] border-2 rounded-md shadow-md border-slate-100 hidden md:hidden lg:block">
          <div className="flex flex-row justify-between">
            <h3 className="font-semibold text-xl">Filter</h3>
            <p className="text-base text-[#db3748] cursor-pointer hover:text-orange-400 duration-200">
              Clear All
            </p>
          </div>

          {/*Sıramala*/}
          <h3 className="pt-4 text-sm">Ranking</h3>
          <ul className="pt-1">
            {radioList.map((radio) => (
              <li key={radio} className="flex flex-row gap-4 pt-1">
                <input
                  type="radio"
                  className="w-4 bg-none "
                  name="rateRadio"
                ></input>
                <span className="text-sm font-medium ">{radio}</span>
              </li>
            ))}
          </ul>

          {/*Mutfaklar*/}
          <ul className="pt-4">
            <h3 className="pb-1 text-sm">Cuisine</h3>
            <div className="mb-1 mt-1">
              <input
                placeholder="Search Kitchens"
                className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[90%] text-sm py-1 pb-2"
              ></input>
            </div>

            {categories.map((category) => (
              <li key={category} className="flex flex-row gap-4 pt-2">
                <input
                  type="checkbox"
                  className="w-4 bg-none"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                ></input>

                <span className="font-medium text-sm">{category}</span>
              </li>
            ))}
          </ul>

          {/*Fiyat*/}
          <div>
            <h3 className="mt-2 text-sm">Price</h3>
            <input
              placeholder="min $"
              className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[60%] text-sm py-1 pb-2 mt-2"
            ></input>
            <input
              placeholder="max $"
              className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[60%] text-sm py-1 pb-2 mt-2"
            ></input>
          </div>

          <button
            className="w-full h-8 bg-[#db3748] hover:bg-orange-500 duration-200 text-slate-100 mt-3  rounded-xl shadow-lg"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div className=" col-span-5 md:col-span-5 relative lg:col-span-4 w-full h-auto px-4 pt-6   ">
          <h3 className="text-2xl">Restaurants found</h3>
          
          <div>

      {filtered.length > 0 ? (
        <HomeGrid list={filtered} />
      ) : (
        <h3>No restaurants</h3>
      )}
    </div>

        </div>
      </div>
    </>
  );
}
