import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFoodToCard, removeFromCart, resetAll } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const panel = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        if (panel.current) {
          panel.current.classList.add("hidden");
        }
      }, 500);
    } else {
      setTimeout(() => {
        if (panel.current.classList.contains("hidden")) {
          panel.current.classList.remove("hidden");
        }
      }, 500);
    }
  }, [isOpen]);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-0 right-0 z-20 mr-7 mb-7 hover:scale-105 duration-200 cursor pointer w-10 h-10 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokewidth="1.5"
          stroke="currentColor"
          className="w-full h-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </button>
      <div
        ref={panel}
        className={
          `cart  md:w[40%] lg:w-[28%]` +
          (isOpen ? " opacity-100 " : " opacity-0 ")
        }
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed mt-[-10px] right-0 mr-4 mb-7 hover:scale-120 duration-200 cursor pointer `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <>
          {cart.cartFoodList.length > 0 ? (
            <div key={"cart"} className="overflow-y-scroll pr-10">
              {cart.cartFoodList.map((food, _index) => (
                <div key={_index} className="h-auto  pt-2 pb-4 ">
                  <div className="flex flex-row ">
                    <h4 className=" border-b-[2px]  border-gray-400 ">
                      {food.count ?? 1}x
                    </h4>

                    <h3
                      key={"food"}
                      className="text-lg font-semibold pb-1  border-b-[2px] border-gray-400 w-auto pl-2 pr-5 "
                    >
                      {food.foodName}
                    </h3>
                  </div>
                  <div>
                    {food.foodInfo.map((info, index) => (
                      <div className="flex flex-row border-b-[2px] border-gray-200 pb-2 pt-3 last:border-gray-400">
                        <div className="flex flex-col flex-wrap gap-1 w-full">
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
                                <p key={index} className="text-sm">
                                  , {opt}
                                </p>
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
                        
                        <a
                          onClick={() =>
                            dispatch(addFoodToCard({ foodDescp:food?.foodDescp, foodImage:food?.foodImage, foodName:food?.foodName, options:info?.options,price:info?.price,singleOption:info?.singleOption }))
                          }
                          className="bg-red-200 bg-opacity-30 hover:bg-opacity-90 duration-200 px-2 rounded-md shadow-sm cursor-pointer ml-2 h-6"
                        >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-0 mb-2 font-semibold flex flex-row w-full pb-2 justify-between bg-[#FFFFFF] pt-3">
                <button className="border-b-2 w-auto px-3 mr-2" onClick={()=> dispatch(resetAll())}>Clear</button>
                <p className="w-full pt-1">Total: {cart.totalPrice} TL</p>

                <button
                  onClick={() => navigate("/cart")}
                  className="bg-red-300 bg-opacity-40 rounded-md shadow-sm hover:bg-opacity-100 duration-200 py-1 w-[80%] mr-20"
                >
                  Buy
                </button>
              </div>
            </div>
           ) : (
            <h4 className="font-semibold text-LG text-center">Cart is Empty</h4>
          )}
        </>
      </div>
    </div>
  );
}
