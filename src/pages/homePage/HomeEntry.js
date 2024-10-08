import React, { useState } from "react";
import tabak from "../../images/tabak.png";
import SearchBar from "../../components/search/SearchBar";
import SearchResultList from "../../components/search/SearchResultList";

export default function HomeEntry() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(false);

  return (
    <div className="w-screen px-12 pb-12 sm:px-24 h-full sm:h-[600px] md:h-[400px] lg:h-[380px] flex flex-col  flex-col-reverse	 sm:flex-col md:flex-row lg:flex-row md:justify-between  pt-12 bg-[#F9FCFB] mt-[-20px] border-2 border-slate-100 shadow-sm">
      <div className="flex flex-col text-center md:text-left justify-center">
        <h2 className="text-5xl font-semibold text-[#db3748] b">Hungry ? </h2>
        <a
          href="/food"
          className="text-2xl m-auto sm:text-4xl sm:m-0 pl-8 sm:pl-0 pt-3  text-[#db3748] w-fit pr-6 flex flex-row border-b-2 border-[#db3748] border-opacity-40 cursor-pointer	  pb-2 hover:text-orange-500 duration-200"
        >
          Let's Order Food{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 pt-1 pl-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
        <div className="flex flex-col">
          <div className="inputGroup flex flex-row w-full  mt-S3 flex sm:justify-center md:justiy-left pt-4 sm:pt-8 md:pt-2">
            <SearchBar
              setResults={setResults}
              setSearch={setSearch}
            ></SearchBar>

            <div className="bg-[#db3748]  text-[#F9FCFB] cursor-pointer h-12 w-32 text-center pt-[10px] font-medium rounded-r-md shadow-sm text-sm sm:text-base">
              Search Food
            </div>
          </div>

          <div className="relative">
            {results && results.length > 0 ? (
              <SearchResultList results={results} />
            ) : (
              search && (
                <div className="flex bg-[#F9FCFB] text-left cursor-pointer flex-col border-2 border-t-0 rounded-b-lg px-4 text-lg gap-2 h-auto py-2 shadow-md shadow-gray-100 w-full">
                  Search results not found
                </div>
              )
            )}
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
  );
}
