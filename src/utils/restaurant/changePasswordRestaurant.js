const changePasswordRestaurant = async (rest) => {
  try {
    const url = "http://127.0.0.1:4000/api/restaurants/changePassword";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export { changePasswordRestaurant };
