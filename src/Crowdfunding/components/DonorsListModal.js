import React from "react";

import Contributor from "./Contributor";
import ChippBtn from "../../shared/components/UIElements/Button/ChippBtn";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import "./DonorListModal.css";

const DonorsListModal = (props) => {
  function sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  const recentDonors = sort_by_key(props.donorList, "id");
  // console.log(recentDonors);

  return (
    <Modal
      className="donor-list-modal__main-container"
      onCancel={props.onCancel}
      header={
        <>
          <h4 className="donor-list-modal__heading">Join the list?</h4>
          <ChippBtn classes="donors-list-modal__chipp-btn" fundraiserId={props.fundraiserId}>Chipp Now</ChippBtn>
        </>
      }
      headerClass="donor-list-modal__header"
      footerClass="donor-list-modal__footer"
      show={props.showModal}
      footer={null}
    >
      {recentDonors.map((donor) => (
        <Contributor amount={donor.donatedAmount}>
          {donor.donorName}
        </Contributor>
      ))}
    </Modal>
  );
};

export default DonorsListModal;
