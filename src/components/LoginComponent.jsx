import React, { useState } from "react";
import styles from "../style/LoginComponent.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/loginUser/login";

import { ShowAlert } from "./alert/ShowAlert";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await login(user);
      const result = await response.json();

      if (user.email && user.password) {
        if (response.status === 200) {
          // dispatch(setActiveUser(result));
          ShowAlert(1, "Logged in successfully");
          navigate("/home");
        } else {
          ShowAlert(3, "Incorrect email address or password");
        }
      } else if (user.password) {
        ShowAlert(2, "Enter your email address");
      } else if (user.email) {
        ShowAlert(2, "Enter your password");
      } else {
        ShowAlert(2, "Please fill in the blanks");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <label className={styles.inputLabel}>
        <div className={styles.inputTitle}>Email:</div>
        <input
          type="text"
          name="username"
          value={formData.username}
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
      <div className={styles.otherOptionsContainer}>
        <button className={styles.otherOptions}>Forgot your password?</button>
        <button
          className={styles.otherOptions}
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Don`t you have an account?
        </button>
      </div>
    </div>
  );
};
export default LoginComponent;
