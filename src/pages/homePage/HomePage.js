import React from "react";
import Navbar from "../../components/Navbar";
import styles from "./HomePage.module.css";
import tabak from "../../images/tabak.png";
import salata from "../../images/salata.png";
import makarna from "../../images/makarna.png";
import HomeEntry from "./HomeEntry";
import HomeSlier from "./HomeSlier";
import HomeGrid from "./HomeGrid";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <div>
      <div className="pb-24 overflow-x-hidden">
        <HomeEntry></HomeEntry>

        <div className="px-12 sm:px-24">
          <HomeSlier></HomeSlier>
          <h1 className="text-3xl font-semibold text-[#db3748] pt-12">
            Popular Restaurants
          </h1>

          <HomeGrid></HomeGrid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
