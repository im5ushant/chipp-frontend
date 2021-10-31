import React from "react";
import ReactDOM from "react-dom";

import NavLinks1 from "../NavBar/NavLinks1";
import NavLinks2 from "../NavBar/NavLinks2";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <div
      className={
        props.show ? "side-drawer__container" : "side-drawer__container hide"
      }
      onClick={props.onClick}
    >
      <div
        className={props.show ? "side-drawer" : "side-drawer hide"}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="side-drawer__drawer-nav">
          <div className="side-drawer__close-btn-container">
            <i onClick={props.onClick} class="fas fa-times"></i>
          </div>
          <div className="side-drawer__header">Menu</div>
          <NavLinks1 onClick={props.onClick} classes="side-drawer__navlinks1" />
          <NavLinks2 onClick={props.onClick} classes="side-drawer__navlinks2" />
        </nav>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
