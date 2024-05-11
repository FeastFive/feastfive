import React, { useState } from "react";
import { searchRestaurant } from "../../utils/restaurant/searchRestaurant";
import { ShowAlert } from "../alert/ShowAlert";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");
  const [close, setClose] = useState(false);

  const debouncedSearch = debounce(handleSearch, 500);

  async function handleSearch(value) {
    try {
      if (!input) {
        const response = await searchRestaurant(value);
        console.log(response);
        if (response.status === 200) {
          const result = await response.json();
          setResults(result);
          console.log(result);
        } else if (response.status === 404) {
          ShowAlert(3, "An error occurred while fetching labels");
        } else {
          ShowAlert(3, "An error occurred while fetching labels");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while saving labels");
    }
  }

  const handleChange = (value) => {
    setInput(value);
    if (!value) {
      setResults([]);
    } else {
      debouncedSearch(value);
    }
  };

  return (
    <>
      <input
        placeholder="Type here..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-4 h-12 w-[300px]  md:w-[340px] lg:w-[440px] rounded-l-md focus:outline-none shadow-sm border-2 border-slate-100"
      ></input>
    </>
  );
}

export default SearchBar;
