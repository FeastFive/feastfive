import React from "react";
import { SearchResult } from "./SearchResult";

function SearchResultList({ results }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 8px #ddd",
        borderRadius: "10px",
        marginTop: "1rem",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      {results.map((result, id) => {
        return <SearchResult result={result.restaurantName} key={id} />;
      })}
    </div>
  );
}

export default SearchResultList;
