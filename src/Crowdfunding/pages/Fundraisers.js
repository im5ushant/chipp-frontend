import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import CardContainer from "../../shared/components/UIElements/Containers/CardContainer";
import Card from "../../shared/components/UIElements/Card/Card";
import FundraisersList from "../components/FundraisersList";
import FundraiserCategoryModal from "../../shared/components/UIElements/Modal/FundraiserCategoryModal";
import FundraiserFilterModal from '../../shared/components/UIElements/Modal/FundraiserFilterModal';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./Fundraisers.css";

const Fundraisers = () => {
  const [loadedFundraisers, setLoadedFundraisers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [notFound, setNotFound] = useState(false);

  const showFilterModalHandler = () => {
    setShowFilterModal(true);
  };
  const cancelFilterModalHandler = () => {
    setShowFilterModal(false);
  };
  const confirmFilterModalHandler = () => {
    setShowFilterModal(false);
  };



  const showCategoryModalHandler = () => {
    setShowCategoryModal(true);
  };

  const cancelCategoryModalHandler = () => {
    setShowCategoryModal(false);
  };

  const confirmCategoryHandler = async (category) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/fundraisers/${category}`
      );
      setNotFound(false);
      setLoadedFundraisers(responseData.fundraisers);
    } catch (err) {
      if (err.message === "No fundraisers found") {
        setNotFound(true);
      }
    }
  };

  

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/fundraisers`
        );
        setLoadedFundraisers(responseData.fundraisers);
      } catch (err) {}
    };
    fetchFundraisers();
  }, [sendRequest]);

  return (
    <>
      <FundraiserCategoryModal
        showModal={showCategoryModal}
        onCancel={cancelCategoryModalHandler}
        onSubmit={confirmCategoryHandler}
      />
      <FundraiserFilterModal 
        showModal={showFilterModal}
        onCancel={cancelFilterModalHandler}
        onSubmit={confirmFilterModalHandler}
      />
      {isLoading && <LoadingSpinner asOverlay />}
        <div className="fundraisers">
          <div className="fundraisers__heading-container">
            <div className="fundraisers__subheading">
              <h2>Discover Fundraisers</h2>
            </div>
          </div>
          <div className="fundraisers__container">
            <div className="fundraisers__filter">
              <div
                className="fundraisers__filter-btn category"
                onClick={showCategoryModalHandler}
              >
                <i class="fas fa-stream"></i>&nbsp;&nbsp;Category
              </div>
              <div className="fundraisers__filter-btn" onClick={showFilterModalHandler}>
                <i class="fas fa-filter"></i>&nbsp;&nbsp;Filter
              </div>
            </div>
            <CardContainer heading={ selectedCategory !== null ? selectedCategory : null}>
              {notFound && (
                <div className="fundraisers__not-found">
                  No Fundraisers Found!
                </div>
              )}
              {!isLoading && !notFound && loadedFundraisers && (
                <FundraisersList items={loadedFundraisers} />
              )}
            </CardContainer>
          </div>
        </div>
    </>
  );
};

export default Fundraisers;
