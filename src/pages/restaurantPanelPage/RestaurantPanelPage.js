import React from "react";
import styles from "./RestaurantPanelPage.module.css";
import Navbar from "../../components/Navbar";
import { FaPlus } from "react-icons/fa6";

import foodPhoto1 from "../../images/tabak.png";
import foodPhoto2 from "../../images/makarna.png";
import foodPhoto3 from "../../images/salata.png";
import RestaurantPanelMenu from "../../components/RestaurantPanelMenu";
import { useSelector } from "react-redux";

const RestaurantPanelPage = () => {
  const restaurantData = useSelector((state) => state.restaurant);
  console.log(restaurantData.meals);
  // const dummy_data = {
  //   retaurantName: "Feast Good",
  //   restaurantTags: ["Fastfood", "Pizza", "Fry"],
  //   restaurantMenus: [
  //     {
  //       menuName: "Feast Pizza",
  //       price: 15,
  //       image: foodPhoto1,
  //       options: [
  //         {
  //           optionName: "Souce",
  //           optionIngreedients: [
  //             {
  //               optionIngreedient: "Ketçap",
  //               optionIngreedientPrice: 2,
  //             },
  //             {
  //               optionIngreedient: "Mayonez",
  //               optionIngreedientPrice: 1,
  //             },
  //           ],
  //         },
  //         {
  //           optionName: "Drink",
  //           optionIngreedients: [
  //             {
  //               optionIngreedient: "Kola",
  //               optionIngreedientPrice: 2,
  //             },
  //             {
  //               optionIngreedient: "Fanta",
  //               optionIngreedientPrice: 3,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       menuName: "Feast Pasta",
  //       price: 15,
  //       image: foodPhoto2,
  //       options: [
  //         {
  //           optionName: "Souce",
  //           optionIngreedients: [
  //             {
  //               optionIngreedient: "Pesto",
  //               optionIngreedientPrice: 2,
  //             },
  //             {
  //               optionIngreedient: "Krema",
  //               optionIngreedientPrice: 1,
  //             },
  //           ],
  //         },
  //         {
  //           optionName: "Drink",
  //           optionIngreedients: [
  //             {
  //               optionIngreedient: "Kola",
  //               optionIngreedientPrice: 2,
  //             },
  //             {
  //               optionIngreedient: "Fanta",
  //               optionIngreedientPrice: 3,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       menuName: "Feast Salat",
  //       price: 15,
  //       image: foodPhoto3,
  //       options: [
  //         {
  //           optionName: "Souce",
  //           optionIngreedients: [
  //             {
  //               optionIngreedient: "Oil",
  //               optionIngreedientPrice: 2,
  //             },
  //             {
  //               optionIngreedient: "Pomegranate Souce",
  //               optionIngreedientPrice: 1,
  //             },
  //           ],
  //         },
  //         {
  //           optionName: "Drink",
  //           optionIngreedients: [
  //             {
  //               optionIngreedient: "Kola",
  //               optionIngreedientPrice: 2,
  //             },
  //             {
  //               optionIngreedient: "Fanta",
  //               optionIngreedientPrice: 3,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // };
  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.restaurantTitle}>
          {restaurantData.restaurantName}
        </div>
        <div className={styles.menusContainer}>
          <div className={styles.buttonContainer}>
            <button className={styles.addMenuButton}>
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
