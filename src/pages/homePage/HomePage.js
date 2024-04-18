import React from "react";
import Navbar from "../../components/Navbar";
import styles from "./HomePage.module.css";
import tabak from "../../images/tabak.png";
import salata from "../../images/salata.png";
import makarna from "../../images/makarna.png";
import HomeEntry from "./HomeEntry";
import HomeSlier from "./HomeSlier";

const HomePage = () => {
  return (
    <div className="pb-24">
      <Navbar />
      <HomeEntry></HomeEntry>
      <HomeSlier></HomeSlier>
    </div>
  );
};

export default HomePage;
