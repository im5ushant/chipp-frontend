import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import AuthBtn from "../UIElements/Button/AuthBtn";
import SearchBtn from "../UIElements/Button/SearchBtn";

const NavLinks2 = (props) => {
  const auth = useContext(AuthContext);

  const logOutHandler = () => {
    auth.logout();
    props.onClick();
  };

  return (
    <ul className={`nav-links ${props.classes}`}>
      <li className="nav-links__btn search-btn">
        <SearchBtn>
          <i class="fas fa-search"></i>&nbsp;&nbsp;Search
        </SearchBtn>
      </li>
      {!auth.isLoggedIn && (
        <>
          <li onClick={props.onClick} className="nav-links__auth-btn">
            <AuthBtn classes="nav-links__btn sign-in">Sign In</AuthBtn>
          </li>
          <li onClick={props.onClick} className="nav-links__auth-btn">
            <AuthBtn signup classes="nav-links__signup-btn">
              Sign Up
            </AuthBtn>
          </li>
        </>
      )}
      {auth.isLoggedIn && (
        <>
          <li className="nav-links__profile-btn-container">
            <NavLink to="/user/dashboard" exact>
              <div className="nav-links__profile-btn">
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                    borderRadius: "100px",
                  }}
                  src={"/images/avatar.jpg"}
                  alt="Profile Pic"
                />
              </div>
            </NavLink>
          </li>

          <li onClick={props.onClick} className="nav-links__profile-btn-mob">
            <NavLink to="/user/dashboard" exact>
              Dashboard
            </NavLink>
          </li>
          <li onClick={logOutHandler} className="nav-links__logout-btn">
            <AuthBtn>Logout</AuthBtn>
          </li>
        </>
      )}
      {/* <li>
        <button>LOGOUT</button>
      </li> */}
    </ul>
  );
};

export default NavLinks2;
