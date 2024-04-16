import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/registerUser/register";
import { ShowAlert } from "./alert/ShowAlert";

import styles from "../style/SignupComponent.module.css";

const SignupComponent = () => {
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

  const handleSignup = async () => {
    try {
      if (
        formData.name &&
        formData.surname &&
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
          const response = await register(formData);
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
    <div className={styles.formContainer}>
      <div className={styles.nameLabel}>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Name:</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Surname:</div>
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
  );
};

export default SignupComponent;
