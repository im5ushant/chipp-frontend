import React from "react";

import "./DonorSection.css";

const DonorSection = (props) => {
  return (
    <>
      <div className="donor-section__main-container">
        <div className="donor-section__header-container">
          <h2>Fundraisers</h2>
        </div>
        <div className="donor-section__container">
          {/* <div className="donor-section__content">Content</div>
          <div className="donor-section__image">Image</div> */}
          <p className="donor-section__temporary-text">
            COMING SOON
          </p>
        </div>
      </div>
    </>
  );
};

export default DonorSection;
