import React, { useState, useEffect } from "react";
import imageLogo from "../../images/Restaurant.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./RestaurantChangePassword.module.css";
import { changePasswordRestaurant } from "../../utils/restaurant/changePasswordRestaurant";
import { ShowAlert } from "../../components/alert/ShowAlert";

const RestaurantChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [readyPassword, setReadyPassword] = useState(true);
  const [uniqueId, setUniqueId] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("uniqueId");
    setUniqueId(id);
  }, [location]);

  // console.log(uniqueId);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const checkPassword = (pass) => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass) &&
      pass.length >= 8
    ) {
      setReadyPassword(false);
      return true;
    } else {
      setReadyPassword(true);
      return false;
    }
  };

  const handleChangeResPass = async () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (!checkPassword(formData.password)) {
      ShowAlert(
        3,
        `Invalid password! Your password must be at least 8 characters long
        and include at least one uppercase letter, one lowercase letter,
        and one number for security purposes.`
      );
      setReadyPassword(false);
    } else {
      try {
        const response = await changePasswordRestaurant({
          uniqueId,
          newPassword: password,
        });

        if (response.status === 200) {
          const result = await response.json();
          ShowAlert(1, "Password changed successfully");
          navigate("/restaurantLogin");
        } else if (response.status === 404) {
          console.error("User not found");
          ShowAlert(0, "User not found");
        } else {
          console.error("An error occurred while changing password");
          ShowAlert(0, "An error occurred while changing password");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        ShowAlert(0, "Error changing password");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />
      <img src={imageLogo} alt="Logo" className={styles.logo} />
      <div className={styles.passwordContainer}>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Enter New Password:</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Confirm Password:</div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
      </div>
      <button onClick={handleChangeResPass} className={styles.subbmitButton}>
        Change Password
      </button>
    </div>
  );
};

export default RestaurantChangePassword;
