import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {Link} from 'react-router-dom';

import PaymentModal from "../Modal/PaymentModal";
import AuthModal from "../Modal/AuthModal";
import "./ChippBtn.css";

const ChippBtn = (props) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const confirmModalHandler = () => {
    setShowModal(false);
    // console.log("Logging In...");
  };

  return (
    <>
      {/* <AuthModal
        showModal={showModal}
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
      ></AuthModal> */}

      <Link to={`/fundraiser/${props.fundraiserId}/donate`}>
        <div
          className={`button chipp-btn__main ${props.classes}`}
          type={props.type}
          // onClick={showModalHandler}
          disabled={props.disabled}
        >
          {props.children}
        </div>
      </Link>
    </>
  );
};

export default ChippBtn;
