import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import Editprofile from "./userProfilePage/Editprofile";
import Adresses from "./userProfilePage/Adresses";
import GivenOrders from "../orderPages/GivenOrders";
import RestaurantEditProfile from "./RestaurantProfilePage/RestaurantEditProfile";
import RestaurantPanelPage from "../restaurantPanelPage/RestaurantPanelPage";
import RestaurantCharts from "./RestaurantProfilePage/RestaurantCharts";
import { deleteRestaurant } from "../../utils/restaurant/deleteRestaurant";
import { useNavigate } from "react-router-dom";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { restaurantLogout } from "../../store/slices/restaurantSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);

  const [choose, setChoose] = useState(1);

  const [profileOptions, setProfileOptions] = useState([
    "Edit User Profile",
    "Orders",
    "Adresses",
    "Delete My Account",
  ]);

  const [restaurantProfileOptions, setRestaurantProfileOptions] = useState([
    "Edit Restaurant Profile",
    "Edit Restaurant Menü",
    "Orders",
    "Statistics",
    "Delete My Account",
  ]);

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  }

  const handleDeleteRestaurant = async () => {
    try {
      const id = restaurant.id;
      const response = await deleteRestaurant(id);

      console.log();

      if (response.ok) {
        ShowAlert(1, "Restaurant deleted successfully");
        dispatch(restaurantLogout());
        navigate("/");
      } else {
        console.error("Failed to delete restaurant");
        ShowAlert(3, "Failed to delete restaurant");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };
  const restaurantUser = (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-auto px-12 md:px-24 lg:px-32 py-12 border-b-2">
        <div className="w-full h-full col-span-1 ">
          <h1 className="pl-3 text-xl font-bold pb-2">
            Restaurant Informations
          </h1>
          <div className="w-full h-auto flex flex-row gap-8">
            <div className="w-32 h-32 rounded-full  pt-6">
              <img
                className="w-full h-auto"
                src={`${
                  restaurant.image ??
                  "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
                }`}
              ></img>
            </div>

            <div className="flex flex-col pt-4">
              <h3>
                <span className="pr-2 text-lg font-semibold">
                  Restaurant Name:
                </span>{" "}
                {restaurant?.restaurantName}{" "}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">
                  Restaurant Owner:
                </span>{" "}
                {restaurant.ownerName} {restaurant.ownerSurname}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">E-mail:</span>
                {restaurant.email}{" "}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">
                  Restaurant Adress:
                </span>{" "}
                {restaurant?.adress?.province} {restaurant?.adress?.district}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">
                  Registration Date:
                </span>
                {formatDate(restaurant.created_at)}{" "}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">Last Login:</span>
                {formatDate(restaurant.loginDate)}{" "}
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full h-full col-span-1 ">
          <h1 className=" text-xl font-bold pb-2">Restaurant Options</h1>
          <div className="flex flex-row flex-wrap pt-4 gap-3">
            {restaurantProfileOptions.map((option, index) => (
              <button
                onClick={() => setChoose(index)}
                className="bg-gray-900 w-auto h-12 text-sm font-semibold px-4 md:px-8 py-1 rounded-md shadow-sm text-slate-50 hover:bg-gray-700 duration-200 ease cursor-pointer"
              >
                {" "}
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-5 h-full pb-24 overflow-x-hidden">
        {choose === 0 && <RestaurantEditProfile></RestaurantEditProfile>}
        {choose === 1 && <RestaurantPanelPage></RestaurantPanelPage>}
        {choose === 2 && <GivenOrders></GivenOrders>}
        {choose === 3 && <RestaurantCharts></RestaurantCharts>}

        {choose === 4 && (
          <div className="w-full h-full pt-12 flex flex-col justfiy-center place-items-center">
            <h2 className="text-3xl font-semibold">
              Are you sure want to delete your Restaurant ?
            </h2>
            <div className="flex flex-row pt-4 gap-3">
              <button
                onClick={() => handleDeleteRestaurant()}
                className="bg-red-400 rounded-md shadow-sm w-auto px-8 py-2 hover:bg-red-600 duration-200 cursor-pointer text-slate-50 text-lg font-semibold"
              >
                Yes I'm sure
              </button>
              <button
                onClick={() => setChoose(1)}
                className="bg-green-400 rounded-md shadow-sm w-auto px-8 py-2 hover:bg-green-500 duration-200 cursor-pointer text-slate-50 text-lg font-semibold"
              >
                No I'm not
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const normalUser = (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-auto px-12 md:px-24 lg:px-32 py-12 border-b-2">
        <div className="w-full h-full col-span-1 ">
          <h1 className="pl-3 text-xl font-bold pb-2">User Informations</h1>
          <div className="w-full h-auto flex flex-row gap-8">
            <div className="w-32 h-32 rounded-full  pt-6">
              <img
                className="w-full h-auto"
                src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
              ></img>
            </div>

            <div className="flex flex-col pt-4">
              <h3>
                <span className="pr-2 text-lg font-semibold">Name:</span>{" "}
                {user.name}{" "}
              </h3>
              <h>
                {" "}
                <span className="pr-2 text-lg font-semibold">
                  Surname:
                </span>{" "}
                {user.surname}
              </h>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">E-mail:</span>
                {user.email}{" "}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">
                  Registration Date:
                </span>
                {user.created_at}{" "}
              </h3>
              <h3>
                {" "}
                <span className="pr-2 text-lg font-semibold">Last Login:</span>
                {user.loginDate}{" "}
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full h-full col-span-1 ">
          <h1 className=" text-xl font-bold pb-2">User Options</h1>
          <div className="flex flex-row flex-wrap pt-4 gap-3">
            {profileOptions.map((option, index) => (
              <button
                onClick={() => setChoose(index)}
                className="bg-gray-900 w-auto h-12 text-sm font-semibold px-4 md:px-8 py-1 rounded-md shadow-sm text-slate-50 hover:bg-gray-700 duration-200 ease cursor-pointer"
              >
                {" "}
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-5 h-full pb-24">
        {choose === 0 && <Editprofile>Z</Editprofile>}
        {choose === 1 && <GivenOrders></GivenOrders>}
        {choose === 2 && <Adresses></Adresses>}
        {choose === 3 && (
          <div className="w-full h-full pt-12 flex flex-col justfiy-center place-items-center">
            <h2 className="text-3xl font-semibold">
              Are you sure want to delete your User ?
            </h2>
            <div className="flex flex-row pt-4 gap-3">
              <button
                onClick={() => deleteRestaurant()}
                className="bg-red-400 rounded-md shadow-sm w-auto px-8 py-2 hover:bg-red-600 duration-200 cursor-pointer text-slate-50 text-lg font-semibold"
              >
                Yes I'm sure
              </button>
              <button
                onClick={() => setChoose(1)}
                className="bg-green-400 rounded-md shadow-sm w-auto px-8 py-2 hover:bg-green-500 duration-200 cursor-pointer text-slate-50 text-lg font-semibold"
              >
                No I'm not
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div>
        {user.isLogin ? normalUser : null}
        {restaurant.isLogin ? restaurantUser : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
