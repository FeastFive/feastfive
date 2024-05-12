import React from "react";
import { SearchResult } from "./SearchResult";

function SearchResultList({ results }) {
  return (
    <div
     className="flex bg-[#F9FCFB] text-left cursor-pointer flex-col border-2 border-t-0 rounded-b-lg px-4 text-lg gap-2 h-auto py-2 shadow-md shadow-gray-100 w-full"
    >
      {results.map((result, id) => {
        return <SearchResult result={result.restaurantName} key={id} />;
      })}
    </div>
  );
}

export default SearchResultList;
