import React, { useState, useEffect } from "react";
import styles from "../style/Navbar.module.css";
import navIcon from "../images/logo-color.png";
import navIconNoBack from "../images/logo-no-background.png";
import { BsJustify } from "react-icons/bs";
import { MdKeyboardArrowDown, MdOpacity } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { restaurantLogout } from "../store/slices/restaurantSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [navProfileDropdownOpen, setNavProfileDropdownOpen] = useState(false);
  const [checkUserRole, setCheckUserRole] = useState("");
  const [menu, setMenu] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // console.log(user);
  const restaurant = useSelector((state) => state.restaurant);
  // console.log(restaurant);
  const [href, setHref] = useState(window.location.href);
  const { pathname } = window.location;

  console.log(pathname);
  useEffect(() => {
    if (user.role === "user") {
      setCheckUserRole("user");
      setMenu({
        button1: "Home",
        button2: "Restaurants",
        button3: "Orders",
        button4: "Favorite",
      });
    } else if (restaurant.role === "restaurant") {
      setCheckUserRole("restaurant");
      setMenu({
        button1: "Home",
        button2: "Menu",
        button3: "Orders",
        button4: "Profile",
      });
    } else {
      setCheckUserRole("");
      setMenu({});
    }
  }, [user, restaurant]);

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
    if (checkUserRole === "user") {
      localStorage.removeItem("adress");
      dispatch(logout());
    } else if (checkUserRole === "restaurant") {
      dispatch(restaurantLogout());
    }
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
        <div href className={styles.iconMobileContainer}>
          <img src={navIcon} alt="" className={styles.navMobilIcon} />
        </div>
        <div className={styles.mobileButtonContainer}>
          <div className={styles.mobilRegistrationContainer}>
            {user.isLogin || restaurant.isLogin ? (
              <button
                className={styles.mobilProfileBtn}
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  className={styles.mobilLoginButton}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={styles.mobilSingupButton}
                  onClick={() => navigate("/signUp")}
                >
                  SignUp
                </button>
              </>
            )}
          </div>
          <button
            className={styles.navMobileButton}
            onClick={() =>
              navigate(checkUserRole === "user" ? "/home" : "/home")
            }
          >
            {menu.button1}
          </button>
          <button
            className={styles.navMobileButton}
            onClick={() =>
              navigate(checkUserRole === "user" ? "/food" : "/restaurantPanel")
            }
          >
            {menu.button2}
          </button>
          <button
            className={styles.navMobileButton}
            onClick={() =>
              navigate(checkUserRole === "user" ? "/food" : "/orders")
            }
          >
            {menu.button3}
          </button>
          <button className={styles.navMobileButton}></button>
          {user || restaurant ? (
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
        {user.isLogin || restaurant.isLogin ? (
          <button
            className={styles.iconDropdownBtn}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        ) : null}
        {user.isLogin ? (
          <button
            className={styles.iconDropdownBtn}
            onClick={() => navigate("/favorities")}
          >
            Favorites
          </button>
        ) : null}
        <button className={styles.iconDropdownBtn}>Help</button>
        <button className={styles.iconDropdownBtn} onClick={handleLogout}>
          Log Out
        </button>
      </motion.div>
    );
  };

  return (
    <>
      {pathname !== "/login" &&
      pathname !== "/signUp" &&
      pathname !== "/restaurantLogin" &&
      pathname !== "/restaurantSignUp" &&
      pathname !== "/forgotPassword" &&
      pathname !== "/changePassword" &&
      pathname !== "/restaurantForgotPassword" &&
      pathname !== "/restaurantChangePassword" &&
      pathname !== "/purchaseAccepted" ? (
        <header className={styles.headerContainer}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.navButton}
              onClick={() =>
                navigate(checkUserRole === "user" ? "/home" : "/home")
              }
            >
              {menu.button1}
            </button>
            <button
              className={styles.navButton}
              onClick={() =>
                navigate(
                  checkUserRole === "user" ? "/food" : "/restaurantPanel"
                )
              }
            >
              {menu.button2}
            </button>
            <a  href="/home" className={styles.iconContainer}>
              <img src={navIconNoBack} alt="" className={styles.navIcon} />
            </a>
            <button
              className={styles.navButton}
              onClick={() =>
                navigate(checkUserRole === "user" ? "/orders" : "/orders")
              }
            >
              {menu.button3}
            </button>
            <button
              className={styles.navButton}
              onClick={() =>
                navigate(checkUserRole === "user" ? "/favorities" : "/profile")
              }
            >
              {menu.button4}
            </button>
            <div className={styles.registrationContainer}>
              {user.isLogin || restaurant.isLogin ? (
                <div className={styles.registeredUserContainer}>
                  <button
                    className={styles.registeredUserButton}
                    onClick={() => {
                      setNavProfileDropdownOpen(!navProfileDropdownOpen);
                    }}
                  >
                    <FaCircleUser className={styles.userDropdownProfileIcon} />
                    <div className={styles.userDropdownContainer}>
                      {checkUserRole === "user" ? (
                        <p className={styles.userDropdownText}>
                          Hello, {user.name}
                        </p>
                      ) : (
                        <p className={styles.userDropdownText}>
                          Hello, {restaurant.restaurantName}
                        </p>
                      )}

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
                    Login
                  </button>
                  <button
                    className={styles.singupButton}
                    onClick={() => navigate("/signUp")}
                  >
                    SignUp
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
