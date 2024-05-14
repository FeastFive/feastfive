import React from "react";
import imageLogo from "../../images/logo-no-background.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./PurchaseAccepted.module.css";

const PurchaseAccepted = () => {
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
      <div className={styles.notFound}>Purchase Accepted</div>
      <button
        className={styles.backToShop}
        onClick={() => {
          navigate("/home");
        }}
      >
        Backt to shop
      </button>
    </div>
  );
};

export default PurchaseAccepted;
