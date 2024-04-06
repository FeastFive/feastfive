import React, { useState } from "react";
import NavbarDropdown from "./NavbarDropdown";
import styles from "../style/NavbarComponent.module.css";
import navIcon from "../images/logo-color.png";
import { BsJustify } from "react-icons/bs";

const Navbar = () => {
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.navButton}>Button1</button>
        <button className={styles.navButton}>Button2</button>
        <div className={styles.iconContainer}>
          <img src={navIcon} alt="" className={styles.navIcon} />
        </div>
        <button className={styles.navButton}>Button3</button>
        <button className={styles.navButton}>Button4</button>
        <div className={styles.responsiveDropdown}>
          <BsJustify
            className={styles.dropdownIcon}
            onClick={() => setNavDropdownOpen(!navDropdownOpen)}
          />
          {navDropdownOpen && <NavbarDropdown />}
        </div>
      </div>
      {/* <div className={styles.responsiveContainer}>responsiveIcon</div> */}
    </header>
  );
};

export default Navbar;
