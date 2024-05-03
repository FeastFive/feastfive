const getRestaurant = async () => {
  try {
    const url = "http://127.0.0.1:4000/api/restaurants/getRestaurant";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export { getRestaurant };
