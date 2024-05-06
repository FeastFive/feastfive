import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./RestaurantPanelPage.module.css";
import Navbar from "../../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import RestaurantPanelMenu from "../../components/RestaurantPanelMenu";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getKitchen } from "../../utils/kitchen/getKitchen";
import { updateLabel } from "../../utils/restaurant/updateLabel";
import { ShowAlert } from "../../components/alert/ShowAlert";

const RestaurantPanelPage = () => {
  const restaurantData = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  // console.log(restaurantData.meals);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const handleKitchen = async () => {
      try {
        const response = await getKitchen();

        if (response.status === 200) {
          const result = await response.json();
          // console.log(result.kitchens[0].image);
          setCategories(result.kitchens);
        } else if (response.status === 403) {
          ShowAlert(3, "An error occurred while fetching kitchens");
        } else {
          ShowAlert(3, "An error occurred while fetching kitchens");
        }
      } catch (error) {
        console.error("Error:", error);
        ShowAlert(3, "An error occurred while fetching kitchens");
      }
    };
    handleKitchen();
  }, []);
  const options = categories
    ? categories.map((category) => ({
        value: category.name,
        label: category.name,
      }))
    : [];
  // State to store selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle select change
  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    dispatch({ type: "SET_SELECTED_OPTIONS", payload: selectedOptions }); // Dispatch action to update Redux store
  };

  const handleLabelSave = async () => {
    try {
      const obj = {
        id: restaurantData.id,
        labels: selectedOptions,
      };
      const response = await updateLabel(obj);
      if (response.status == 200) {
        const result = await response.json();
        ShowAlert(1, "Saved succesfully");
      } else if (response.status == 404) {
        ShowAlert(3, "An error occurred while fetching labels");
      } else {
        ShowAlert(3, "An error occurred while fetching labels");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while saving labels");
    }
  };

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
            <button
              className={styles.saveLableButton}
              onClick={handleLabelSave}
            >
              Save
            </button>
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
