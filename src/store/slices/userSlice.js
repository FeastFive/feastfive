import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  surname: "",
  email: null,
  created_at: null,
  loginDate: null,
  role: "",
  activated: false,
  logs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.created_at = action.payload.createdAt;
      state.loginDate = action.payload.loginDate;
      state.role = action.payload.role;
      state.favorites = action.payload.favorites;
      state.orders = action.payload.orders;
      state.logs = action.payload.logs;
      state.activated = action.payload.activated;
    },
    logout: () => initialState,
  },
});

export const { setActiveUser, logout } = userSlice.actions;

export default userSlice.reducer;
