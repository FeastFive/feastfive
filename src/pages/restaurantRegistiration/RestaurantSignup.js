import React, { useState } from "react";
import styles from "./RestaurantSignup.module.css";
import imageMobil from "../../images/logo-no-background.png";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { register } from "../../utils/registerUser/register";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";

const RestaurantSignup = () => {
  const navigate = useNavigate();
  const [readyPassword, setReadyPassword] = useState(true);
  // const [inputsMissingName, setInputsMissingName] = useState(false);
  // const [inputsMissingSurname, setInputsMissingSurname] = useState(false);
  const [readyEmail, setReadyEmail] = useState(true);
  const [inputsMissingEmail, setInputsMissingEmail] = useState(false);
  const [inputsMissingPassword, setInputsMissingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

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

  return (
    <div className={styles.mainContainer}>
      <IoArrowBack
        className={styles.backIcon}
        onClick={() => {
          navigate(-1);
        }}
      />

      <FaUserPlus
        className={styles.userIcon}
        onClick={() => {
          navigate("/signUp");
        }}
      />
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />
      <div className={styles.singupPhotoContainer}>
        <img className={styles.singupPhoto} src={imageMobil} alt="" />
      </div>

      <div className={styles.mobilPhotoContainer}>
        <img className={styles.mobilPhoto} src={imageMobil} alt="" />
      </div>

      <div className={styles.signupForm}>
        {/* <SignupComponent /> */}
        <div className={styles.formContainer}>
          <div className={styles.nameLabel}>
            <label className={styles.inputLabel}>
              <div className={styles.inputTitle}>Owner Name:</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputFill}
              />
            </label>
            <label className={styles.inputLabel}>
              <div className={styles.inputTitle}>Owner Surname:</div>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className={styles.inputFill}
              />
            </label>
          </div>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Restaurant Name:</div>
            <input
              type="text"
              name="rName"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputFill}
            />
          </label>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Restaurant Address:</div>
            <input
              type="text"
              name="address"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputFill}
            />
          </label>
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
          <button className={styles.subbmitButton} onClick={() => {}}>
            Sign Up
          </button>
          <div className={styles.otherOptionsContainer}>
            <button
              className={styles.otherOptions}
              onClick={() => {
                navigate("/login");
              }}
            >
              Do You Already Have An Account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignup;
