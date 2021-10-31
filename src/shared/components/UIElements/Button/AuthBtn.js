import React, { useState } from "react";

import AuthModal from "../Modal/AuthModal";
import "./AuthBtn.css";

const AuthBtn = (props) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const confirmModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <AuthModal
        showModal={showModal}
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
        signup={props.signup}
      ></AuthModal>
      <div
        className={`auth-btn__button ${props.classes}`}
        type={props.type}
        onClick={showModalHandler}
        disabled={props.disabled}
      >
        {props.children}
      </div>
    </>
  );
};

export default AuthBtn;
