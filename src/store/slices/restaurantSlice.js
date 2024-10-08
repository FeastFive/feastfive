import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  id: null,
  restaurantName: "",
  ownerName: "",
  ownerSurname: "",
  email: null,
  adress: "",
  created_at: null,
  loginDate: null,
  role: "",
  meals: [],
  orders: [],
  labels: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setActiveRestaurant: (state, action) => {
      state.isLogin = true;
      state.id = action.payload._id;
      state.restaurantName = action.payload.restaurantName;
      state.ownerName = action.payload.ownerName;
      state.ownerSurname = action.payload.ownerSurname;
      state.email = action.payload.email;
      state.adress = action.payload.adress;
      state.created_at = action.payload.createdAt;
      state.loginDate = action.payload.loginDate;
      state.role = action.payload.role;
      state.meals = action.payload.meals;
      state.orders = action.payload.orders;
      state.labels = action.payload.labels;
    },
    restaurantLogout: () => initialState,

    setMeal: (state, action) => {
      state.meals = action.payload.meals;
    },
    setLabels: (state, action) => {
      state.labels = action.payload.labels;
    },
    setRestaurant: (state, action) => {
      state.restaurantName = action.payload.restaurantName;
      state.ownerName = action.payload.ownerName;
      state.ownerSurname = action.payload.ownerSurname;
      state.adress = action.payload.adress;
    },
  },
});
export const {
  setActiveRestaurant,
  restaurantLogout,
  setRestaurant,
  setMeal,
  setLabels,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
