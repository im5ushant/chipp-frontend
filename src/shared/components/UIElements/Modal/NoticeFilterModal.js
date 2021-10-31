import React, { useState } from "react";
import { useHttpClient } from "../../../hooks/http-hook";
import { states, cities, categories } from "../../../util/notice-details";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button/Button";
import Modal from "./Modal";

import "./NoticeFilterModal.css";

const NoticeFilterModal = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [selectedState, setSelectedState] = useState(null);
  const [loadedState, setLoadedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const stateChangeHandler = (event, value) => {
    if(value === null){
      setLoadedState(null);
      setSelectedCity(null);
      setSelectedState(null);
    }
    else if (value.state === "Uttar Pradesh") {
      setSelectedState(value.state);
      setSelectedCity(null);
      setLoadedState(null);
      setLoadedState(cities.uttar_pradesh);
      // console.log(value.state);
    }
    else if (value.state === "Delhi") {
      setSelectedState(value.state);
      setSelectedCity(null);
      setLoadedState(null);
      setLoadedState(cities.delhi);
    }

    else if (value.state === "Haryana") {
      setSelectedState(value.state);
      setSelectedCity(null);
      setLoadedState(null);
      setLoadedState(cities.haryana);
    }

    else if (value.state === "Rajasthan") {
      setSelectedState(value.state);
      setSelectedCity(null);
      setLoadedState(null);
      setLoadedState(cities.rajasthan);
    }
  };

  const cityChangeHandler = (event, value) => {
    if (value === null) {
      setSelectedCity(null);
    } else {
      setSelectedCity(value.city);
    }
  };

  const categoryChangeHandler = (event, value) => {
    if (value === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value.category);
    }
  };

  const submitFilterHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/api/notice/filternotice?state=${selectedState}&city=${selectedCity}&category=${selectedCategory}`,
        "GET"
      );
      props.filterResponse(responseData);
      setSelectedState(null);
      setLoadedState(null);
      setSelectedCity(null);
      setSelectedCategory(null);
      props.onConfirm();
    } catch (err) {
      setSelectedState(null);
      setLoadedState(null);
      setSelectedCity(null);
      setSelectedCategory(null);
      console.log(err);
    }
  };

  console.log(error);

  return (
    <>
      <Modal
        show={props.showModal}
        onCancel={props.onCancel}
        className="notice-filter-modal__main-container"
        header={
          <>
            <div className="notice-filter-modal__header">Filter Notices</div>
          </>
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p className="notice-filter-modal__error">{error}</p>}
        <form onSubmit={submitFilterHandler}>
          <Autocomplete
            id="state"
            options={states}
            getOptionLabel={(option) => option.state}
            style={{ width: "90%", margin: "0.5rem auto" }}
            onChange={stateChangeHandler}
            renderInput={(params) => (
              <TextField {...params} label="State" variant="outlined" />
            )}
          />
          {loadedState && (
            <Autocomplete
              id="city"
              options={loadedState}
              getOptionLabel={(option) => option.city}
              style={{ width: "90%", margin: "0.5rem auto" }}
              onChange={cityChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value="None"
                  label="City"
                  variant="outlined"
                />
              )}
            />
          )}
          <Autocomplete
            id="category"
            options={categories}
            getOptionLabel={(option) => option.category}
            style={{ width: "90%", margin: "0.5rem auto" }}
            onChange={categoryChangeHandler}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
          {/* <Button onClick={}>Go</Button> */}
          <Button dark classes="notice-filter-modal__button" type="submit">
            Go
          </Button>
          <Button div
            onClick={props.onCancel}
            classes="notice-filter-modal__button"
          >
            Cancel
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NoticeFilterModal;
