import React, { useState, useEffect } from "react";
import HomeGrid from "../HomeGrid";
import Navbar from "../../../components/Navbar";
import { getRestaurant } from "../../../utils/restaurant/getRestaurant";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function FoodHome() {
  const [choosedAdress, setChoosedAdress] = useState(
    localStorage.getItem("adress")
      ? JSON.parse(localStorage.getItem("adress"))
      : {}
  );
  const navigate = useNavigate();
  const [radioList, setRadioList] = useState([
    "Suggested",
    "Most preferred",
    "Most liked",
  ]);
  const [selectedRadio, setSelectedRadio] = useState("Suggested");

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

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurant();
        if (response.status === 200) {
          const result = await response.json();
          let filteredRestaurants = result.restaurants;

          if (choosedAdress.province && choosedAdress.districts) {
            filteredRestaurants = result.restaurants.filter(
              (restaurant) =>
                restaurant.adress?.province === choosedAdress.province &&
                restaurant.adress?.district === choosedAdress.districts
            );
          }

          setRestaurants(filteredRestaurants);
          setFiltered(filteredRestaurants);
        } else {
          console.log("error");
        }
      } catch (error) {
        ShowAlert(3, "Failed to fetch restaurants. Please try again later.");
      }
    };

    fetchRestaurants();
  }, [choosedAdress]);

  const handleFilter = () => {
    let filteredRestaurants = [...restaurants];

    if (selectedCategories.length > 0) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.labels.some((label) =>
          selectedCategories.includes(label.value)
        )
      );
    }

    if (selectedRadio === "Most liked") {
      filteredRestaurants.sort((a, b) => {
        const avgRatingA = calculateAverageRating(a);
        const avgRatingB = calculateAverageRating(b);
        return avgRatingB - avgRatingA;
      });
    } else if (selectedRadio === "Most preferred") {
      filteredRestaurants.sort((a, b) => {
        const commentCountA = a.comments.length;
        const commentCountB = b.comments.length;
        return commentCountB - commentCountA;
      });
    } else if (selectedRadio === "Suggested") {
      console.log("suggested");
    }

    setFiltered(filteredRestaurants);
  };

  const handleClearAll = () => {
    setSelectedRadio("");
    setSelectedCategories([]);
    setFiltered(restaurants);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategories, selectedRadio]);

  const calculateAverageRating = (restaurant) => {
    if (restaurant.comments.length > 0) {
      const totalRating = restaurant.comments.reduce(
        (total, comment) => total + comment.rating,
        0
      );
      return totalRating / restaurant.comments.length;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 md:px-12 lg-px-12 gap-3 pt-12 pb-12">
        <div className=" col-span-full lg:col-span-1 w-full h-auto lg:h-screen lg:sticky z-[3000] top-0 overflow-scroll lg:px-4 px-4 pl-5 pt-6 bg-[#F9FCFB] border-2 rounded-md shadow-md border-slate-100  lg:block">
          <div className="flex flex-row justify-between">
            <h3 className="font-semibold text-xl">Filter</h3>
            <p
              className="text-base text-[#db3748] cursor-pointer hover:text-orange-400 duration-200"
              onClick={handleClearAll}
            >
              Clear All
            </p>
          </div>
          <h3 className="pt-4 text-sm  font-semibold">Ranking</h3>
          <ul className="pt-1 flex flex-row lg:flex-col lg:gap-1 gap-4">
            {radioList.map((radio, index) => (
              <li key={index} className="flex flex-row gap-4 pt-1">
                <input
                  type="radio"
                  className="w-4 bg-none"
                  name="rateRadio"
                  value={radio}
                  checked={selectedRadio === radio}
                  onChange={handleRadioChange}
                />
                <span className="text-sm font-medium">{radio}</span>
              </li>
            ))}
          </ul>
          <ul className="pt-4 ">
            <h3 className="pb-1 text-sm font-semibold">Cuisine</h3>
            <div className="mb-1 mt-1 bg">
              <input
                placeholder="Search Kitchens"
                className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-full lg:w-[90%] text-sm py-1 pb-2"
              ></input>
            </div>
            <div className="flex lg:flex-col flex-row flex-wrap lg:gap-1 pt-4 gap-4">
              {categories.map((category) => (
                <li
                  key={category}
                  className="flex flex-row lg:gap-4 gap-2 pt-2"
                >
                  <input
                    type="checkbox"
                    className="w-4 bg-none"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  ></input>
                  <span className="font-medium text-sm">{category}</span>
                </li>
              ))}
            </div>
          </ul>
          {/* <div>
            <h3 className="mt-2 text-sm">Price</h3>
            <input
              placeholder="min $"
              className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[60%] text-sm py-1 pb-2 mt-2"
            ></input>
            <input
              placeholder="max $"
              className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[60%] text-sm py-1 pb-2 mt-2"
            ></input>
          </div> */}
          <button
            className="w-full h-10 mt-6 bg-[#db3748] hover:bg-orange-500 duration-200 text-slate-100 mt-3  rounded-xl shadow-lg"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div className="col-span-5 md:col-span-5 relative lg:col-span-4 w-full h-auto px-4 pt-6">
          <h3 className="text-2xl">Restaurants found</h3>
          <div>
            {filtered.length > 0 ? <HomeGrid list={filtered} /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
