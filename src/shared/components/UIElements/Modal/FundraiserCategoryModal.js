import React, { useState } from "react";
import { useHttpClient } from "../../../hooks/http-hook";

import LoadingSpinner from "../LoadingSpinner";
import Modal from "./Modal";

import "./FundraiserCategoryModal.css";

const FundraiserCategoryModal = (props) => {

  const categorySubmitHandler = (category) => {
    props.onSubmit(category);
  }

  return (
    <>
      <Modal
        show={props.showModal}
        onCancel={props.onCancel}
        className="fundraiser-category-modal__main-container"
        header={
          <>
            <div className="fundraiser-category-modal__header">Categories</div>
          </>
        }
      >
        <div className="fundraiser-category-modal__category-container">
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Medical")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/1w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Medical</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Memorial")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/2w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Memorial</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Emergency")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/3w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Emergency</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Nonprofit")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/4w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Nonprofit</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Education")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/5w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Education</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Animals")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/6w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Animals</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Environment")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/7w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Environment</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Business")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/8w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Business</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Community")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/9w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Community</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Competition")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/10w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Competition</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Creative")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/11w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Creative</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Event")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/12w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Event</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Faith")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/13w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Faith</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Family")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/14w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Family</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Sports")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/15w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Sports</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Travel")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/16w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Travel</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Volunteer")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/17w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Volunteer</div>
          </div>
          <div className="fundraiser-category-modal__category" onClick={() => categorySubmitHandler("Wishes")}>
            <div className="fundraiser-category-modal__icon">
              <img src={"/images/icons/18w.svg"} />
            </div>
            <div className="fundraiser-category-modal__name">Wishes</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FundraiserCategoryModal;
