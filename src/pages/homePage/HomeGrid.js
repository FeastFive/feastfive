import React, { useState } from 'react'
import salata from "../../images/salata.png";

export default function HomeGrid() {
    const[list,setist] = useState([1,2,3,4])
  return (
    <div className=' pt-12 '>
<h1 className='text-3xl font-semibold text-[#db3748]'>Popular Restaurants</h1>

    <div className=' pt-6 flex flex-row flex-wrap place-items-center pt-3 justify-left gap-8 justify-center'>

{list.map((element) =>(
      <div key={element} className='w-[460px] md:w-[260px] h-[270px] md:h-[200px] mt-4 rounded-md shadow-md flex flex-col cursor-pointer duration-200  hover:scale-[103%]'>
            <div className='w-full h-[69%] md:h-[60%] bg-red-400  overflow-hidden rounded-md'>
                <img src={"https://img.freepik.com/premium-photo/photo-top-view-table-full-delicious-food-composition_1089395-1125.jpg?w=1380"} className='object-cover  mt-[-10px] bg-red-400  overflow-hidden rounded-md' ></img>
            </div>
            <div className='flex flex-col px-2 pt-1 '>
                <div className='flex flex-row  w-full h-full justify-between'>
                        <h3 className='text-md font-semibold'>The Hunger</h3>
                        <div className='flex flex-row'>
                        <span className='text-yellow-400 text-lg mt[-2px]'>★</span>
                        <p className='font-large pl-2'>(2000+)</p>
                        </div>
                    </div>    
                <div className='flex flex-row  w-full h-full text-xs font-medium  text-gray-400 pb-1'>150 TL minimum</div>    

                <div className='flex flex-row w-full h-full text-sm font-medium '>30 min <span className='text-pink-600 pl-2'>Ücretsiz</span></div>    

            </div>
      </div>
))}


</div>
</div>

 
  )
}
