import React, { useState, useEffect } from "react";
import imageLogo from "../../images/Restaurant.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./RestaurantChangePassword.module.css";

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
  const handleChangePass = async () => {};

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
      <button onClick={handleChangePass} className={styles.subbmitButton}>
        Change Password
      </button>
    </div>
  );
};

export default RestaurantChangePassword;
