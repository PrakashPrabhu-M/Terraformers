import React from "react";

import Header from "../Header/Header";

// import styles from "./Layout.module.css";

const Layout = ({ Component, props }) => {
  return (
    <>
      <Header />
      <Component {...props} />
    </>
  );
};

export default Layout;
