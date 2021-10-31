import React, { useContext} from "react";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
// import { useHttpClient } from "../../shared/hooks/http-hook";

// import Button from '../../shared/components/UIElements/Button/Button';

import "./NoticeCard.css";

const NoticeItem = (props) => {
  const auth = useContext(AuthContext);
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  // const deleteNoticeHandler = async (event) => {
  //   event.preventDefault();

  //   if (auth.isLoggedIn) {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5000/api/notice/deletenotice/${props.id}`,
  //         "DELETE",
  //         null,
  //         {
  //           Authorization: "Bearer " + auth.token,
  //         }
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <>
      <div className="noticecard__main-container">
        {/* {error && <p>Something went wrong!</p>}
        {isLoading && <LoadingSpinner />} */}
        <div className="noticecard__heading">
          <p className="noticecard__location">
            <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;
            {props.city},&nbsp;{props.state}
          </p>
          <h3>{props.category}</h3>
        </div>
        <div className="noticecard__content">
          <p className="noticecard__time-date">
            <i class="fas fa-clock">&nbsp;&nbsp;</i>{date_time}
          </p>
          <h6><i class="fas fa-user"></i>&nbsp;&nbsp; {props.supplier}</h6>
          <p>
            <i className="fas fa-phone-alt"></i>&nbsp;&nbsp; +91 {props.phone1}
          </p>
          {props.phone2 && <p>
            <i className="fas fa-phone-alt"></i>&nbsp;&nbsp; +91 {props.phone2}
          </p>}
          {props.message && <p><i class="fas fa-comment"></i>&nbsp;&nbsp; {props.message} </p>}
          {/* {props.creator === auth.userId && <Button classes="noticecard__delete-btn" onClick={deleteNoticeHandler}>Delete</Button>} */}
        </div>
      </div>
    </>
  );
};

export default NoticeItem;
