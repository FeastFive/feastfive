const changePassword = async (user) => {
  try {
    const url = "http://127.0.0.1:4000/api/users/changePassword";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export { changePassword };
