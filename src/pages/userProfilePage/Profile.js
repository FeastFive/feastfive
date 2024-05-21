import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import Editprofile from "./Editprofile";
import Adresses from "./Adresses";
import OrderUser from "../../components/OrderUser";
import GivenOrders from "../orderPages/GivenOrders";

const Profile = () => {

  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);

  

  const [readyPassword, setReadyPassword] = useState(true);
  const [readyEmail, setReadyEmail] = useState(true);
  const [inputsMissingEmail, setInputsMissingEmail] = useState(false);
  const [inputsMissingPassword, setInputsMissingPassword] = useState(false);

  const [choose, setChoose] = useState(1);
  
  const [profileOptions, setProfileOptions] = useState([
    "Edit User Profile",
    "Open Orders",
    "Previous Orders",
    "Adresses",
    "Delete My Account",
  ]);


  const [formData, setFormData] = useState({
    ownerName: restaurant.ownerName,
    ownerSurname: restaurant.ownerSurname,
    restaurantName: restaurant.restaurantName,
    email: restaurant.email,
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const restaurantUser = (
   <></>
  );

  

  const [readyPasswordUser, setReadyPasswordUser] = useState(true);
  const [readyEmailUser, setReadyEmailUser] = useState(true);
  const [inputsMissingEmailUser, setInputsMissingEmailUser] = useState(false);
  const [inputsMissingPasswordUser, setInputsMissingPasswordUser] =
    useState(false);
  const [userFormData, setUserFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
  });
  const handleChangeUser = (event) => {
    setUserFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
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
        {choose === 2 && <GivenOrders></GivenOrders>}
        {choose === 3 && <Adresses></Adresses>}
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />

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
