import React from "react";

import "./GoBackBtn.css";

const GoBackBtn = (props) => {
  if (props.text) {
    return (
      <div
        className={`go-back-btn go-back-btn-text ${props.classes}`}
        onClick={props.onClick}
      >
        <i class="fas fa-arrow-left"></i> Go Back
      </div>
    );
  }

  return (
    <div className={`go-back-btn ${props.classes}`} onClick={props.onClick}>
      <i class="fas fa-arrow-left"></i>
    </div>
  );
};

export default GoBackBtn;
