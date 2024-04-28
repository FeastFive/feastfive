import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import restaurantSlice from "./slices/restaurantSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userSlice,
  restaurant: restaurantSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
