import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import ProfilePic from "./ProfilePic";
import MenuItem from "./MenuItem";
import "./Sidebar.css";

const Sidebar = (props) => {
  const auth = useContext(AuthContext);

  const [currItem, setItem] = useState("");

  const history = useHistory();

  const logOutHandler = () => {
    auth.logout();
    history.push("/");
    window.location.reload();
  };

  const menuItemHandler = (item) => {
    setItem(item);
    props.onClick(item);
  };

  return (
    <div className={`sidebar__main-container ${props.classes}`}>
      <div className="sidebar__user-info">
        <ProfilePic>
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
        </ProfilePic>
        <div className="user-name">
          <strong>{props.userInfo.user.name}</strong>
        </div>
      </div>
      <div className="sidebar__menu-container">
        <div className="sidebar__heading">DASHBOARD</div>
        <div className="sidebar__menu">
          <MenuItem
            classes={currItem === "kyc" ? "active" : ""}
            itemname="Verify KYC"
            onClick={() => menuItemHandler("kyc")}
          />
          <MenuItem
            classes={currItem === "fundraisers" ? "active" : ""}
            itemname="My Fundraisers"
            onClick={() => menuItemHandler("fundraisers")}
          />
          <MenuItem
            classes={currItem === "donations" ? "active" : ""}
            itemname="My Donations"
            onClick={() => menuItemHandler("donations")}
          />
          <MenuItem
            classes={currItem === "profile" ? "active" : ""}
            itemname="Profile Details"
            onClick={() => menuItemHandler("profile")}
          />
          <MenuItem
            classes={currItem === "password" ? "active" : ""}
            itemname="Change Password"
            onClick={() => menuItemHandler("password")}
          />
          <MenuItem itemname="Logout" onClick={logOutHandler} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
