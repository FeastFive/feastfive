import React from "react";
import styles from "./RestaurantForgotPassword.module.css";
import { useState } from "react";
import imageLogo from "../../images/Restaurant.png";
import { IoHomeSharp, IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RestaurantForgotPassword = () => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleForgotPassUser = async () => {};

  return (
    <div className={styles.pageContainer}>
      <IoArrowBack
        className={styles.backIcon}
        onClick={() => {
          navigate(-1);
        }}
      />
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />
      <img src={imageLogo} alt="" className={styles.logo} />
      <div className={styles.email}>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>
            Enter your restaurant accounts email:
          </div>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className={styles.inputFill}
          />
        </label>

        <button className={styles.subbmitButton} onClick={handleForgotPassUser}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default RestaurantForgotPassword;
