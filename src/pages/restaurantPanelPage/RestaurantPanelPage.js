import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./RestaurantPanelPage.module.css";
import Navbar from "../../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import RestaurantPanelMenu from "../../components/RestaurantPanelMenu";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const RestaurantPanelPage = () => {
  const restaurantData = useSelector((state) => state.restaurant);
  console.log(restaurantData.meals);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const options = [
    { value: "Pasta", label: "Pasta" },
    { value: "Meat", label: "Meat" },
    { value: "Chicken", label: "Chicken" },
    { value: "Pizza", label: "Pizza" },
    { value: "Kebap", label: "Kebap" },
    { value: "Salad", label: "Salad" },
    { value: "Burger", label: "Burger" },
    { value: "Sushi", label: "Sushi" },
    { value: "Homemade", label: "Homemade" },
    { value: "Vegan", label: "Vegan" },
    { value: "Desert", label: "Desert" },
    { value: "Sandwich", label: "Sandwich" },
    { value: "Drinks", label: "Drinks" },
  ];
  const dispatch = useDispatch();

  // State to store selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle select change
  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    dispatch({ type: "SET_SELECTED_OPTIONS", payload: selectedOptions }); // Dispatch action to update Redux store
  };

  console.log(selectedOptions);

  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.headCont}>
          <div className={styles.addLabelDiv}>Add Label</div>
          <div className={styles.labelContainer}>
            {/* {restaurantData.restaurantName} */}
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
              onChange={handleSelectChange}
              value={selectedOptions}
              className={styles.multiSelect}
            />
            <button className={styles.saveLableButton}>Save</button>
          </div>
        </div>
        <div className={styles.menusContainer}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.addMenuButton}
              onClick={() => {
                navigate("/menu");
              }}
            >
              <FaPlus />
              <div>Add Menu</div>
            </button>
          </div>
          <ul className={styles.listContainer}>
            {/* Menus */}
            {restaurantData.meals.map((meals) => (
              <RestaurantPanelMenu item={meals} key={meals.name} />
            ))}
            {/* Menu Ends */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPanelPage;
