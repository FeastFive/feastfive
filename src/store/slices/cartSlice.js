import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { ShowAlert } from "../../components/alert/ShowAlert";

const initialState = {
  restaurantId: null,
  cartFoodList: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /*{id: 1 , foodName:"döner", count:1 } */
    addFoodToCard: (state, action) => {
      state.restaurantId = action.payload.restaurant;

      if (action.payload.singleOption) {
        let checkFood = state.cartFoodList.find(
          (e) => e.foodName === action.payload.foodName
        );
        const price = parseFloat(action.payload.price);

        if (!isNaN(price)) {
          if (checkFood) {
            let foodInfoObj = {
              price: action.payload.price,
              options: action.payload.options,
              singleOption: action.payload.singleOption,
            };
            checkFood.foodInfo.push(foodInfoObj);
            checkFood.count = (checkFood.count || 0) + 1; // Ensure count is initialized
          } else {
            let foodInfoObj = {
              price: action.payload.price,
              options: action.payload.options,
              singleOption: action.payload.singleOption,
            };
            let obj = {
              foodName: action.payload.foodName,
              count: 1,
              foodInfo: [foodInfoObj],
            };

            state.cartFoodList.push({
              ...obj,
            });

            console.log(state.cartFoodList);
          }

          state.totalPrice += price;
        } else {
          console.error("Invalid price:", action.payload.price);
        }
      } else {
        ShowAlert(3, "Fill the blanks");
      }
    },
    removeFromCart: (state, action) => {
        const { food, index } = action.payload;
      
        const cartIndex = state.cartFoodList.findIndex(e => e.foodName === food.foodName);
      
        if (cartIndex !== -1) {
          const foodItem = state.cartFoodList[cartIndex];
          const foodInfo = foodItem.foodInfo;
      
          if (index >= 0 && index < foodInfo.length) {
            const removedItemPrice = foodInfo[index].price;
      
            foodInfo.splice(index, 1);
      
            state.totalPrice -= removedItemPrice;
      
            foodItem.count -= 1;
      
            if (foodInfo.length === 0) {
              state.cartFoodList.splice(cartIndex, 1);
            }
          }
        }
      },

    resetAll: () => initialState,
  },
});

export const { addFoodToCard, removeFromCart, resetAll } = cartSlice.actions;

export default cartSlice.reducer;
