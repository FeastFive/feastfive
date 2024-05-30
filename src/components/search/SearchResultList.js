import React from "react";
import { SearchResult } from "./SearchResult";

function SearchResultList({ results }) {
  return (
    <div className="flex bg-[#F9FCFB] text-left cursor-pointer flex-col border-2 border-t-0 rounded-b-lg px-4 text-lg gap-2 h-auto py-2 shadow-md shadow-gray-100 w-full">
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
              {/* <p key={`title-${id}`}>by Name</p> */}
              <SearchResult
                result={result.restaurantName}
                resultId={result._id}
                key={id}
              />
              <hr key={`hr-${id}`} className="my-2 border-gray-200" />
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
