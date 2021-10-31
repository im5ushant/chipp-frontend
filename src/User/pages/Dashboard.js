import React, { useState, useEffect, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import GoBackBtn from "../../shared/components/UIElements/Button/GoBackBtn";
import DonationsContent from "../components/DonationsContent";
import FundraiserContent from "../components/FundraisersContent";
import ProfileDetails from "../components/ProfileDetails";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import ChangePassword from "../components/ChangePassword";
import VerifyKYC from "../components/VerifyKYC";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userInfo, setUserInfo] = useState();
  const [sidebarStatus, setSidebarStatus] = useState(true);
  const [currItem, setCurrItem] = useState("");

  const contentHandler = (menuItem) => {
    setCurrItem(menuItem);
    setSidebarStatus(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/api/user/${auth.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setUserInfo(responseData);
      } catch (err) {}
    };
    fetchUserInfo();
  }, [sendRequest, auth.userId]);

  return (
    <>
      {userInfo && (
        <div className="dashboard__body">
          <div className="dashboard__main-container">
            <Sidebar
              userInfo={userInfo}
              classes={
                sidebarStatus
                  ? "dashboard__sidebar-container"
                  : "dashboard__sidebar-container dashboard-hide"
              }
              onClick={contentHandler}
            />
            <div
              className={
                !sidebarStatus
                  ? "dashboard__content-container"
                  : "dashboard__content-container dashboard-hide"
              }
            >
              <GoBackBtn
                classes="dashboard__go-back-btn"
                onClick={() => setSidebarStatus(true)}
              />
              {currItem === "kyc" && (
                <VerifyKYC userInfo={userInfo} userId={auth.userId} />
              )}
              {currItem === "fundraisers" && (
                <FundraiserContent userInfo={userInfo} userId={auth.userId} />
              )}
              {currItem === "donations" && (
                <DonationsContent userInfo={userInfo} userId={auth.userId} />
              )}
              {currItem === "profile" && (
                <ProfileDetails userInfo={userInfo} userId={auth.userId} />
              )}
              {currItem === "password" && (
                <ChangePassword
                  userInfo={userInfo}
                  userId={auth.userId}
                  isLoggedIn={auth.isLoggedIn}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
