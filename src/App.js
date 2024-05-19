import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ResaturantLogin from "./pages/restaurantLogin/ResaturantLogin";
import SignupPage from "./pages/registerPage/SignupPage";
import RestaurantSignup from "./pages/restaurantRegistiration/RestaurantSignup";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import ChangePassword from "./pages/changePassword/ChangePassword";
import RestaurantPanelPage from "./pages/restaurantPanelPage/RestaurantPanelPage";
import Profile from "./pages/profilePage/Profile";
import GivenOrders from "./pages/orderPages/GivenOrders";
import NoPage from "./pages/notFound/NoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FoodHome from "./pages/homePage/FoodHome.js/FoodHome";
import Navbar from "./components/Navbar";
import Menu from "./pages/restaurant/menu/Menu";
import UpdateMenu from "./pages/restaurant/updateMenu/UpdateMenu";
import { useSelector } from "react-redux";
import RestaurantFoodList from "./pages/restaurant/restaurantFoodList/RestaurantFoods";
import CartPage from "./pages/CartPage/CartPage";
import PurchaseAccepted from "./pages/afterPurchasePages/PurchaseAccepted";
import PurchaseRejected from "./pages/afterPurchasePages/PurchaseRejected";
import FilterCuisine from "./pages/homePage/filter/FilterCuisine";

function App() {
  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);

  return (
    <>
      <BrowserRouter>
        <ToastContainer style={{ zIndex: "928273690" }} />

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/food" element={<FoodHome />} />
          <Route
            path="/restaurantFoods/:restaurandId/:foodName"
            element={<RestaurantFoodList />}
          />

          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/restaurantFoods/:restaurandId"
            element={<RestaurantFoodList />}
          />
          <Route
            path={restaurant.isLogin ? "/updateMenu/:mealId" : "*"}
            element={<UpdateMenu />}
          />

          <Route
            path={restaurant.isLogin ? "/menu" : "*"}
            element={restaurant.isLogin ? <Menu /> : <NoPage />}
          />
          <Route
            path={restaurant.isLogin ? "/restaurantPanel" : "*"}
            element={restaurant.isLogin ? <RestaurantPanelPage /> : <NoPage />}
          />
          <Route
            path={restaurant.isLogin || user.isLogin ? "/home" : "/login"}
            element={
              restaurant.isLogin || user.isLogin ? <HomePage /> : <LoginPage />
            }
          />
          <Route
            path={restaurant.isLogin || user.isLogin ? "/home" : "/signUp"}
            element={
              restaurant.isLogin || user.isLogin ? <HomePage /> : <SignupPage />
            }
          />
          <Route
            path={
              restaurant.isLogin || user.isLogin ? "/home" : "/restaurantLogin"
            }
            element={
              restaurant.isLogin || user.isLogin ? (
                <HomePage />
              ) : (
                <ResaturantLogin />
              )
            }
          />

          <Route
            path={
              restaurant.isLogin || user.isLogin ? "/home" : "/restaurantSignUp"
            }
            element={
              restaurant.isLogin || user.isLogin ? (
                <HomePage />
              ) : (
                <RestaurantSignup />
              )
            }
          />

          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/restaurantLogin" element={<ResaturantLogin />} /> */}
          {/* <Route path="/signUp" element={<SignupPage />} /> */}
          {/* <Route path="/restaurantSignUp" element={<RestaurantSignup />} /> */}
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/filterCuisine" element={<FilterCuisine />} />
          <Route path="/orders" element={<GivenOrders />} />
          <Route path="/purchaseAccepted" element={<PurchaseAccepted />} />
          <Route path="/purchaseRejected" element={<PurchaseRejected />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
