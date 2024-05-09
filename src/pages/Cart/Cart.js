import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../../store/slices/cartSlice';
export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    useEffect(()=>{
        console.log(cart)
    },[cart])
  return (
    <div className='fixed bottom-0 right-0 border-2 rounded-md shadow-sm h-full w-96 bg-slate-100 overflow-y-scroll absolute z-[200] flex flex-col px-8 pt-5'>
        {cart.cartFoodList.length > 0  ? 
        <div>
             {cart.cartFoodList.map((food,_index)=>(
                <div key={_index} className='h-auto border-t-2 pt-2 pb-4'>
                     <div className='w-full  flex flex-row gap-2'>
                 <h4>{food.count ?? 1}x</h4>
                
                <h3 className='text-lg font-semibold pb-3'>{food.foodName}</h3>
                
            </div>
            <div>{food.foodInfo.map((info,index)=>(
                    <div key={index} className='flex flex-row flex-wrap gap-1 w-full'>
                        <p>{index} - </p>
                        <div>{info.price} TL</div>
                        <div className=''>{info.singleOption}</div>

                        <div className='flex flex-row flex-wrap gap-2'>{info.options.map((opt,index)=>(
                            <p key={index}>{opt}</p>
                        ))}</div>
                    <button onClick={()=> dispatch(removeFromCart({food,index}))} className='bg-red-200 bg-opacity-30 hover:bg-opacity-90 duration-200 px-2 mt-1 mb-2 w-8'>-</button>

                    </div>
                ))}</div>
                </div>

        ))}
        

        <div className='absolute bottom-0 mb-2 font-semibold'>Total: {cart.totalPrice} TL</div>
        </div>  
        :<h4>Cart is Empty</h4>
    
    }
    </div>
  )
}

