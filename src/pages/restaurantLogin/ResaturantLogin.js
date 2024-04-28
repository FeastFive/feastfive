import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./RestaurantLogin.module.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
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
      {/* <FaStore className={styles.backgroundIcon} /> */}

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

        <button onClick={() => {}} className={styles.subbmitButton}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default ResaturantLogin;
