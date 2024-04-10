import React, { useState } from "react";
import styles from "../style/Navbar.module.css";
import navIcon from "../images/logo-color.png";
import { BsJustify } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  const menuButtons = {
    button1: { title: "Button1" },
    button2: { title: "Button2" },
    button3: { title: "Button3" },
    button4: { title: "Button4" },
    loginButton: { title: "LogIn" },
    singupButton: { title: "SignUp" },
  };

  const mobileDropdownAnimationVars = {
    initial: {
      y: -800,
      transition: {
        duration: 1,
      },
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      y: -800,
      transition: {
        duration: 1,
      },
    },
  };

  const MobileDropdown = () => {
    return (
      <motion.div
        variants={mobileDropdownAnimationVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.MobileNavbarDropdownContainer}
      >
        <div className={styles.mobileDropdownIconContainer}>
          <BsJustify
            className={styles.dropdownIcon}
            onClick={() => setNavDropdownOpen(false)}
          />
        </div>
        <div className={styles.iconMobileContainer}>
          <img src={navIcon} alt="" className={styles.navMobilIcon} />
        </div>
        <div className={styles.mobileButtonContainer}>
          <div className={styles.mobilRegistrationContainer}>
            <button
              className={styles.mobilLoginButton}
              onClick={() => navigate("/Login")}
            >
              {menuButtons.loginButton.title}
            </button>
            <button
              className={styles.mobilSingupButton}
              onClick={() => navigate("/SignUp")}
            >
              {menuButtons.singupButton.title}
            </button>
          </div>
          <button className={styles.navMobileButton}>
            {menuButtons.button1.title}
          </button>
          <button className={styles.navMobileButton}>
            {menuButtons.button2.title}
          </button>
          <button className={styles.navMobileButton}>
            {menuButtons.button3.title}
          </button>
          <button className={styles.navMobileButton}>
            {menuButtons.button4.title}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.navButton}>
          {menuButtons.button1.title}
        </button>
        <button className={styles.navButton}>
          {menuButtons.button2.title}
        </button>
        <div className={styles.iconContainer}>
          <img src={navIcon} alt="" className={styles.navIcon} />
        </div>
        <button className={styles.navButton}>
          {menuButtons.button3.title}
        </button>
        <button className={styles.navButton}>
          {menuButtons.button4.title}
        </button>
        <div className={styles.registrationContainer}>
          <button
            className={styles.loginButton}
            onClick={() => navigate("/Login")}
          >
            {menuButtons.loginButton.title}
          </button>
          <button
            className={styles.singupButton}
            onClick={() => navigate("/SignUp")}
          >
            {menuButtons.singupButton.title}
          </button>
        </div>

        <div className={styles.responsiveDropdown}>
          <BsJustify
            className={styles.dropdownIcon}
            onClick={() => setNavDropdownOpen(true)}
          />
          <AnimatePresence>
            {navDropdownOpen && <MobileDropdown />}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
