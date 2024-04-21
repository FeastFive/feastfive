import React, { useState } from 'react'
import HomeGrid from '../HomeGrid'

export default function FoodHome() {
    const [list, setFoodList] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
    const [categories, setCategories] = useState([
        "Kırmızı Et",
        "Beyaz Et",
        "Makarna",
        "Pizza",
        "Kebap",
        "Salata",
        "Tatlı",
        "İçecek",
      ]);
  return (
    <div className=' grid grid-cols-5 px-24 gap-6 pt-12 '>
        <div className='col-span-1 w-full h-screen sticky top-0 overflow-scrool  px-3 pt-6 bg-[#F9FCFB] border-2 rounded-md shadow-md border-slate-100'>
            <div className='flex flex-row justify-between'>
                <h3 className='font-semibold text-xl'>Filter</h3>
                <p className='text-lg text-[#db3748]'>Clear All</p>
            </div>

        <h3 className='pt-4'>Sıralama</h3>
        <ul className='pt-1'>
                <li className='flex flex-row gap-4'>
                <input type='radio' className='w-4 bg-none '></input>
                <span>Önerilen</span>
            </li>
            <li className='flex flex-row gap-4 pt-1'>
                <input type='radio' className='w-4 bg-none '></input>
                <span>Çok Tercih edilenler</span>
            </li>
            <li className='flex flex-row gap-4 pt-1'>
                <input type='radio' className='w-4 bg-none '></input>
                <span>Önerilen</span>
            </li>
        </ul>
        <ul className='pt-4'>
            <h3 className='pb-1'>Mutfak</h3>
            {categories.map((category) =>(
                <li key={category} className='flex flex-row gap-4 pt-1'>
                <input type='checkbox' className='w-4 bg-none'></input>
                <span>{category}</span>
            </li>
            ))}
        </ul>
        </div>
        <div className='col-span-4 w-full h-auto px-4 pt-6   '>
            <h3 className='text-2xl'>18 Sonuç Bulundu</h3>
            <HomeGrid list={list}></HomeGrid>
        </div>
    </div>
  )
}
