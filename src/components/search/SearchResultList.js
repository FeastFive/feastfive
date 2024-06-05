import React from "react";
import { SearchResult } from "./SearchResult";

function SearchResultList({ results }) {
  return (
    <div className="flex bg-[#F9FCFB] text-left absolute w-full z-[500] cursor-pointer flex-col border-2 border-t-0 rounded-b-lg  text-lg gap-1 h-auto shadow-md shadow-gray-100 w-full">
      {results.map((result, id) => {
        if (result == null) {
          return (
            <div key={`empty-${id}`} className="my-2">
              <p>Empty Section</p>
            </div>
          );
        }
        if (id === 0 && results.length > 1) {
          return (
            <React.Fragment key={`fragment-${id}`}>
                            <h3 className="font-semibold px-4 py-2">Filter by search</h3>
                            <hr key={`hr-${id}`} className="border-gray-200" />

              {/* <p key={`title-${id}`}>by Name</p> */}
              <SearchResult
                result={result.restaurantName}
                resultId={result._id}
                key={id}
              />
              <h3 className="font-semibold pt-2 px-4">Filter by Cusines</h3>
              <hr key={`hr-${id}`} className="border-gray-200" />

              {/* <p key={`label-${id}`}>by Label</p> */}
            </React.Fragment>
          );
        } else {
          return (
            <SearchResult
              result={result.restaurantName}
              resultId={result._id}
              key={id}
            />
          );
        }
      })}
    </div>
  );
}

export default SearchResultList;
