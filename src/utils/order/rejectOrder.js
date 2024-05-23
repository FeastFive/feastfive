const rejectOrder = async (obj) => {
  try {
    const url = "http://127.0.0.1:4000/api/meals/rejectOrder";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export { rejectOrder };
