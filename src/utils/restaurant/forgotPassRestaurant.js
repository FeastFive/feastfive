const forgotPassRestaurant = async (email) => {
  try {
    const url = "http://127.0.0.1:4000/api/restaurants/forgotPassRestaurant";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export { forgotPassRestaurant };
