import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import AuthModal from "../UIElements/Modal/AuthModal";
import "./NavLinks.css";

const NavLinks1 = (props) => {
  const auth = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const confirmModalHandler = () => {
    setShowModal(false);
    // console.log("Logging In...");
  };

  return (
    <>
      <AuthModal
        showModal={showModal}
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
      ></AuthModal>
      <ul className={`nav-links ${props.classes}`}>
        <li onClick={props.onClick}>
          <NavLink to="/crowdfunding/fundraisers" exact>
            Discover
          </NavLink>
        </li>
        {auth.isLoggedIn && (
            <li onClick={props.onClick}>
              <NavLink to="/create" exact>
                Create
              </NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <a onClick={showModalHandler}>Create</a>
          </li>
        )}
        <li onClick={props.onClick}>
          <NavLink to="/notices" exact>
            Resources
          </NavLink>
        </li>
        
      </ul>
    </>
  );
};

export default NavLinks1;
