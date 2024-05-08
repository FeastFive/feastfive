import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slices/cartSlice";
export default function Cart() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
    const panel = useRef();

    
  useEffect(() => {
    if(!isOpen){
        setTimeout(()=>{
            panel.current.classList.add("hidden")

        },500)
    }else{

        setTimeout(()=>{
            panel.current.classList.remove("hidden")

        },500)


    }
  }, [isOpen]);
  return (
    <div className="">

    <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-0 right-0 z-20 mr-7 mb-7 hover:scale-105 duration-200 cursor pointer w-10 h-10 `}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

    </button>
<div ref={panel} className={`absolute bottom-0 right-0 border-2 rounded-l-xl rounded-b-[0px]  shadow-md   bg-[#FFFFFF]  absolute z-[200] flex flex-col px-12 pt-5 pb-16 overflow-hidden duration-200 ease-in ` + (isOpen ?  "opacity-100" : "opacity-0")}>
            <button onClick={() => setIsOpen(!isOpen)}  className={`fixed mt-[-10px] right-0 mr-4 mb-7 hover:scale-120 duration-200 cursor pointer ` }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                </button>  
        <>
        
        {cart.cartFoodList.length > 0 ? (
            <div>
              {cart.cartFoodList.map((food, _index) => (
                <div key={_index} className="h-auto border-b-2 pt-2 pb-4">
                  <div className="w-full  flex flex-row gap-2">
                    <h4>{food.count ?? 1}x</h4>

                    <h3 className="text-lg font-semibold pb-1">
                      {food.foodName}
                    </h3>
                  </div>
                  <div>
                    {food.foodInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex flex-row flex-wrap gap-1 w-full"
                      >
                        <p>{info.count} x</p>
                        <div>{info.price} TL</div>
                        <div className="">{info.singleOption}</div>

                        <div className="flex flex-row flex-wrap gap-2">
                          {info.options.map((opt, index) => (
                            <p key={index}>{opt}</p>
                          ))}
                        </div>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart({ food, info,index }))
                          }
                          className="bg-red-200 bg-opacity-30 hover:bg-opacity-90 duration-200 px-2 mt-1 mb-2 w-8"
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-0 mb-2 font-semibold flex flex-row w-full pr-12 pb-1">
                    <p className="w-full pt-1">
                    Total: {cart.totalPrice} TL
                    </p>

                <button className="bg-red-300 bg-opacity-40 rounded-md shadow-sm hover:bg-opacity-100 duration-200 py-1 w-[80%] mr-20">Buy</button>
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
