import React from "react";

import ChippBtn from "../../shared/components/UIElements/Button/ChippBtn";
import Button from "../../shared/components/UIElements/Button/Button";
import TopContributors from "./TopContributors";
import "./DonateCard.css";

const DonateCard = (props) => {
  let donorCount = props.fundraiserInfo.donors.length;
  let shares;
  if (donorCount >= 10000) {
    donorCount = (donorCount / 1000).toFixed(1).toString() + "k";
  }

  const loaderPercentage =
    (Number(props.fundraiserInfo.collectionAmt) /
      Number(props.fundraiserInfo.amount)) *
      100 >
    100
      ? 100
      : (Number(props.fundraiserInfo.collectionAmt) /
          Number(props.fundraiserInfo.amount)) *
        100;

  return (
    <>
      <div className="donatecard__container">
        <div className="donatecard__amount">
          <div className="donatecard__amount-raised">
            <span>
              <i class="fas fa-rupee-sign"></i>{" "}
              {props.fundraiserInfo.collectionAmt} Chipped{" "}
            </span>{" "}
            of <i class="fas fa-rupee-sign"></i> {props.fundraiserInfo.amount}
          </div>
          <div className="donatecard__progress-bar">
            <div
              className="donatecard__raised-progress-bar"
              style={{ width: `${loaderPercentage}%` }}
            ></div>
          </div>
          <div className="donatecard__donors-shares">
            <div>
              <strong>{donorCount}</strong> donors
            </div>
            <div>
              <strong>2.4k</strong> shares
            </div>
          </div>
        </div>
        <div className="donatecard__btn-container">
          <ChippBtn
            fundraiserId={props.fundraiserInfo.id}
            classes="donatecard__button"
          >
            Chipp Now
          </ChippBtn>
          <Button div classes="donatecard__button">
            Spread The Word
          </Button>
        </div>
        <TopContributors
          fundraiserId={props.fundraiserInfo.id}
          donorList={props.fundraiserInfo.donors}
          classes="donatecard__top-contributors"
        />
      </div>
    </>
  );
};

export default DonateCard;
