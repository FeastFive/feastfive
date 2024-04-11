import React, { useState } from "react";
import styles from "../style/LoginComponent.module.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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

      <input type="submit" value="Login" className={styles.subbmitButton} />
      <div className={styles.otherOptionsContainer}>
        <button className={styles.otherOptions}>Forgot your password?</button>
        <button
          className={styles.otherOptions}
          onClick={() => {
            navigate("/SignUp");
          }}
        >
          Don`t you have an account?
        </button>
      </div>
    </form>
  );
};
export default LoginComponent;
