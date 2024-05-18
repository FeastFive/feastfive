import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import imageLogo from "../../images/logo-no-background.png";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./PurchaseAccepted.module.css";
import { resetAll } from "../../store/slices/cartSlice";

const PurchaseAccepted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetAll());
  }, []);

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
        Back to Shop
      </button>
    </div>
  );
};

export default PurchaseAccepted;
