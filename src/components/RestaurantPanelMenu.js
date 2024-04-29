import React from "react";
import styles from "../style/RestaurantPanelMenu.module.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const RestaurantPanelMenu = (props) => {
  const menu = props.item; // Fixed here
  return (
    <li className={styles.menuListItems} key={menu.menuName}>
      <img src={menu.image} alt="" className={styles.menuImage} />
      <div className={styles.liMenuName}>
        <div>{menu.menuName}</div>
        <div className={styles.price}>
          {menu.price}
          <span>$</span>
        </div>
      </div>
      <div className={styles.liButtonContainer}>
        <button className={styles.editButton}>
          <FaRegEdit />
          Edit
        </button>
        <button className={styles.deleteButton}>
          <MdDelete />
          Delete
        </button>
      </div>
    </li>
  );
};

export default RestaurantPanelMenu;
