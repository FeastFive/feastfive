import React, { useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';

export default function RestaurantFoods() {
    let { restaurandId } = useParams();
    const [foodList, setFoodList] = useState([1,2,3,4,5,5,6,7,8,9,10])

  return (
    <div className='w-full h-full  pt-12 pb-24'>
            <div className='px-12 sm:w-[90%] md:w-[95%] lg:w-[70%] m-auto'>
            <div className='flex flex-row justify-between'>
            <h3 className='text-3xl font-semibold'>Döner Evi</h3>  
            <p className='text-gray-400'>20.10.2021</p>   
            </div>     
            <p className='pb-4'><span className='font-semibold text-gray-700'>4.9</span><span className='text-yellow-300 text-xl'>★</span> (180)</p>   
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                    {foodList.map((food)=>(
                        <div key={food} className='w-[100%] h-36 self-center col-span-1 flex flex-row py-4 px-4 pt-4 border-2 rounded-lg shadow-lg hover:bg-gray-100 duration-200 cursor-pointer'>
                            <div className='w-[40%] rounded-md'>
                                <img className='object-cover rounded-md shadow-lg' src='https://i.lezzet.com.tr/images-xxlarge-recipe/tavuk-doner-d35e16f6-d541-4a18-a766-1ab3e5368e86.jpg'></img>
                            </div>
                            <div className='w-full flex flex-col px-4'>
                                <h4 className='text-lg font-semibold'>Jumbo Döner</h4>
                                <p>340 TL</p>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius gravida odio, </p>

                            </div>
                        </div>
                    ))}
                
                </div>
            </div>
        
    </div>
  )
}
