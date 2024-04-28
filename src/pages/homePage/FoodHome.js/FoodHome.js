import React, { useState } from "react";
import HomeGrid from "../HomeGrid";
import Navbar from "../../../components/Navbar";

export default function FoodHome() {
  const [list, setFoodList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [radioList, setTRadioList] = useState([
    "Önerilen",
    "Çok tercih edilenler",
    " En çok beğenilenler",
  ]);

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
    <>
      <Navbar></Navbar>
      <div className=" grid grid-cols-5 md:px-12 lg-px-24 gap-6 pt-12 ">
        <div className="col-span-1 w-full h-screen sticky top-0 overflow-scrool  px-3 pl-5 pt-6 bg-[#F9FCFB] border-2 rounded-md shadow-md border-slate-100 hidden md:hidden lg:block">
          <div className="flex flex-row justify-between">
            <h3 className="font-semibold text-xl">Filter</h3>
            <p className="text-base text-[#db3748] cursor-pointer hover:text-orange-400 duration-200">
              Clear All
            </p>
          </div>

          {/*Sıramala*/}
          <h3 className="pt-4 text-sm">Sıralama</h3>
          <ul className="pt-1">
            {radioList.map((radio) => (
              <li key={radio} className="flex flex-row gap-4 pt-1">
                <input
                  type="radio"
                  className="w-4 bg-none "
                  name="rateRadio"
                ></input>
                <span className="text-sm font-medium ">{radio}</span>
              </li>
            ))}
          </ul>

          {/*Mutfaklar*/}
          <ul className="pt-4">
            <h3 className="pb-1 text-sm">Mutfak</h3>
            <div className="mb-1 mt-1">
              <input
                placeholder="Search Kitchens"
                className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[90%] text-sm py-1 pb-2"
              ></input>
             
            </div>

            {categories.map((category) => (
              <li key={category} className="flex flex-row gap-4 pt-2">
                <input type="checkbox" className="w-4 bg-none"></input>

                <span className="font-medium text-sm">{category}</span>
              </li>
            ))}
          </ul>

          {/*Fiyat*/}
          <div>
            <h3 className="mt-2 text-sm">Fiyat</h3>
            <input
              placeholder="min $"
              className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[60%] text-sm py-1 pb-2 mt-2"
            ></input>
            <input
              placeholder="max $"
              className="border-2 border-slate-200 shadow-md focus:outline-none rounded-lg pl-2 w-[60%] text-sm py-1 pb-2 mt-2"
            ></input>
          </div>

          <button className="w-full h-8 bg-[#db3748] hover:bg-orange-500 duration-200 text-slate-100 mt-3  rounded-xl shadow-lg">
            Filter
          </button>
        </div>

        <div className=" col-span-5 md:col-span-5 lg:col-span-4 w-full h-auto px-4 pt-6   ">
          <h3 className="text-2xl">18 Sonuç Bulundu</h3>
          <HomeGrid list={list}></HomeGrid>
        </div>
      </div>
    </>
  );
}
