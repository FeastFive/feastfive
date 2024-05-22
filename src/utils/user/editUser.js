const editUser = async (userObj) => {
  try {
    const url = "http://127.0.0.1:4000/api/users/editUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    return response;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export { editUser };
