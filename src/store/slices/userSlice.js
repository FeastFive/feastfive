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
  adress: "",
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
      state.adress = action.payload.adress;
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
      state.adress = action.payload.adress;
    },
  },
});

export const { setActiveUser, setUsers, setAdress, logout } = userSlice.actions;

export default userSlice.reducer;
