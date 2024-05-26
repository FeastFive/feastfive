import React, { useState, useEffect } from "react";
import imageLogo from "../../images/logo-white.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ChangePassword.module.css";
import { changePassword } from "../../utils/user/changePassword";
import { ShowAlert } from "../../components/alert/ShowAlert";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [uniqueId, setUniqueId] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("uniqueId");
    setUniqueId(id);
  }, [location]);

  console.log(uniqueId);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangePass = async () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(uniqueId);
    try {
      const response = await changePassword({
        uniqueId,
        newPassword: password,
      });

      if (response.status === 200) {
        const result = await response.json();
        ShowAlert(1, "Password changed successfully");
        // navigate("/home");
      } else if (response.status === 404) {
        console.error("User not found");
        ShowAlert(0, "User not found");
      } else {
        console.error("An error occurred while changing password");
        ShowAlert(0, "An error occurred while changing password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      ShowAlert(0, "Error changing password");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />
      <img src={imageLogo} alt="Logo" className={styles.logo} />
      <div className={styles.passwordContainer}>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Enter New Password:</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Confirm Password:</div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
      </div>
      <button onClick={handleChangePass} className={styles.subbmitButton}>
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
