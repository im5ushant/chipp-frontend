import React, { useState } from "react";

import SearchModal from "../Modal/SearchModal";

const SearchBtn = (props) => {
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
      <SearchModal
        showModal={showModal}
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
        signup={props.signup}
      />
      <div
        className={`${props.classes}`}
        type={props.type}
        onClick={showModalHandler}
        disabled={props.disabled}
      >
        {props.children}
      </div>
    </>
  );
};

export default SearchBtn;
