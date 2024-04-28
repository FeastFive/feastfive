import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./RestaurantLogin.module.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { loginRes } from "../../utils/loginRestaurant/loginRes";
import { ShowAlert } from "../../components/alert/ShowAlert";
const ResaturantLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleLogin = async () => {
    try {
      if (!formData.email && !formData.password) {
        ShowAlert(2, "Please fill in all fields");
        return;
      }
      const response = await loginRes(formData);
      console.log(response);

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        ShowAlert(1, "Logged in successfully");
      } else if (response.status === 403) {
        ShowAlert(3, "Check your email to activate your account.");
      } else {
        ShowAlert(3, "Invalid email address or password");
      }
    } catch (error) {
      console.log("Login error", error);
      ShowAlert(3, "An error occured while logging in");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <IoArrowBack
        className={styles.backIcon}
        onClick={() => {
          navigate(-1);
        }}
      />

      <FaUserPlus
        className={styles.userIcon}
        onClick={() => {
          navigate("/login");
        }}
      />
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />

      <div className={styles.loginCart}>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Email:</div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Password:</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>

        <button onClick={handleLogin} className={styles.subbmitButton}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default ResaturantLogin;
