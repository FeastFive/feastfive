import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import Cart from "../../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { addFoodToCard, resetAll } from "../../../store/slices/cartSlice";
export default function RestaurantFoods() {
  let { restaurandId } = useParams();
  const navigate = useNavigate();
  const [choosedFood, setchoosedFood] = useState();
  const [foodList, setFoodList] = useState([
    {
      price: 150,
      description: " Tavuk döner + Büyük boy içecek yanında.",
      name: "Tavuk Döner",
      image:
        "https://i.lezzet.com.tr/images-xxlarge-recipe/tavuk-doner-d35e16f6-d541-4a18-a766-1ab3e5368e86.jpg",
      options: [
        {
          elements: [
            { name: "Tombik", price: 0 },
            { name: "Fırın", price: 10 },
          ],
          option: "Ekmek",
          quantitiy: "single",
        },
        {
          elements: [
            { name: "Mayonez", price: 0 },
            { name: "Ketçap", price: 0 },
          ],
          option: "Sos",
          quantitiy: "multiple",
        },
      ],
    },
    {
      price: 350,
      description: " Margarita pizza + Büyük boy içecek yanında.",
      name: "Pizza",
      image:
        "https://i.lezzet.com.tr/images-xxlarge-recipe/tavuk-doner-d35e16f6-d541-4a18-a766-1ab3e5368e86.jpg",
      options: [
        {
          elements: [
            { name: "Kalın", price: 10 },
            { name: "İnce", price: 0 },
          ],
          option: "Kenar",
          quantitiy: "single",
        },
        {
          elements: [
            { name: "Balzamik", price: 20 },
            { name: "Pesto", price: 20 },
          ],
          option: "Sos",
          quantitiy: "multiple",
        },
      ],
    },
  ]);

  const [foodObject, setFoodObject] = useState({
    foodName: "",
    price: 0,
    options: [],
    singleOption: null,
    count: 1,
  });
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  function chooseFood(food) {
    if (user.isLogin) {
      setchoosedFood((prew) => (prew = food));
    } else {
      console.log("a");
      ShowAlert(5, "You need to login !");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }
  function addFood(food) {
    console.log("sa");
    const existingFood = order.find((e) => e.id === food);

    if (!existingFood) {
      setOrder([...order, { id: food, total: 1 }]);
    } else {
      const updatedOrder = order.map((_food) =>
        _food.id === food ? { ..._food, total: _food.total + 1 } : _food
      );
      setOrder(updatedOrder);
    }

    ShowAlert(4, `${food} Added to cart`);
  }

  function removeFood(foodId) {
    const existingFood = order.find((e) => e.id === foodId);
    if (existingFood) {
      if (existingFood.total === 1) {
        const updatedOrder = order.filter((food) => food.id !== foodId);
        setOrder(updatedOrder);
      } else {
        const updatedOrder = order.map((food) =>
          food.id === foodId ? { ...food, total: food.total - 1 } : food
        );
        setOrder(updatedOrder);
      }
    }
    ShowAlert(5, `${foodId} Removed from cart`);
  }

  function multipleOption(option) {
    if (!foodObject || !Array.isArray(foodObject.options)) {
      // Handle the case where foodObject or foodObject.options is not properly initialized
      console.error(
        "foodObject or foodObject.options is not properly initialized"
      );
      return;
    }

    if (foodObject.options.includes(option.name)) {
      const updatedOptions = foodObject.options.filter(
        (existingOption) => existingOption !== option.name
      );
      setFoodObject((prevState) => ({
        ...prevState,
        price: prevState.price - option.price,
        options: updatedOptions,
      }));
    } else {
      console.log(option.price);
      const updatedOptions = [...foodObject.options, option.name];
      setFoodObject((prevState) => ({
        ...prevState,
        price: prevState.price + option.price,
        options: updatedOptions,
      }));
    }
  }

  function singleOption(option) {
    if (foodObject.singleOption && foodObject.singleOption == option.name) {
      return;
    } else if (
      foodObject.singleOption &&
      foodObject.singleOption !== option.name
    ) {
      let prewSingle = choosedFood.options.find((e) => e.quantitiy == "single");
      let prewSinglePrice = prewSingle.elements.find(
        (e) => e.name == foodObject.singleOption
      ).price;
      console.log(
        prewSingle.elements.find((e) => e.name == foodObject.singleOption)
      );
      setFoodObject((prevState) => ({
        ...prevState,
        price: prevState.price - prewSinglePrice + option.price,
        singleOption: option.name,
      }));
    } else {
      setFoodObject((prevState) => ({
        ...prevState,
        price: prevState.price + option.price,
        singleOption: option.name,
      }));
    }
  }
  function orderMeal() {
    //console.log(foodObject)
    dispatch(addFoodToCard(foodObject));
  }

  function reset() {
    setchoosedFood(null);
    setFoodObject({ foodName: "", price: 0, options: [], singleOption: null });
  }
  useEffect(() => {
    //console.log(foodObject);
  }, [foodObject]);

  useEffect(() => {
    console.log(choosedFood);
    setFoodObject((prev) => ({
      ...prev,
      foodName: choosedFood ? choosedFood.name : "",
      price: choosedFood ? choosedFood.price : 0,
    }));
  }, [choosedFood]);

  return (
    <div className="w-full h-full   pb-24">
      <Cart></Cart>

      {choosedFood ? (
        <div className="w-full h-full overflow-y-scroll absolute z-10 bg-slate-100 flex justify-center ">
          <button
            onClick={() => reset()}
            className="absolute top-0 left-0 bg-red-200 bg-opacity-30 rounded-md shadow-sm ml-4 mt-4 px-6 py-2 hover:bg-opacity-90 duration-200 ease"
          >
            Geri
          </button>

          <div className="flex flex-col md:w-[80%] lg:w-[65%] pt-12 rounded-lg  px-2">
            <div className="flex flex-col flex-col-reverse	 lg:flex-row W-[100%] justify-between h-auto border-b-[3px]  px-12 py-4 rounded-t-md rounded-bottom-0">
              <div className="flex flex-col w-[100%]">
                <h3 className="h-auto font-semibold text-3xl pt-8">
                  {choosedFood.name}
                </h3>

                <p className="pt-2 pb-4">{choosedFood.description}</p>

                <div className="">
                  {choosedFood.options ? (
                    <div>
                      {choosedFood.options.map((optionElement) => (
                        <div>
                          <h3 className="text-xl  font-semibold mb-4">
                            {optionElement.option}
                          </h3>
                          {optionElement.quantitiy == "multiple" ? (
                            <div className="flex flex-col">
                              {optionElement.elements.map((e) => (
                                <div className="flex flex-row gap-2 w-[70%] rounded-md shadow-sm bg-opacity-10 pl-4 bg-[#db3748] mb-4 py-2 ">
                                  <input
                                    name={e.name}
                                    type="checkbox"
                                    className="w-4 h-4 bg-opacity-0 border-none mt-[6px]"
                                    onClick={() => multipleOption(e)}
                                  ></input>
                                  <div className="flex flex-row">
                                    <span className="text-lg font-large pr-4">
                                      {e.name}
                                    </span>
                                    <span className="text-lg  font-large">
                                      + {e.price} TL
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col ">
                              {optionElement.elements.map((e, index) => (
                                <div
                                  className="flex flex-row w-[70%] rounded-md shadow-sm bg-opacity-10 pl-4 bg-[#db3748] mb-4 py-2 "
                                  key={index}
                                >
                                  <input
                                    type="radio"
                                    className="w-4 h-4 bg-opacity-0 border-none mt-[6px]"
                                    name="optionRadio"
                                    onClick={() => singleOption(e)}
                                  ></input>

                                  <div className="flex flex-row pl-2">
                                    <span className="text-lg font-large pr-4">
                                      {e.name}
                                    </span>
                                    <span className="text-lg  font-large">
                                      + {e.price} TL
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <button>Order Food</button>
                    </div>
                  )}
                </div>
                <h3 className="border-t-[2px] text-lg font-large w-[30%] pt-2 mt-2">
                  <span className="font-semibold pr-2">Total Price:</span>{" "}
                  {foodObject.price} TL
                </h3>
                <button onClick={() => orderMeal()}>Order</button>
              </div>

              <div className="w-[100%] lg:w-[50%]  h-auto ">
                <img
                  className="rounded-md shadow-md"
                  src={choosedFood.image}
                ></img>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="px-12 sm:w-[90%] md:w-[95%] lg:w-[70%] m-auto pt-12">
        <div className="flex flex-row justify-between">
          <h3 className="text-3xl font-semibold">Döner Evi</h3>
          <p className="text-gray-400">20.10.2021</p>
        </div>
        <p className="pb-4">
          <span className="font-semibold text-gray-700">4.9</span>
          <span className="text-yellow-300 text-xl">★</span> (180)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {foodList.map((food) => (
            <div
              key={food}
              className="w-[100%] h-auto self-center col-span-1 flex flex-row py-4 px-4 pt-4 border-2 rounded-lg shadow-lg hover:bg-gray-100 duration-200 cursor-pointer"
            >
              <div className="w-[40%] rounded-md pt-2">
                <img
                  className="object-cover rounded-md shadow-lg"
                  src="https://i.lezzet.com.tr/images-xxlarge-recipe/tavuk-doner-d35e16f6-d541-4a18-a766-1ab3e5368e86.jpg"
                ></img>
              </div>
              <div className="w-full flex flex-col px-4">
                <h4 className="text-lg font-semibold">{food.name}</h4>
                <p>{food.price} TL</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  varius gravida odio,{" "}
                </p>
                <div className="static z-100 mt-2">
                  {" "}
                  <button
                    onClick={() => chooseFood(food)}
                    className="bg-[#db3748] bg-opacity-35 px-[6px] pb-[2px]  rounded-sm shadow-sm text-sm aboslute z-100"
                  >
                    Add
                  </button>
                  {order.find((e) => e.id == food) ? (
                    <button
                      onClick={() => removeFood(food)}
                      className="bg-[#db3748] bg-opacity-35 px-[7.3px] pb-[2px]  rounded-sm shadow-sm text-sm aboslute z-100"
                    >
                      -
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => dispatch(resetAll())}>Reset</button>
    </div>
  );
}