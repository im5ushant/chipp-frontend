import React, { useState } from "react";

import DonorsListModal from "./DonorsListModal";
import Contributor from "./Contributor";
import Button from "../../shared/components/UIElements/Button/Button";
import "./TopContributors.css";

const TopContributors = (props) => {
  const [showModal, setShowModal] = useState(false);

  const donorList = props.donorList;

  function sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const donorListSorted = sort_by_key(donorList, "donatedAmount");

  return (
    <>
      <DonorsListModal
        fundraiserId={props.fundraiserId}
        donorList = {donorList}
        showModal={showModal}
        onCancel={cancelModalHandler}
      ></DonorsListModal>
      <div className={`top-contributors__container ${props.classes}`}>
        <h3>Top contributors</h3>
        {!donorListSorted[0] && (
          <p style={{ fontWeight: "200", fontSize: "0.9rem" }}>
            No donations yet!
          </p>
        )}
        {donorListSorted[0] && (
          <Contributor amount={donorListSorted[0].donatedAmount}>
            {donorListSorted[0].donorName}
          </Contributor>
        )}
        {donorListSorted[1] && (
          <Contributor amount={donorListSorted[1].donatedAmount}>
            {donorListSorted[1].donorName}
          </Contributor>
        )}
        {donorListSorted[2] && (
          <Contributor amount={donorListSorted[2].donatedAmount}>
            {donorListSorted[2].donorName}
          </Contributor>
        )}
        {donorListSorted[0] && (
          <Button
            div
            classes="top-contributors__see-all-btn"
            onClick={showModalHandler}
          >
            See All
          </Button>
        )}
      </div>
    </>
  );
};

export default TopContributors;
