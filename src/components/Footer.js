import React from "react";
import styles from "../style/Footer.module.css";

const Footer = () => {
  const currentPath = window.location.pathname;
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Restaurants", path: "/restaurants" },
    { title: "Cuisine", path: "/cuisine" },
    { title: "Campaign", path: "/campaign" },
  ];

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
