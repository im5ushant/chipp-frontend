import React from "react";

import "./PricingCard.css";

const PricingCard = (props) => {
  return (
    <div className="pricing-card__main-container">
      <div className="pricing-card__heading">
        <h3>{props.heading}</h3>
        <h1>{props.percentage}</h1>
        <p>Chipp Fee</p>
      </div>
      <div className="pricing-card__container">{props.children}</div>
    </div>
  );
};

export default PricingCard;
