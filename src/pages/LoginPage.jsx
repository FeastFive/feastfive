import React from "react";
import Navbar from "../components/Navbar";
import LoginComponent from "../components/LoginComponent";
import styles from "../style/LoginPage.module.css";
import imageBlack from "../images/logo-white.png";
import imageWhite from "../images/logo-black.png";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
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
      <LoginComponent className={styles.loginComponent} />
    </div>
  );
};

export default LoginPage;
