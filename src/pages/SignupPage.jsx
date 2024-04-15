import React from "react";
import SignupComponent from "../components/SignupComponent";
import styles from "../style/SignupPage.module.css";
import imageRed from "../images/logo-color.png";
import imageMobil from "../images/logo-no-background.png";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
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
      <img className={styles.singupPhoto} src={imageRed} alt="" />
      <div className={styles.mobilPhotoContainer}>
        <img className={styles.mobilPhoto} src={imageMobil} alt="" />
      </div>

      <div className={styles.signupForm}>
        <SignupComponent />
      </div>
    </div>
  );
};

export default SignupPage;
