import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate()
    console.log(cart)
  return (
    <div className="overflow-x-hidden pt-12">
         <div className="w-[60%] m-auto px-12">
         <h3 className="font-semibold text-2xl pb-4"> Cart </h3>

          {cart.cartFoodList.length > 0 ? (
            <div ke={"cart"} className="pr-10">
              {cart.cartFoodList.map((food, _index) => (
                <div key={_index} className="h-auto  pt-2 pb-4 ">
                  <div className="flex flex-row ">
                    <h4 className=" border-b-[2px]  border-gray-400 ">{food.count ?? 1}x</h4>

                    <a href={`/restaurantFoods/${localStorage.getItem("restaurantId")}/${food.foodName}`} key={"food"} className="text-lg font-semibold pb-1  border-b-[2px] border-gray-400 w-auto pl-2 pr-5 cursor-pointer hover:text-gray-500 duration-200">
                      {food.foodName}
                    </a>
                  </div>
                  <div>
                    {food.foodInfo.map((info, index) => (
                      <div   className="flex flex-row border-b-[2px] border-gray-200 pb-2 pt-3 last:border-gray-400">
                          <div
                      
                        className="flex flex-col flex-wrap gap-1 w-full"
                      >
                        <div className="flex flex-row">
                          <p>{info.count} Adet </p>
                          <div className="pl-2 font-semibold">
                            {" "}
                            {info.price} TL
                          </div>
                        </div>
                        <div className="flex flex-row gap-2 flex-wrap">
                            
                          <p className="font-semibold ">Seçenekler: </p>
                          <div className="">{info.singleOption}</div>

                          <div className="flex flex-row flex-wrap gap-2">
                            {info.options.map((opt, index) => (
                              <p key={index} className="text-sm">, {opt}</p>
                            ))}
                          </div>
                         
                        </div>
                      </div>
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

              <div className="flex flex-row justify-left gap-4">
                <p className="w-auto pt-1">Total: {cart.totalPrice} TL</p>

                <button onClick={()=> navigate("/cart")} className="bg-red-300 bg-opacity-40 rounded-md shadow-sm w-[20%] py-1 font-semibold text-gray-600">
                  Apply Order
                </button>
              </div>
            </div>
          ) : (
            <h4 className="font-semibold text-LG text-center">Cart is Empty</h4>
          )}
        </div>
    </div>
  )
}
