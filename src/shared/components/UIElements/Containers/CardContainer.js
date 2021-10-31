import React from "react";

import "./CardContainer.css";

const CardContainer = (props) => {
  return (
    <div className={`card-container__main-container ${props.classes}`}>
      <div className="card-container__card-category-heading">{props.heading}</div>
      <div className="card-container__card-container">{props.children}</div>
    </div>
  );
};

export default CardContainer;
