import React from "react";
import styles from "../style/RestaurantPanelMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { deleteMeal } from "../utils/meal/deteleMeal";
import { ShowAlert } from "./alert/ShowAlert";
import { setMeal } from "../store/slices/restaurantSlice";
import { useNavigate } from "react-router-dom";

const RestaurantPanelMenu = (props) => {
  const restaurantData = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = props.item;

  const handleDelete = async () => {
    try {
      const obj = {
        id: restaurantData.id,
        mealId: menu.id,
      };
      const response = await deleteMeal(obj);
      if (response.status == 200) {
        const result = await response.json();
        dispatch(setMeal({ meals: result.meals }));
        ShowAlert(1, "Deleted succesfully");
      } else if (response.status == 404) {
        ShowAlert(3, "An error occurred while deleting meal");
      } else {
        ShowAlert(3, "An error occurred while deleting meal");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while deleting meal");
    }
  };

  const handleEdit = () => {
    navigate(`/updateMenu/${menu.id}`);
  };

  return (
    <li className={styles.menuListItems} key={menu.menuName}>
      <img src={menu.image} alt="" className={styles.menuImage} />
      <div className={styles.liMenuName}>
        <div className={styles.divManuName}>{menu.name}</div>
        <div className={styles.price}>
          {menu.price}
          <span>$</span>
        </div>
      </div>
      <div className={styles.liButtonContainer}>
        <button className={styles.editButton} onClick={handleEdit}>
          <FaRegEdit />
          Edit
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <MdDelete />
          Delete
        </button>
      </div>
    </li>
  );
};

export default RestaurantPanelMenu;
