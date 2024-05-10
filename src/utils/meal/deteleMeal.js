const deleteMeal = async (meal) => {
  const url = "http://127.0.0.1:4000/api/meals/deleteMeal";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
  return response;
};
export { deleteMeal };
