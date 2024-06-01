import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import styles from "./HomePage.module.css";
import tabak from "../../images/tabak.png";
import salata from "../../images/salata.png";
import makarna from "../../images/makarna.png";
import HomeEntry from "./HomeEntry";
import HomeSlier from "./HomeSlier";
import HomeGrid from "./HomeGrid";
import Footer from "../../components/Footer";
import CookieConsent from "../../components/CookieConsent"; // CookieConsent bileşenini ekleyin

const HomePage = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookieConsent(false);
  };
  const handleDeclineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowCookieConsent(false);
  };
  return (
    <div>
      {showCookieConsent && <CookieConsent onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />}
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
