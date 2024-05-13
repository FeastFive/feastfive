import { useNavigate } from "react-router-dom";

export const SearchResult = ({ result, resultId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="search-result"
      // onClick={(e) => alert(`You selected ${result}!`)}
      onClick={() => navigate(`/restaurantFoods/${resultId}`)}
    >
      {result}
    </div>
  );
};
