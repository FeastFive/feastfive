import React, { useState } from "react";
import { searchRestaurant } from "../utils/restaurant/searchRestaurant";
import { ShowAlert } from "./alert/ShowAlert";

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");

  const handleSearch = async (value) => {
    try {
      const response = await searchRestaurant(value);
      console.log(response);
      if (response.status === 200) {
        const result = await response.json();
        ShowAlert(1, "Saved succesfully");
        setResults(result);
      } else if (response.status === 404) {
        ShowAlert(3, "An error occurred while fetching labels");
      } else {
        ShowAlert(3, "An error occurred while fetching labels");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while saving labels");
    }
  };

  const handleChange = (value) => {
    setInput(value);
    handleSearch(value);
  };

  return (
    <>
      <input
        placeholder="Type here..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-4 h-12 w-[300px]  md:w-[240px] lg:w-[300px] rounded-l-md focus:outline-none shadow-sm border-2 border-slate-100"
      ></input>
    </>
  );
}

export default SearchBar;
