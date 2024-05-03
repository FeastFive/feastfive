const getKitchen = async () => {
  try {
    const url = "http://127.0.0.1:4000/api/meals/getKitchens";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch kitchens");
    }

    // const kitchens = await response.json();
    return response;
  } catch (error) {
    console.error("Error fetching kitchens:", error);
    throw error;
  }
};

export { getKitchen };
