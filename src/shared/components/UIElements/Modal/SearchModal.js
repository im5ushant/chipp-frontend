import React, { useState } from "react";
import { useHttpClient } from "../../../hooks/http-hook";
import TextField from "@material-ui/core/TextField";

import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button/Button";
import Modal from "./Modal";

import "./SearchModal.css";

const SearchModal = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = useState("");
  const [errors, setErrors] = useState(false);

  const validate = () => {
    console.log(values);
    if (values !== "") {
      setErrors(false);
    } else {
      setErrors("*Invalid Field");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValues(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    validate();
  };
  //  if(validate()){
  //     try {
  //       const responseData = await sendRequest(
  //         process.env.REACT_APP_BACKEND_URL+`/notice/filternotice?state=${selectedState}&city=${selectedCity}&category=${selectedCategory}`,
  //         "GET"
  //       );
  //       props.filterResponse(responseData);
  //       setSelectedState(null);
  //       setLoadedState(null);
  //       setSelectedCity(null);
  //       setSelectedCategory(null);
  //       props.onConfirm();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //    }
  //   };

  //   console.log(error);

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
        <form onSubmit={submitHandler}>
          <TextField
            className="search-modal__text-field"
            variant="outlined"
            label="Search"
            value={values}
            name="search"
            {...(errors && { error: true, helperText: errors })}
            onChange={handleInputChange}
          />
          <Button dark classes="notice-filter-modal__button" type="submit">
            Go
          </Button>
          <Button
            div
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

export default SearchModal;
