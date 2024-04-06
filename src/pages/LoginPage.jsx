// MyComponent.js

import React from "react";
import Navbar from "../components/Navbar";
import styles from "../style/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div>
      <Navbar />

      <h1 className={styles.container}>Hello, World!</h1>
      <p>This is my new React component.</p>
    </div>
  );
};

export default LoginPage;
