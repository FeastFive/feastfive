import React, { useState } from "react";
import imageLogo from "../../images/logo-white.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  return (
    <div className={styles.pageContainer}>
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />
      <img src={imageLogo} alt="" className={styles.logo} />
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
            name="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
      </div>
      <button onClick={() => {}} className={styles.subbmitButton}>
        Log In
      </button>
    </div>
  );
};

export default ChangePassword;
