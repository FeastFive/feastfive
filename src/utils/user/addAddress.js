const addAdress = async (obj) => {
  try {
    const url = "http://127.0.0.1:4000/api/users/addAdress";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};
export { addAdress };
