import React from "react";
import { useState } from "react";
import imageLogo from "../../images//logo-black.png";
import { IoHomeSharp, IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.css";
import { forgotPassUser } from "../../utils/user/forgotPassUser";
import { ShowAlert } from "../../components/alert/ShowAlert";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleForgotPassUser = async () => {
    try {
      const response = await forgotPassUser(formData);

      if (response.status === 200) {
        ShowAlert(1, "Email sent succesfully");
      } else {
        ShowAlert(3, "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
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
      <img src={imageLogo} alt="" className={styles.logo} />
      <div className={styles.email}>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Enter your accounts email:</div>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className={styles.inputFill}
          />
        </label>

        <button className={styles.subbmitButton} onClick={handleForgotPassUser}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
