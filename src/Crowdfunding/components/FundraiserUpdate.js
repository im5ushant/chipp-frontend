import React from "react";

import Container from "../../shared/components/UIElements/Containers/Container";
import "./FundraiserUpdate.css";

const FundraiserUpdate = (props) => {
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

  return (
    <>
      <Container
        classSuffix="hover"
        classes="fundraiser-update__update-container"
      >
        <div className="fundraiser-update__date"><i>{date_time}</i></div>
        <div className="fundraiser-update__content">{props.content}</div>
      </Container>
    </>
  );
};

export default FundraiserUpdate;
