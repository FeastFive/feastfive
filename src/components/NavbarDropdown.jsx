import React from "react";
import styles from "../style/NavbarDropdownComponent.module.css";

const NavbarDropdown = () => {
  return (
    <div>
      <ul className={styles.ulDropdown}>
        <li className={styles.liDropdown}>Button1</li>
        <li className={styles.liDropdown}>Button2</li>
        <li className={styles.liDropdown}>Button3</li>
        <li className={styles.liDropdown}>Button4</li>
      </ul>
    </div>
  );
};

export default NavbarDropdown;
