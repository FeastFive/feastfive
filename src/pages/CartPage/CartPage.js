import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFoodToCard, removeFromCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { loadStripe } from "@stripe/stripe-js";

export default function CartPage() {
  const [choosedAdress, setChoosedAdress] = useState(
    localStorage.getItem("adress")
      ? JSON.parse(localStorage.getItem("adress"))
      : {}
  );
  console.log(choosedAdress);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);
  const navigate = useNavigate();

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PExeqGnJMvlUc9LgwPfKGpos0O7NgiMLgaQpie7EeUiX8jAA6DrUAIj6N8tZwhXdr5NNVuiKcREwLlwlJfER0kB0043kuRa8x"
    );

    const body = {
      products: cart.cartFoodList,
      restaurantId: cart.restaurantId,
      userId: user.id,
      adress: choosedAdress,

      // price: cart.totalPrice,
    };
    const headers = {
      "Content-type": "application/json",
    };
    const response = await fetch(
      `http://127.0.0.1:4000/api/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <div className="overflow-x-hidden pb-32">
      <div className="w-[90%] sm:w-[90%] md:w-[80%] lg:w-[65%] m-auto px-12 sm:px-12 md:px-6 lg:px-12 pt-12">
        <h3 className="font-semibold text-2xl pb-4"> Cart </h3>

        {cart.cartFoodList.length > 0 ? (
          <div ke={"cart"} className="pr-0 sm:pr-10 text-center sm:text-left">
            {cart.cartFoodList.map((food, _index) => (
              <div key={_index} className="h-auto  pt-2 pb-4 ">
                <div className="flex flex-col sm:flex-row ">
                  <img
                    className="w-full lg:w-40 h-auto rounded-md shadow-md"
                    src={food.foodImage}
                  ></img>

                  <div className="flex flex-col pl-4 sm:pt-0 pt-4 ">
                    <a
                      href={`/restaurantFoods/${localStorage.getItem(
                        "restaurantId"
                      )}/${food.foodName}`}
                      key={"food"}
                      className="text-2xl sm:text-xl  font-semibold pb-1 w-auto pr-5 cursor-pointer hover:text-gray-500 duration-200 pt-2"
                    >
                      {food.foodName}
                    </a>
                    <p>{food.foodDescp}</p>
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  {food.foodInfo.map((info, index) => (
                    <div className="flex flex-row border-b-[2px] border-gray-200 pb-2 pt-3 last:border-gray-400">
                      <div className="flex flex-col flex-wrap gap-1 w-full">
                        <div className="flex flex-row gap-2 flex-wrap">
                          <p className="font-semibold ">Seçenekler: </p>
                          <div className="">{info.singleOption}</div>

                          <div className="flex flex-row  flex-wrap gap-1">
                            {info.options.map((opt, index) => (
                              <p key={index} className="text-sm">
                                , {opt}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <p>{info.count} Adet </p>
                          <div className="pl-2 font-semibold">
                            {" "}
                            {info.price} TL
                          </div>
                        </div>
                      </div>
                      <a
                        onClick={() =>
                          dispatch(
                            addFoodToCard({
                              foodDescp: food?.foodDescp,
                              foodImage: food?.foodImage,
                              foodName: food?.foodName,
                              options: info?.options,
                              price: info?.price,
                              singleOption: info?.singleOption,
                            })
                          )
                        }
                        className="bg-red-200 bg-opacity-30 hover:bg-opacity-90 duration-200 px-3 rounded-md shadow-sm cursor-pointer ml-2 h-6 py-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </a>
                      <a
                        onClick={() =>
                          dispatch(removeFromCart({ food, info, index }))
                        }
                        className="bg-red-200 bg-opacity-30 hover:bg-opacity-90 duration-200 px-2 rounded-md shadow-sm cursor-pointer ml-2 h-6"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-row justify-left gap-4 w-full">
              <p className="w-auto pt-1 font-semibold text-lg">
                Total: {cart.totalPrice} TL
              </p>

              <button
                onClick={makePayment}
                className="bg-red-300 bg-opacity-40 rounded-md shadow-sm w-[50%] sm:w-[30%] lg:w-[20%] py-2 font-semibold text-gray-800"
              >
                Apply Order
              </button>
            </div>
          </div>
        ) : (
          <h4 className="font-semibold text-LG text-center">Cart is Empty</h4>
        )}
      </div>
    </div>
  );
}
