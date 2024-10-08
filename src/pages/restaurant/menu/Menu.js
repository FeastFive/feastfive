import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { addMeal } from "../../../utils/meal/addMeal";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "../Menu.module.css";
import { setMeal } from "../../../store/slices/restaurantSlice";

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurant = useSelector((state) => state.restaurant);
  const [optionList, setOptionList] = useState([]);
  const [option, setOption] = useState("");
  const [elem, setElem] = useState([]);

  // const [file, setFile] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [foodName, setFoodname] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [foodPrice, setfoodPrice] = useState("");
  const [amount, setAmount] = useState("");

  const addFood = async () => {
    let obj = {
      id: restaurant.id,
      // restaurantEmail: restaurant.email,
      name: foodName,
      description: foodDesc,
      image: base64Image,
      price: parseFloat(foodPrice),
      options: optionList,
    }
    console.log(obj)
    try {
      if (
        !obj.name ||
        !obj.price ||
        !obj.id ||
        !obj.description ||
        !obj.image != ""
      ) {
        ShowAlert(2, "Please fill required fields");
        return;
      }
      if (!parseFloat(obj.price)) {
        ShowAlert(2, "Please enter integer price");
        return;
      }
      let integerCheck = true;
      if (obj.options.length > 0) {
        obj.options.forEach((element) => {
          if (element.elements) {
            element.elements.forEach((e) => {
              if (!parseFloat(e.price)) {
                integerCheck = false;
              }
            });
          }
        });
      }
      if (!integerCheck) {
        ShowAlert(2, "Please enter integer price");
        return;
      }
      const response = await addMeal(obj);
      if (response.status === 200) {
        const result = await response.json();
        dispatch(setMeal({ meals: result.meals }));
        ShowAlert(1, "Added in successfully");

        setTimeout(()=>{
          window.location.reload();
        },1000)
      } else {
        ShowAlert(3, "Invalid data");
      }
    } catch (err) {
      console.log("Add meal error", err);
      ShowAlert(3, "An error occured while adding meal");
    }
  };

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
      price: parseFloat(elem.find((a) => a.option == _option).price),
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
            placeholder="Enter the food name"
            className="border-2 border-slate-200 shadow-md px-4 py-3 h-10  focus:outline-none rounded-md w-full"
          ></input>
        </div>

        <p className="w-full col-span-4 pt-3">Food Description:</p>
        <div className=" w-full">
          <textarea
            onChange={(e) => setFoodDesc(e.target.value)}
            placeholder="Enter the food description"
            className="resize-y border-2 border-slate-200 shadow-md px-4 py-3 h-16  focus:outline-none rounded-md w-full"
          ></textarea>
        </div>

        <p className="w-full col-span-4 pt-2">Food Immage:</p>
        <div className=" w-full">
          <label className="block">
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-slate-500 border-2 border-slate-200 px-4 py-4 rounded-md shadow-md cursor-pointer duration-200
      file:mr-4 file:py-2 file:px-4
      file:cursor-pointer
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-[#db3748] file:bg-opacity-20 file:text-[#db3748] file:duration-200
      hover:file:bg-opacity-40
    "
              onChange={handleFileInputChange}
            />
          </label>
        </div>

        <p className="w-full col-span-4">Food Price:</p>
        <div className=" w-[40%] mr-auto flex flex-row">
          <input
            onChange={(e) => setfoodPrice(e.target.value)}
            placeholder="100 $"
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
          className="bg-[#db3748] text-slate-800 bg-opacity-40 w-full h-10 rounded-md shadow-md mt-2 py-1 px-2 font-semibold text-md mt-4 duration-200 hover:bg-opacity-60"
          onClick={addFood}
        >
          Save
        </button>
      </div>
    </>
  );
}
