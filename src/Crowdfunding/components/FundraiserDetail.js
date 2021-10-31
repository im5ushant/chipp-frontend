import React from "react";

import DonateCard from "./DonateCard";
import "./FundraiserDetail.css";

const FundraiserDetail = (props) => {
  const localTime = new Date(props.fundraiserInfo.created_at);

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

  const creationDate =
    localTime.getDate().toString() +
    " " +
    MONTHS[localTime.getMonth()] +
    ", " +
    localTime.getFullYear().toString();

  return (
    <>
      <div className="fundraiser-detail__image">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${props.fundraiserInfo.cover}`}
          alt="Can't be loaded"
        />
      </div>
      <div className="fundraiser-detail__donate-card-res">
        <DonateCard fundraiserInfo={props.fundraiserInfo} />
      </div>
      <div className="fundraiser-detail__organiser">
        Organized by {props.fundraiserInfo.creatorName}
      </div>
      <div className="fundraiser-detail__date-category">
        <div className="fundraiser-detail__date">Started {creationDate}</div>
        <div className="fundraiser-detail__category">
          <i class="fas fa-tag"></i>&nbsp;&nbsp;{props.fundraiserInfo.category}
        </div>
      </div>
      <div className="fundraiser-detail__document-container">
        {props.fundraiserInfo.documents.map((doc) => (
          <>
            <div className="fundraiser-detail__document">
              <img src={`${process.env.REACT_APP_BACKEND_URL}/${doc}`} alt="Can't be loaded" />
            </div>
          </>
        ))}
      </div>
      <div className="fundraiser-detail__brief">
        {props.fundraiserInfo.description}
      </div>
    </>
  );
};

export default FundraiserDetail;
