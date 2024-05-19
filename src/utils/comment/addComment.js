const addComment = async (obj) => {
  const url = "http://127.0.0.1:4000/api/meals/addComment";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return response;
};
export { addComment };
