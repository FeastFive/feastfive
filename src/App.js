import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ResaturantLogin from "./pages/restaurantLogin/ResaturantLogin";
import SignupPage from "./pages/registerPage/SignupPage";
import RestaurantSignup from "./pages/restaurantRegistiration/RestaurantSignup";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import ChangePassword from "./pages/changePassword/ChangePassword";
import RestaurantPanelPage from "./pages/restaurantPanelPage/RestaurantPanelPage";
import Profile from "./pages/Profile/Profile";
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
import Favoritie from "./pages/favorities/Favoritie";
import Cart from "./pages/Cart/Cart";
import RestaurantHome from "./pages/Profile/RestaurantProfilePage/RestaurantHome";

function App() {
  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);

  const ProtectedRoute = ({ element: Element, redirectTo, condition }) => {
    return condition ? <Element /> : <Navigate to={redirectTo} />;
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer style={{ zIndex: "928273690" }} />

        <Routes>
          <Route
            index
            element={
              <ProtectedRoute
                element={HomePage}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute
                element={HomePage}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/panel"
            element={
              <ProtectedRoute
                element={RestaurantHome}
                redirectTo="/login"
                condition={restaurant.isLogin}
              />
            }
          />
          <Route
            path="/food"
            element={
              <ProtectedRoute
                element={FoodHome}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/favorities"
            element={
              <ProtectedRoute
                element={Favoritie}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/restaurantFoods/:restaurandId/:foodName"
            element={
              <ProtectedRoute
                element={RestaurantFoodList}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/restaurantFoods/:restaurandId"
            element={
              <ProtectedRoute
                element={RestaurantFoodList}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute
                element={CartPage}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />

          <Route
            path="/updateMenu/:mealId"
            element={
              <ProtectedRoute
                element={UpdateMenu}
                redirectTo="*"
                condition={restaurant.isLogin}
              />
            }
          />

          <Route
            path="/menu"
            element={
              <ProtectedRoute
                element={Menu}
                redirectTo="/login"
                condition={restaurant.isLogin}
              />
            }
          />

          <Route
            path="/restaurantPanel"
            element={
              <ProtectedRoute
                element={RestaurantPanelPage}
                redirectTo="/login"
                condition={restaurant.isLogin}
              />
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute
                element={LoginPage}
                redirectTo="/home"
                condition={!restaurant.isLogin && !user.isLogin}
              />
            }
          />

          <Route
            path="/signUp"
            element={
              <ProtectedRoute
                element={SignupPage}
                redirectTo="/home"
                condition={!restaurant.isLogin && !user.isLogin}
              />
            }
          />

          <Route
            path="/restaurantLogin"
            element={
              <ProtectedRoute
                element={ResaturantLogin}
                redirectTo="/home"
                condition={!restaurant.isLogin && !user.isLogin}
              />
            }
          />

          <Route
            path="/restaurantSignUp"
            element={
              <ProtectedRoute
                element={RestaurantSignup}
                redirectTo="/home"
                condition={!restaurant.isLogin && !user.isLogin}
              />
            }
          />

          <Route
            path="/forgotPassword"
            element={
              <ProtectedRoute
                element={ForgotPasswordPage}
                redirectTo="/home"
                condition={!restaurant.isLogin && !user.isLogin}
              />
            }
          />
          <Route
            path="/changePassword"
            element={
              <ProtectedRoute
                element={ChangePassword}
                redirectTo="/home"
                condition={!restaurant.isLogin && !user.isLogin}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                redirectTo="/login"
                condition={restaurant.isLogin || user.isLogin}
              />
            }
          />
          <Route
            path="/filterCuisine"
            element={
              <ProtectedRoute
                element={FilterCuisine}
                redirectTo="/panel"
                condition={!restaurant.isLogin}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                element={FilterCuisine}
                redirectTo="/login"
                condition={restaurant.isLogin || user.isLogin}
              />
            }
          />
          <Route
            path="/purchaseAccepted"
            element={
              <ProtectedRoute
                element={PurchaseAccepted}
                redirectTo="/login"
                condition={restaurant.isLogin || user.isLogin}
              />
            }
          />
          <Route
            path="/purchaseRejected"
            element={
              <ProtectedRoute
                element={PurchaseRejected}
                redirectTo="/login"
                condition={restaurant.isLogin || user.isLogin}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
