const registerRes = async (user) => {
  const url = "http://127.0.0.1:4000/api/restaurants/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
};
export { registerRes };
