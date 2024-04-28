const loginRes = async (user) => {
  const url = "http://127.0.0.1:4000/api/restaurants/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
};
export { loginRes };
