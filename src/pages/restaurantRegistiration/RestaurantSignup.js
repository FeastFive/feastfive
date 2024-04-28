import React, { useState } from "react";
import styles from "./RestaurantSignup.module.css";
import imageMobil from "../../images/logo-no-background.png";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useNavigate } from "react-router-dom";
import { registerRes } from "../../utils/registerRestaurant/registerRes";

const RestaurantSignup = () => {
  const navigate = useNavigate();
  const [readyPassword, setReadyPassword] = useState(true);
  // const [inputsMissingName, setInputsMissingName] = useState(false);
  // const [inputsMissingSurname, setInputsMissingSurname] = useState(false);
  const [readyEmail, setReadyEmail] = useState(true);
  const [inputsMissingEmail, setInputsMissingEmail] = useState(false);
  const [inputsMissingPassword, setInputsMissingPassword] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerSurname: "",
    restaurantName: "",
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

  const handleSignup = async () => {
    try {
      if (
        formData.ownerName &&
        formData.ownerSurname &&
        formData.restaurantName &&
        formData.email &&
        formData.password
      ) {
        const checkMailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!checkMailRE.test(formData.email)) {
          // invalid email, maybe show an error to the user.
          setReadyEmail(false);
          setInputsMissingEmail(true);
          ShowAlert(3, "Invalid Email!");
        } else if (!checkPassword(formData.password)) {
          //invalid password
          setReadyPassword(false);
          setInputsMissingPassword(true);
          ShowAlert(
            3,
            `Invalid password! Your password must be at least 8 characters long
            and include at least one uppercase letter, one lowercase letter,
            and one number for security purposes.`
          );
        } else {
          setReadyEmail(true);
          const response = await registerRes(formData);
          if (response.status === 201) {
            ShowAlert(1, "Successfully Registered");
            navigate("/login");
          }
          //user already exists
          else if (response.status === 401) {
            ShowAlert(2, "User already exist.");
          }
        }
      }
      //fill all credentials
      else {
        ShowAlert(2, "Please fill in all blank fields.");
      }
    } catch (error) {
      console.error(error);
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
          <div className={styles.title}>Restaurant SignUp</div>
          <div className={styles.nameLabel}>
            <label className={styles.inputLabel}>
              <div className={styles.inputTitle}>Owner Name:</div>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className={styles.inputFill}
              />
            </label>
            <label className={styles.inputLabel}>
              <div className={styles.inputTitle}>Owner Surname:</div>
              <input
                type="text"
                name="ownerSurname"
                value={formData.ownerSurname}
                onChange={handleChange}
                className={styles.inputFill}
              />
            </label>
          </div>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Restaurant Name:</div>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              className={styles.inputFill}
            />
          </label>
          {/* <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Restaurant Address:</div>
            <input
              type="text"
              name="address"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputFill}
            />
          </label> */}
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
          <button className={styles.subbmitButton} onClick={handleSignup}>
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
