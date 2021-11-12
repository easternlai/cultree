import React, { Fragment } from "react";
import NavBar from "../components/NavBar/NavBar";
import Header from "../components/Header/Header";

const LayoutFlat = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <NavBar />
      {children}
    </div>
  );
};

export default LayoutFlat;
