import React, { useState, useEffect } from "react";
import imageLogo from "../../images/logo-white.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ChangePassword.module.css";

const RestaurantChangePassword = () => {
  const navigate = useNavigate();
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
