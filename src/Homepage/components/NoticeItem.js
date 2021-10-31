import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/UIElements/Button/Button";
import "./NoticeItem.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NoticeItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const localTime = new Date(props.date);
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date_time =
    localTime.getDate().toString() +
    " " +
    MONTHS[localTime.getMonth()] +
    ", " +
    localTime.getFullYear().toString() +
    " " +
    localTime.getHours().toString() +
    ":" +
    localTime.getMinutes().toString();

  const deleteNoticeHandler = async (event) => {
    event.preventDefault();

    if (auth.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/notice/deletenotice/${props.id}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="noticeitem__main-container">
        {isLoading && <LoadingSpinner />}
        {error && <p>Something went wrong</p>}
        <div className="noticeitem__header">
          <p className="noticeitem__location">
            <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;
            {props.city},&nbsp;{props.state}
          </p>
          <h3>{props.category}</h3>
        </div>
        <div className="noticeitem__content">
        {props.creator === auth.userId && (
            <Button
              classes="noticeitem__delete-btn"
              onClick={deleteNoticeHandler}
            >
              Delete
            </Button>
          )}
          <p className="noticecard__time-date">
            <i class="fas fa-clock"></i>&nbsp;&nbsp; {date_time}
          </p>
          <h6>
            <i class="fas fa-user"></i>&nbsp;&nbsp; {props.supplier}
          </h6>
          <p>
            <i className="fas fa-phone-alt"></i>&nbsp;&nbsp; +91 {props.phone1}
          </p>
          {props.phone2 && (
            <p>
              <i className="fas fa-phone-alt"></i>&nbsp;&nbsp; {props.phone2}
            </p>
          )}
          {/* )} */}
          {props.message && (
            <p>
              <i class="fas fa-comment"></i>&nbsp;&nbsp; {props.message}
            </p>
          )}
          
        </div>
      </div>
    </>
  );
};

export default NoticeItem;
