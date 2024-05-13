import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { ShowAlert } from "../../components/alert/ShowAlert";

const initialState = {
  restaurantId: 4,
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
        const price = parseFloat(action.payload.price);
    
        if (!isNaN(price)) {
          let checkFood = state.cartFoodList.find(
            (e) => e.foodName === action.payload.foodName
          );
    
          if (checkFood) {
            let existingFoodInfo = checkFood.foodInfo.find((e) => (
              e.price === action.payload.price &&
              JSON.stringify(e.options) === JSON.stringify(action.payload.options) &&
              e.singleOption === action.payload.singleOption
            ));
    
            if (existingFoodInfo) {
              existingFoodInfo.count += 1;
              checkFood.count+=1;
            } else {
              let foodInfoObj = {
                price: action.payload.price,
                options: action.payload.options,
                singleOption: action.payload.singleOption,
                count: 1,
              };
              checkFood.foodInfo.push(foodInfoObj);
              checkFood.count = (checkFood.count || 0) + 1; // Ensure count is initialized
            }
          } 
          else {
            let foodInfoObj = {
              price: action.payload.price,
              options: action.payload.options,
              singleOption: action.payload.singleOption,
              count: 1,
            };
            
            let obj = {
              foodImage:action.payload.foodImage,
              foodName: action.payload.foodName,
              foodImage:action.payload.foodImage,
              foodDescp:action.payload.foodDescp,
              count: 1,
              foodInfo: [foodInfoObj],
            };
            
            state.cartFoodList.push(obj);
          }
          ShowAlert(4, `${action.payload.foodName} Added`);
          state.totalPrice += price;
        } else {
          console.error("Invalid price:", action.payload.price);
        }
      
    },
    
    removeFromCart: (state, action) => {
      const { food, index } = action.payload;
    
      // Find the index of the food item in the cartFoodList
      const foodIndex = state.cartFoodList.findIndex(item => item.foodName === food.foodName);
    
      if (foodIndex !== -1) {
        // Create a copy of the food item and its foodInfo array
        const updatedFood = { ...food };
        updatedFood.foodInfo = Array.isArray(updatedFood.foodInfo) ? [...updatedFood.foodInfo] : [];
    
        if (index >= 0 && index < updatedFood.foodInfo.length) {
          const updatedInfo = { ...updatedFood.foodInfo[index] };
    
          if (updatedInfo.count > 1) {
            // If the count is greater than 1, decrease the count
            updatedInfo.count -= 1;
            updatedFood.foodInfo[index] = updatedInfo;
          } else {
            // If the count is 1, remove the specific foodInfo object from the array
            updatedFood.foodInfo.splice(index, 1);
          }

          updatedFood.count-=1;
        }
    
        // Update the food count in the cartFoodList
        if (updatedFood.foodInfo.length === 0) {
          // If no foodInfo objects left, remove the entire food from the cartFoodList
          state.cartFoodList.splice(foodIndex, 1);
        } else {
          // Update the cartFoodList with the modified food item
          state.cartFoodList.splice(foodIndex, 1, updatedFood);
        }
    
        // Update totalPrice
        ShowAlert(5, `${food.foodName} Removed`);
        state.totalPrice -= food.foodInfo[index].price;
        if(state.cartFoodList.length == 0){
        localStorage.removeItem("restaurantId")
        }
      }
    }
    
    
    ,
    

    resetAll: () => {
      localStorage.removeItem("restaurantId");
      return {
        ...initialState
      };
    },
  },
});

export const { addFoodToCard, removeFromCart, resetAll } = cartSlice.actions;

export default cartSlice.reducer;
