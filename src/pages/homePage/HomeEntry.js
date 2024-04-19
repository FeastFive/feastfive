import React from 'react'
import tabak from "../../images/tabak.png";
export default function HomeEntry() {
  return (
    <div className="w-screen px-12 sm:px-24 h-full sm:h-[600px] md:h-[400px] lg:h-[380px] flex flex-col  flex-col-reverse	 sm:flex-col md:flex-row lg:flex-row md:justify-between  pt-12 bg-[#F9FCFB] mt-[-20px] border-2 border-slate-100 shadow-sm">
    <div className="flex flex-col text-center md:text-left justify-center">
      <h2 className="text-5xl font-semibold text-[#db3748]">Hungry ? </h2>
      <h2 className="text-4xl pt-3  text-[#db3748]">Lets Order food</h2>
      <div className="inputGroup flex flex-row  mt-3 flex sm:justify-center md:justiy-left py-4 sm:py-8 md:py-2">
        <input
          placeholder="Type some food"
          className="pl-4 h-12 w-[300px]  md:w-[240px] lg:w-[300px] rounded-l-md focus:outline-none shadow-sm border-2 border-slate-100"
        ></input>
        <div className="bg-[#db3748]  text-[#F9FCFB] cursor-pointer h-12 w-32 text-center pt-[10px] font-medium rounded-r-md shadow-sm">
          Search Food
        </div>
      </div>
    </div>

    <div className="rounded-full flex justify-center mt-2 pb-8 pt-4">
      <img
        className="object-cover w-64 h-64 pt-2  rounded-full"
        src={tabak}
      ></img>

 
    </div>
  </div>
  )
}
