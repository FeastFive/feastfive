import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "../Menu.module.css";
import { setMeal } from "../../../store/slices/restaurantSlice";
import { updateMeal } from "../../../utils/meal/updateMeal";

import { useParams } from "react-router-dom";

export default function UpdateMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurant = useSelector((state) => state.restaurant);
  const [elem, setElem] = useState([]);
  const { mealId } = useParams();
  const mealsId = mealId;
  const filteredMeal = restaurant.meals.filter((meal) => meal.id === mealsId);
  const [optionList, setOptionList] = useState(
    filteredMeal.length > 0 ? filteredMeal[0].options : []
  );
  const [option, setOption] = useState("");
  // const [file, setFile] = useState();
  const [base64Image, setBase64Image] = useState(
    filteredMeal.length > 0 ? filteredMeal[0].image : ""
  );
  const [foodName, setFoodname] = useState(
    filteredMeal.length > 0 ? filteredMeal[0].name : ""
  );
  const [foodDesc, setFoodDesc] = useState(
    filteredMeal.length > 0 ? filteredMeal[0].description : ""
  );

  const [foodPrice, setfoodPrice] = useState(
    filteredMeal.length > 0 ? filteredMeal[0].price : ""
  );
  const [amount, setAmount] = useState("");
  const [foods, setFoods] = useState([]);

  function addOption() {
    if (option.trim() != "") {
      setOptionList([
        ...optionList,
        { option: option, elements: [], quantity: amount },
      ]);
      setElem([...elem, { option: option, state: "", price: 0 }]);
      setOption("");
    }
  }

  function adInnerOption(_option) {
    let newItem = {
      name: elem.find((a) => a.option == _option).state,
      price: elem.find((a) => a.option == _option).price,
    };

    setOptionList((prevOptionList) => {
      return prevOptionList.map((option) => {
        if (option.option === _option) {
          return {
            ...option,
            elements: [...option.elements, newItem],
          };
        }
        return option;
      });
    });
  }
  // https://stackoverflow.com/questions/54716914/413-payload-too-large-for-base64-string-after-adjusting-size-in-express
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
    }
  };

  function handleDeleteElement(optionElement, indexToDelete) {
    setOptionList((prevOptionList) => {
      return prevOptionList.map((option) => {
        if (option.option === optionElement.option) {
          return {
            ...option,
            elements: option.elements.filter(
              (_, index) => index !== indexToDelete
            ),
          };
        }
        return option;
      });
    });
  }

  const handleRestaurantUpdate = async () => {
    try {
      const meal = {
        name: foodName,
        description: foodDesc,
        image: base64Image,
        price: foodPrice,
        options: optionList,
      };
      console.log(meal);
      const obj = {
        id: restaurant.id,
        mealId: mealsId,
        updatedMealData: meal,
      };
      console.log(obj);
      const response = await updateMeal(obj);
      if (response.status == 200) {
        const result = await response.json();
        dispatch(setMeal({ meals: result.meals }));
        navigate("/restaurantPanel");

        ShowAlert(1, "Saved succesfully");
      } else if (response.status == 404) {
        ShowAlert(3, "An error occurred while fetching labels");
      } else {
        ShowAlert(3, "An error occurred while fetching labels");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while saving labels");
    }
  };

  return (
    <>
      <div className="flex flex-col place-items-center pt-12 px-8  sm:px-0 sm:w-[60%] md:w-[50%] lg:w-[30%] m-auto py-12 gap-1 pb-12">
        <IoArrowBack
          className={styles.backIcon}
          onClick={() => {
            navigate(-1);
          }}
        />
        <p className="w-full col-span-4">Food name:</p>
        <div className=" w-full flex flex-row">
          <input
            onChange={(e) => setFoodname(e.target.value)}
            placeholder={filteredMeal[0]?.name}
            className="border-2 border-slate-200 shadow-md px-4 py-3 h-10  focus:outline-none rounded-md w-full"
          ></input>
        </div>

        <p className="w-full col-span-4 pt-3">Food Description:</p>
        <div className=" w-full">
          <textarea
            onChange={(e) => setFoodDesc(e.target.value)}
            placeholder={filteredMeal[0]?.description}
            className="resize-y border-2 border-slate-200 shadow-md px-4 py-3 h-16  focus:outline-none rounded-md w-full"
          ></textarea>
        </div>

        <p className="w-full col-span-4 pt-2">Food Immage:</p>
        <div className=" w-full">
          <label className="block">
            <img
              src={filteredMeal.length > 0 ? filteredMeal[0].image : ""}
              alt="Food Image"
              className="block w-full h-auto text-sm text-slate-500 border-2 border-slate-200 px-4 py-4 rounded-md shadow-md cursor-pointer duration-200"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </label>
        </div>

        <p className="w-full col-span-4">Food Price:</p>
        <div className=" w-[40%] mr-auto flex flex-row">
          <input
            onChange={(e) => setfoodPrice(e.target.value)}
            placeholder={filteredMeal[0]?.price}
            className="border-2 border-slate-200 shadow-md px-4 py-3 h-10  focus:outline-none rounded-md w-full"
          ></input>
          <span className="pt-1 text-lg font-semibold pl-3">$</span>
        </div>

        <p className="w-full pt-4">Food Options:</p>
        <div className="flex flex-row  w-full shadow-md">
          <input
            placeholder="Enter the option"
            onChange={(e) => setOption(e.target.value)}
            value={option}
            className="border-2 border-slate-200 px-4 py-3 h-10  focus:outline-none rounded-l-md w-[80%] h-full "
          ></input>
          <div className="px-4 w-auto flex flex-col bg-[#db3748] bg-opacity-25 justify-center">
            <div className="flex flex-row ">
              <input
                type="radio"
                name="opt"
                value="more"
                className="checked:bg-red-600"
                onClick={(e) => setAmount("single")}
              />
              <label className="text-sm text-[#db3748] pl-1 ">Single</label>
            </div>
            <div className="flex flex-row">
              <input
                type="radio"
                name="opt"
                value="more"
                className="checked:bg-red-600"
                onClick={(e) => setAmount("multiple")}
              />
              <label className="text-sm text-[#db3748] pl-1 ">Multiple</label>
            </div>
          </div>

          <button
            className="w-[35%]  border-l-2 rounded-r-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 "
            onClick={() => addOption()}
          >
            Add
          </button>
        </div>
        <h3 className="w-full pt-2">Options</h3>

        {/* OPTİONLAR BURADA LİSTELİ (HAMUR,SOS) GİBİ*/}
        <div className="w-full pt-2  flex flex-row gap-3 flex-wrap">
          {optionList.map((optionElement) => (
            <button
              className="w-auto px-4  py-2 bg-red-400 shadow-md rounded-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 flex flex-row"
              onClick={() =>
                setOptionList(
                  optionList.filter(
                    (element) => element.option != optionElement.option
                  )
                )
              }
            >
              {optionElement.option}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-[-8px] ml-[3px] mt-[-4px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          ))}
        </div>

        {optionList.map((optionElement) => (
          <div key={optionElement} className="w-full pt-2">
            <h3>
              {optionElement.option}{" "}
              <span className="text-sm text-slate-400">
                ({optionElement.quantity})
              </span>
            </h3>

            <div className="flex flex-row  w-full">
              <input
                placeholder="Option"
                className="border-2 border-slate-200 shadow-md px-4 py-3 h-10 focus:outline-none w-full"
                onChange={(e) => {
                  const newValue = e.target.value;
                  setElem((prevState) => {
                    const updatedElem = prevState.map((item) => {
                      if (item.option === optionElement.option) {
                        return { ...item, state: newValue };
                      }
                      return item;
                    });
                    return updatedElem;
                  });
                }}
              />
              <div className="w-[40%]">
                <input
                  placeholder="Price"
                  className="border-2 border-l-0 border-slate-200 shadow-md px-4 py-3 h-10 focus:outline-none w-full"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setElem((prevState) => {
                      const updatedElem = prevState.map((item) => {
                        if (item.option === optionElement.option) {
                          return { ...item, price: newValue };
                        }
                        return item;
                      });
                      return updatedElem;
                    });
                  }}
                />
                <span className="absolute w-[1px] ml-[-13px] mt-[8px]">$</span>
              </div>

              <button
                className="w-[35%] bg-red-400 shadow-md rounded-r-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 "
                onClick={() => adInnerOption(optionElement.option)}
              >
                Add
              </button>
            </div>
            {/* HER INNER OPTION BURADA LISTELİ */}
            <div className="w-full pt-2 flex flex-row gap-3 flex-wrap">
              {optionElement.elements.map((element, index) => (
                <div className="" key={index}>
                  <button
                    className="w-auto px-4  py-2 bg-red-400 shadow-md rounded-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 flex flex-row"
                    onClick={() => handleDeleteElement(optionElement, index)}
                  >
                    {element.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-[-8px] ml-[3px] mt-[-4px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleRestaurantUpdate}
          className="bg-[#db3748] text-slate-800 bg-opacity-40 w-full h-10 rounded-md shadow-md mt-2 py-1 px-2 font-semibold text-md mt-4 duration-200 hover:bg-opacity-60"
        >
          Save
        </button>
      </div>
    </>
  );
}
