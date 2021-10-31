import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks1 from "./NavLinks1";
import NavLinks2 from "./NavLinks2";
import SearchBtn from "../UIElements/Button/SearchBtn";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";

const MainNavigaton = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const doNothingHandler = () => {};

  return (
    <>
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}></SideDrawer>

      <MainHeader className="main-navigation__main-header">
        <SearchBtn classes="main-navigation__mob-btn">
          <i class="fas fa-search"></i>
        </SearchBtn>
        <NavLinks1
          onClick={doNothingHandler}
          classes="main-navigation__navlinks-wide-screen"
        />
        <Link className="main-navigation__logo" to="/home">
          <img src={"/images/logo/logo_blue.svg"} />
        </Link>
        <NavLinks2
          onClick={doNothingHandler}
          classes="main-navigation__navlinks-wide-screen"
        />
        <button
          className="main-navigation__mob-btn"
          onClick={openDrawerHandler}
        >
          <i class="fas fa-bars"></i>
        </button>
      </MainHeader>
    </>
  );
};

export default MainNavigaton;
