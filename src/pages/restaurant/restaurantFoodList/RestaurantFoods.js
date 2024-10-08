import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import Cart from "../../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { addFoodToCard, resetAll } from "../../../store/slices/cartSlice";
import Navbar from "../../../components/Navbar";
import { getSpecificRestaurant } from "../../../utils/restaurant/getSpecificRestaurant";
import Loader from "../../../components/Loader";
import ReactStars from "react-rating-stars-component";

export default function RestaurantFoods() {
  let { restaurandId, foodName } = useParams();
  const navigate = useNavigate();
  const [choosedFood, setchoosedFood] = useState();
  const [foodList, setFoodList] = useState([]);
  const [comments, setComments] = useState([]);
  console.log(comments);
  const [restaurant, setRestaurant] = useState();
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    if (comments.length > 0) {
      const totalRating = comments.reduce(
        (total, comment) => total + comment.rating,
        0
      );
      const averageRating = (totalRating / comments.length).toFixed(1);
      setAverageRating(averageRating);
      console.log("Total Rating:", totalRating);
      console.log("Average Rating:", averageRating);
    } else {
      console.log("Comments array is null or empty");
    }
  }, [comments]);

  const [foodObject, setFoodObject] = useState({
    foodName: "",
    foodDescp: "",
    price: 0,
    options: [],
    singleOption: null,
    count: 1,
  });
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleRestaurant = async () => {
    try {
      const response = await getSpecificRestaurant(restaurandId);

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        setFoodList(result.restaurant.meals);
        setRestaurant(result.restaurant);
        setComments(result.restaurant.comments);
      } else if (response.status === 404) {
        ShowAlert(3, "An error occurred while fetching restaurant");
      } else {
        ShowAlert(3, "An error occurred while fetching restaurant");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while fetching restaurant");
    }
  };

  useEffect(() => {
    handleRestaurant();
  }, []);

  function chooseFood(food) {
    setchoosedFood((prew) => (prew = food));
    /* 
    if(user.isLogin){
      setchoosedFood((prew) => (prew = food))
    }else{
      console.log("a")
      ShowAlert(5 , "You need to login !")
      setTimeout(()=>{
        navigate("/login")
      },1500)
    }
*/
  }
  useEffect(() => {
    if (foodName) {
      let food = foodList.find((e) => e.name == foodName);
      console.log(food);
      setchoosedFood(food);
    }
  }, [foodName]);

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
        price: parseInt(prevState.price) - parseInt(option.price),
        options: updatedOptions,
      }));
    } else {
      console.log(option.price);
      const updatedOptions = [...foodObject.options, option.name];
      setFoodObject((prevState) => ({
        ...prevState,
        price: parseInt(prevState.price) + parseInt(option.price),
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
        price:
          parseInt(prevState.price) -
          (prewSinglePrice + parseInt(option.price)),
        singleOption: option.name,
      }));
    } else {
      setFoodObject((prevState) => ({
        ...prevState,
        price: parseInt(prevState.price) + parseInt(option.price),
        singleOption: option.name,
      }));
    }
  }

  function orderMeal() {
    console.log(foodObject);

    if (localStorage.getItem("adress")) {
      if (localStorage.getItem("restaurantId")) {
        if (restaurandId != localStorage.getItem("restaurantId")) {
          ShowAlert(
            3,
            "You should delete the items from the other restaurant!"
          );
        } else {
          localStorage.setItem("restaurantId", restaurandId);
          dispatch(addFoodToCard(foodObject));
        }
      } else {
        localStorage.setItem("restaurantId", restaurandId);
        dispatch(addFoodToCard(foodObject));
      }
    } else {
      ShowAlert(3, "First you need to choose address from profile");
    }
  }
  function resetMultiple() {
    const radios = document.querySelectorAll(
      'input[name="multipleOptionRadio"]'
    );

    // Loop through each radio element and set checked to false
    radios.forEach((radio) => {
      radio.checked = false;
    });
    let checked = choosedFood.options.find(
      (e) =>
        e.elements[0]?.name == foodObject.singleOption && e.quantity == "single"
    );
    let price = checked?.elements[0]?.price;
    if (price) {
      console.log(price);
      setFoodObject({
        ...foodObject,
        price: parseFloat(foodObject.price) - parseFloat(price),
        singleOption: null,
      });
    }
  }
  function reset() {
    setchoosedFood(null);
    setFoodObject({ foodName: "", price: 0, options: [], singleOption: null });
  }

  useEffect(() => {
    setFoodObject((prev) => ({
      ...prev,
      foodName: choosedFood ? choosedFood.name : "",
      foodImage: choosedFood ? choosedFood.image : "",
      foodDescp: choosedFood ? choosedFood.description : "",
      restaurandId: restaurandId,
      price: choosedFood ? choosedFood.price : 0,
    }));

    console.log(choosedFood);
  }, [choosedFood]);

  return (
    <>
      <div className="w-full pb-24 relative flex flex-row flex-col lg:flex-row justify-between">
        <Loader></Loader>

        <Cart></Cart>

        {choosedFood ? (
          <div className="w-full h-auto sticky top-0  bg-[#FFFFFF] flex justify-center pb-48 mt-[-10px]">
            ,
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
                            {optionElement.quantity == "multiple" ? (
                              <div className="flex flex-col">
                                {optionElement.elements.map((e) => (
                                  <div className="flex flex-row gap-2 w-[100%] sm:w-[70%] rounded-md shadow-sm bg-opacity-10 pl-4 bg-[#db3748] mb-4 py-2 ">
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
                                    className="flex flex-row w-[100%] sm:w-[70%] rounded-md shadow-sm bg-opacity-10 pl-4 bg-[#db3748] mb-4 py-2 "
                                    key={index}
                                  >
                                    <input
                                      type="radio"
                                      className="w-4 h-4 bg-opacity-0 border-none mt-[6px]"
                                      name="multipleOptionRadio"
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
                                <button
                                  onClick={() => resetMultiple()}
                                  className="w-16 mb-2 mt-[-3px] pb-1 border-b-2 tex-sm border-gray-200 hover:border-gray-600 duration-200 text-left pl-2"
                                >
                                  Clear
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex flex-row pt-4">
                    <h3 className=" text-lg font-large w-[50%] sm:w-[30%] pt-2 mt-2">
                      <span className="font-semibold pr-2">Total Price:</span>{" "}
                      {foodObject?.price} $
                    </h3>
                    <button
                      onClick={() => orderMeal()}
                      className="bg-red-300  w-[50%] sm:w-60 py-1 mt-[5px] rounded-md bg-opacity-30 hover:bg-opacity-80 duration-200 ease rounded-md shadow-md"
                    >
                      Order
                    </button>
                  </div>
                </div>

                <div className="w-[100%] lg:w-[50%]  h-auto ">
                  <img
                    className="rounded-md shadow-md"
                    src={choosedFood?.image}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div
          className={
            "px-12 sm:w-[90%] md:w-[95%] lg:w-[67%] pt-6 " +
            (choosedFood ? " hidden " : " block ")
          }
        >
          <div className="flex flex-row justify-between">
            <h3 className="text-3xl font-semibold">
              {restaurant?.restaurantName}
            </h3>
          </div>
          <p className="pb-4">
            <div className="flex flex-row justify-between w-[200px]">
              <div>
                <span className="font-semibold text-gray-700">
                  {averageRating}
                </span>
                <span className="text-yellow-300 text-xl">★</span>{" "}
                {comments.length}
              </div>
              <p className="text-gray-400">
                {restaurant?.createdAt.slice(0, 10)}
              </p>
            </div>
          </p>
          <div className="h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
              {foodList ? (
                <>
                  {foodList.map((food) => (
                    <div
                      onClick={() => setchoosedFood(food)}
                      key={food}
                      className="w-[100%] h-auto self-center col-span-1 flex flex-row py-4 px-4 pt-4 border-2 rounded-lg shadow-lg hover:bg-gray-100 duration-200 cursor-pointer"
                    >
                      <div className="h-[120px]  w-[200px] rounded-md pt-2 overflow-hidden">
                        <img
                          className=" rounded-md shadow-lg w-auto object-cover"
                          src={food?.image}
                        ></img>
                      </div>
                      <div className="w-full flex flex-col lg:pl-4 pl-2">
                        <h4 className="text-lg font-semibold">{food?.name}</h4>
                        <p>{food?.price} $</p>
                        <p className="text-sm">{food?.description}</p>
                        <div className="static z-100 mt-1">
                          {" "}
                          <div className=" w-[35%] text-sm text-gray-400">
                            Add to Cart
                          </div>
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
                </>
              ) : (
                <>Loading</>
              )}
            </div>
          </div>
        </div>

        <div
          className={
            " flex flex-col pt-6 mt-12  px-6 pb-12 w-[80%] lg:w-[30%] m-auto rounded-lg shadow-md max-h-[540px]   overflow-y-scroll" +
            (choosedFood ? " hidden " : " block ")
          }
        >
          <div className="flex flex-row justify-between pb-4">
            <h3 className="text-2xl font-semibold ">
              Comments ({comments.length})
            </h3>
            <p className="font-semibold">
              {averageRating} <span className="text-yellow-300 text-xl">★</span>
            </p>
          </div>
          {comments?.length > 0 ? (
            <>
              {comments.map((comment) => (
                <div
                  style={{
                    boxShadow: "0px 11px 10px -5px rgba(203,203,203,0.25)",
                  }}
                  className="flex flex-col pt-6 px-6 rounded-sm  border-gray-600 pb-4 border-b-[2px] border-slate-100 border-opacity-20 "
                >
                  <div className="flex flex-row justify-between pb-2">
                    <h3 className="text-lg font-semibold">
                      {comment?.username}
                    </h3>
                    <ReactStars
                      edit={false}
                      count={5}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                      value={comment?.rating}
                    />
                  </div>
                  <p className="">{comment?.comment}</p>
                </div>
              ))}
            </>
          ) : (
            <h3>No comment yet.</h3>
          )}
        </div>
      </div>
    </>
  );
}
