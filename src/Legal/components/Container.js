import React from "react";
import "./Container.css";

const Container = (props) => {
  return (
    <div className="legal-container__main-container">
      <div className="legal-container__header-container">
        <div className="legal-container__header">
          <h2>{props.heading}</h2>
        </div>
      </div>
      <div className={`legal-container__content ${props.classes}`}>{props.children}</div>
    </div>
  );
};

export default Container;
