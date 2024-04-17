import React from "react";
import imageLogo from "../../images/logo-no-background.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./NoPage.module.css";

const NoPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <IoHomeSharp
        className={styles.homeIcon}
        onClick={() => {
          navigate("/home");
        }}
      />
      <img src={imageLogo} alt="" className={styles.logo} />
      <div className={styles.notFound}>404: Page Not Found</div>
    </div>
  );
};

export default NoPage;
