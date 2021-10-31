import React, { useState } from "react";

import ProfilePicModal from "../../shared/components/UIElements/Modal/ProfilePicModal";
import "./ProfilePic.css";

const ProfilePic = (props) => {
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
      <ProfilePicModal
        showModal={showModal}
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
        signup={props.signup}
      ></ProfilePicModal>
      <div
        className={`profile-pic__main-container ${props.classes}`}
        type={props.type}
        onClick={showModalHandler}
        disabled={props.disabled}
      >
          {props.children}
        <div className="profile-pic__add-icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </>
  );
};

export default ProfilePic;
