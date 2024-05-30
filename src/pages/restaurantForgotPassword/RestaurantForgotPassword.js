import React from "react";
import styles from "./RestaurantForgotPassword.module.css";
import { useState } from "react";
import imageLogo from "../../images/Restaurant.png";
import { IoHomeSharp, IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { forgotPassRestaurant } from "../../utils/restaurant/forgotPassRestaurant";
import { ShowAlert } from "../../components/alert/ShowAlert";

const RestaurantForgotPassword = () => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [formData, setFormData] = useState({
    email: "",
  });
  console.log(formData);
  const handleForgotPassRestaurant = async () => {
    try {
      const response = await forgotPassRestaurant(formData.email);
      console.log(response);

      if (response.status === 200) {
        ShowAlert(1, "Email sent succesfully");
      } else if (response.status === 404) {
        ShowAlert(3, "Restaurant does not exist");
      } else if (response.status === 401) {
        ShowAlert(3, "Non-activated account");
      } else {
        ShowAlert(3, "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

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
            placeholder="email@address.com"
            onChange={handleChange}
            value={formData.email}
            className={styles.inputFill}
          />
        </label>

        <button
          className={styles.subbmitButton}
          onClick={handleForgotPassRestaurant}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RestaurantForgotPassword;
