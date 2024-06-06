import React, { useState, useEffect } from "react";
import styles from "../style/Footer.module.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentPath = window.location.pathname;
  const user = useSelector((state) => state.user);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (user?.isLogin) {
      setMenuItems([
        { title: "Home" },
        { title: "Restaurants" },
        { title: "Cuisine" },
        { title: "Favorites" },
      ]);
    } else {
      setMenuItems([
        { title: "Home" },
        { title: "Menu" },
        { title: "Orders" },
        { title: "Profile" },
      ]);
    }
  }, [user]);

  const isExcludedPath = () => {
    const excludedPaths = [
      "/login",
      "/signUp",
      "/restaurantLogin",
      "/restaurantSignUp",
      "/forgotPassword",
      "/changePassword",
      "/restaurantForgotPassword",
      "/restaurantChangePassword",
      "/purchaseAccepted",
      "/purchaseRejected",
      // "/profile",
      // "/favorities",
      // "/orders",
    ];
    return !excludedPaths.includes(currentPath);
  };

  const renderFooter = () => {
    if (!isExcludedPath()) return null;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.footerButtonContainer}>
          {menuItems.map((item, index) => (
            <button key={index} className={styles.footerButton}>
              {item.title}
            </button>
          ))}
          <a href="mailto:feastfive5@gmail.com" className={styles.footerButton}>
            Mail Us
          </a>
        </div>
        <div className={styles.footerRights}>
          ©{new Date().getFullYear()} All Rights Reserved By FeastFive
        </div>
      </div>
    );
  };

  return <>{renderFooter()}</>;
};

export default Footer;
