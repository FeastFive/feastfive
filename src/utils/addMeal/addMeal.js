const addMeal = async (meal) => {
  const url = "http://127.0.0.1:4000/api/meals/addMeal";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
  return response;
};
export { addMeal };
