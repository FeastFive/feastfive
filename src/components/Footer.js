import React from "react";
import styles from "../style/Footer.module.css";

// footer
const Footer = () => {
  const menuButtons = {
    button1: { title: "Home" },
    button2: { title: "Restaurants" },
    button3: { title: "Cuisine" },
    button4: { title: "Campaign" },
    button5: { title: "Mail Us" },
  };
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.footerButtonContainer}>
        <button className={styles.footerButton}>
          {menuButtons.button1.title}
        </button>
        <button className={styles.footerButton}>
          {menuButtons.button2.title}
        </button>
        <button className={styles.footerButton}>
          {menuButtons.button3.title}
        </button>
        <button className={styles.footerButton}>
          {menuButtons.button4.title}
        </button>
        <a href="mailto:feastfive5@gmail.com" className={styles.footerButton}>
          {menuButtons.button5.title}
        </a>
      </div>
      <div>
        <div className={styles.footerRights}>
          ©{currentYear} All Rights Reserved By FeastFive
        </div>
      </div>
    </div>
  );
};

export default Footer;
