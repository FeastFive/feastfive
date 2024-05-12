const searchRestaurant = async (key) => {
  const url = "http://127.0.0.1:4000/api/restaurants/getSearchRestaurants";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: key }),
  });

  // if (response.ok) {
  //   const data = await response.json();

  //   const searchProducts = data.map((value) => ({
  //     id: value._id,
  //     restaurantName: value.restaurantName,
  //     email: value.email,
  //   }));
  return response;
  // } else {
  //   return response;
  // }
};

export { searchRestaurant };
