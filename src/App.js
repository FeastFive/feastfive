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
import NoPage from "./pages/notFound/NoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FoodHome from "./pages/homePage/FoodHome.js/FoodHome";
import Navbar from "./components/Navbar";
import Menu from "./pages/restaurant/menu/Menu";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer style={{ zIndex: "928273690" }} />

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/food" element={<FoodHome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/restaurantLogin" element={<ResaturantLogin />} />
          <Route path="/restaurantPanel" element={<RestaurantPanelPage />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/restaurantSignUp" element={<RestaurantSignup />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
