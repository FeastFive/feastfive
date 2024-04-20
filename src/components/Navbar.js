import React, { useState } from "react";
import styles from "../style/Navbar.module.css";
import navIcon from "../images/logo-color.png";
import { BsJustify } from "react-icons/bs";
import { MdKeyboardArrowDown, MdOpacity } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [navProfileDropdownOpen, setNavProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  console.log(user);

  const menuButtons = {
    button1: { title: "Button1" },
    button2: { title: "Button2" },
    button3: { title: "Button3" },
    button4: { title: "Button4" },
    loginButton: { title: "Log In" },
    singupButton: { title: "Sign Up" },
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
  const iconDropdownAnimationVars = {
    initial: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleLogout = () => {
    dispatch(logout());
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
            {user.isLogin ? (
              <button className={styles.mobilProfileBtn}>Profile</button>
            ) : (
              <>
                <button
                  className={styles.mobilLoginButton}
                  onClick={() => navigate("/login")}
                >
                  {menuButtons.loginButton.title}
                </button>
                <button
                  className={styles.mobilSingupButton}
                  onClick={() => navigate("/signUp")}
                >
                  {menuButtons.singupButton.title}
                </button>
              </>
            )}
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
          {user.name ? (
            <button onClick={handleLogout} className={styles.navMobileButton}>
              Log Out
            </button>
          ) : (
            <></>
          )}
        </div>
      </motion.div>
    );
  };

  const IconDropdown = () => {
    return (
      <motion.div
        variants={iconDropdownAnimationVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.iconDropdown}
      >
        <button className={styles.iconDropdownBtn}>Profile</button>
        <button className={styles.iconDropdownBtn}>Help</button>
        <button className={styles.iconDropdownBtn} onClick={handleLogout}>
          Log Out
        </button>
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
          {user.isLogin ? (
            <div className={styles.registeredUserContainer}>
              <button
                className={styles.registeredUserButton}
                onClick={() => {
                  setNavProfileDropdownOpen(!navProfileDropdownOpen);
                }}
              >
                <FaCircleUser className={styles.userDropdownProfileIcon} />
                <div className={styles.userDropdownContainer}>
                  <p className={styles.userDropdownText}>Hello, {user.name}</p>
                  <MdKeyboardArrowDown
                    className={styles.userDropdownArrowIcon}
                  />
                </div>
              </button>
              <AnimatePresence>
                {navProfileDropdownOpen && <IconDropdown />}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
              >
                {menuButtons.loginButton.title}
              </button>
              <button
                className={styles.singupButton}
                onClick={() => navigate("/signUp")}
              >
                {menuButtons.singupButton.title}
              </button>
            </>
          )}
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
