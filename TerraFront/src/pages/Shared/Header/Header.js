import React from "react";
import { Outlet, Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <h1>Job Hunter</h1>
        <Link to="/login">Login </Link>
        <Link to="/register"> Register</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
