import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../style/SignupComponent.module.css";

const SignupComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    gender: "",
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
        <div className={styles.inputTitle}>Gender:</div>
        <select
          className={styles.dropdown}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option className={styles.option} value="other">
            Other
          </option>
          <option className={styles.option} value="male">
            Male
          </option>
          <option className={styles.option} value="female">
            Female
          </option>
        </select>
      </label>
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

      <input type="submit" value="Signup" className={styles.subbmitButton} />
      <div className={styles.otherOptionsContainer}>
        <button
          className={styles.otherOptions}
          onClick={() => {
            navigate("/Login");
          }}
        >
          Do You Already Have An Account?
        </button>
      </div>
    </form>
  );
};

export default SignupComponent;
