import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  id: null,
  name: "",
  surname: "",
  email: null,
  created_at: null,
  loginDate: null,
  role: "",
  address: [],
  favorites: [],
  orders: [],
  logs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.isLogin = true;
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.created_at = action.payload.createdAt;
      state.loginDate = action.payload.loginDate;
      state.role = action.payload.role;
      state.favorites = action.payload.favorites;
      state.orders = action.payload.orders;
      state.logs = action.payload.logs;
    },
    logout: () => initialState,
    setUsers: (state, action) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },
    setAdress: (state, action) => {
      state.address = action.payload.address;
    },
  },
});

export const { setActiveUser, setUsers, setAdress, logout } = userSlice.actions;

export default userSlice.reducer;
