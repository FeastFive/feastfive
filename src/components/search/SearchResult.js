import { useNavigate } from "react-router-dom";

export const SearchResult = ({ result, resultId }) => {
  const navigate = useNavigate();
  return (
   <>{result &&
   
    <div
      className="search-result hover:bg-gray-100 bg-opacity-30 cursor-pointer duration-200 ease px-4 py-1"
      // onClick={(e) => alert(`You selected ${result}!`)}
      onClick={() => navigate(`/restaurantFoods/${resultId}`)}
    >
      {result}
    </div>}</>
  );
};
