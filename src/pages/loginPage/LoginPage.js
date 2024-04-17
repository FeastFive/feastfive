import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import imageBlack from "../../images/logo-white.png";
import imageWhite from "../../images/logo-black.png";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/loginUser/login";
import { ShowAlert } from "../../components/alert/ShowAlert";

const LoginPage = () => {
  const navigate = useNavigate();
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
      if (!formData.email || !formData.password) {
        ShowAlert(2, "Please fill in all fields");
        return;
      }

      const response = await login(formData);

      if (response.status === 200) {
        const result = await response.json();
        // dispatch(setActiveUser(result));
        ShowAlert(1, "Logged in successfully");
        navigate("/home");
      } else {
        ShowAlert(3, "Incorrect email address or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      ShowAlert(3, "An error occurred while logging in");
    }
  };

  return (
    <div className={styles.loginCartForm}>
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
      <div className={styles.loginCartImage}>
        <img src={imageBlack} alt="" className={styles.imageBlack} />
      </div>
      <img src={imageWhite} alt="" className={styles.imageWhite} />
      {/* <LoginComponent className={styles.loginComponent} /> */}
      <div className={styles.formContainer}>
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

        <div className={styles.otherOptionsContainer}>
          <button className={styles.otherOptions}>Forgot your password?</button>
          <button
            className={styles.otherOptions}
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Don't you have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
