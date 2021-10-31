import React, { useContext, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  TextareaAutosize,
  Checkbox,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cities } from "../../shared/util/Cities";
import { states } from "../../shared/util/States";
import { categories } from "../../shared/util/FundraiserCategories";
import AmountInput from "../components/AmountInput";
import StepBar from "../components/StepBar";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Footer from "../../shared/components/Footer/Footer";

import Button from "../../shared/components/UIElements/Button/Button";
import "./CreateFundraiser2.css";

const initialValues = {
  name: "",
  title: "",
  description: "",
  amount: 0,
  coverImg: null,
  doc1: null,
  doc2: null,
  doc3: null,
};

const CreateFundraiser = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [step, setStep] = useState(1);

  const [amountValid, setAmountValid] = useState(true);
  const [descValid, setDescValid] = useState(true);
  const [coverValid, setCoverValid] = useState(true);
  const [docValid, setDocValid] = useState(true);

  const [selectedState, setSelectedState] = useState(null);
  const [loadedState, setLoadedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [review, setReview] = useState(false);
  const [agree, setAgree] = useState(false);

  const history = useHistory();
  // const filePickerRef = useRef();

  const validate = () => {
    if (step === 1) {
      setErrors({});
      let temp = {};
      temp.name = values.name ? "" : "*Invalid Field";
      temp.title = values.title ? "" : "*Invalid Field";
      temp.state = selectedState !== null ? "" : "*Please select a state";
      temp.city = selectedCity !== null ? "" : "*Please select a city";
      temp.category =
        selectedCategory !== null ? "" : "*Please select a category";
      setErrors({
        ...temp,
      });
      return Object.values(temp).every((x) => x === "");
    }
    if (step === 2) {
      if (
        values.amount !== null &&
        !isNaN(values.amount) &&
        values.amount > 4999
      ) {
        setAmountValid(true);
        return true;
      } else {
        setAmountValid(false);
        return false;
      }
    }
    if (step === 3) {
      if (values.description.length > 199) {
        setDescValid(true);
        return true;
      } else {
        setDescValid(false);
        return false;
      }
    }

    if (step === 4) {
      if (values.coverImg !== null) {
        setCoverValid(true);
        return true;
      } else {
        setCoverValid(false);
        return false;
      }
    }

    if (step === 5) {
      if (
        values.doc1 !== null ||
        values.doc2 !== null ||
        values.doc3 !== null
      ) {
        setDocValid(true);
        return true;
      } else {
        setDocValid(false);
        return false;
      }
    }

    if(step === 6){
      if (agree){
        return true;
      } else {
        return false;
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const imageInputHandler = (id, file) => {
    setValues({
      ...values,
      [id]: file,
    });
  };

  const donationAmountHandler = (e) => {
    setValues({
      ...values,
      amount: e.target.value,
    });
  };

  const increaseStep = () => {
    if (validate()) {
      setStep((prev) => prev + 1);
    }
  };

  // const decreaseStep = () => {
  //   setStep((prev) => prev - 1);
  // };

  const stateChangeHandler = (event, value) => {
    if (value === null) {
      setLoadedState(null);
      setSelectedCity(null);
      setSelectedState(null);
    } else {
      const currState = value.state;
      setSelectedState(currState);
      setSelectedCity(null);
      setLoadedState(null);
      setLoadedState(cities[currState]);
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

  const reviewFundraiserHandler = () => {
    if (validate()) {
      setStep(6);
      setReview(true);
    }
  };

  const createFundraiserHandler = async (event) => {
    event.preventDefault();
    if (validate()) {
      let fundraiserId;
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("title", values.title);
        formData.append("category", selectedCategory);
        formData.append("state", selectedState);
        formData.append("city", selectedCity);
        formData.append("amount", values.amount);
        formData.append("description", values.description);
        formData.append("cover", values.coverImg);
        formData.append("creator", auth.userId);
        fundraiserId = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/create`,
          "POST",
          formData,
          { Authorization: "Bearer " + auth.token }
        );

        // history.push("/");
      } catch (err) {
        console.log(err);
      }
      // const documents = [];
      // documents.push(values.doc1);
      // documents.push(values.doc2);
      // documents.push(values.doc3);
      try {
        const formData = new FormData();
        formData.append("fundraiserId", fundraiserId.id);
        formData.append("document", values.doc1);
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/documents`,
          "PATCH",
          formData,
          { Authorization: "Bearer " + auth.token }
        );
      } catch (err) {}
      if (values.doc2) {
        try {
          const formData = new FormData();
          formData.append("fundraiserId", fundraiserId.id);
          formData.append("document", values.doc2);
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/documents`,
            "PATCH",
            formData,
            { Authorization: "Bearer " + auth.token }
          );
        } catch (err) {}
      }
      if (values.doc3) {
        try {
          const formData = new FormData();
          formData.append("fundraiserId", fundraiserId.id);
          formData.append("document", values.doc3);
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/documents`,
            "PATCH",
            formData,
            { Authorization: "Bearer " + auth.token }
          );
        } catch (err) {}
      }
      history.push("/");
    }
  };

  return (
    <>
      <div className="create-fundraiser__main-container">
        {isLoading && <LoadingSpinner asOverlay />}

        <div className="create-fundraiser__container">
          <div className="create-fundraiser__header">
            {review ? "Review Fundraiser" : "Create Fundraiser"}
          </div>
          {!review && <StepBar step={step} />}
          {error && <p>{error}</p>}
          <form onSubmit={createFundraiserHandler}>
            {step === 1 && (
              <>
                <TextField
                  className="create-fundraiser__text-field"
                  variant="outlined"
                  label="Beneficiary Name"
                  value={values.name}
                  name="name"
                  {...(errors.name && { error: true, helperText: errors.name })}
                  onChange={handleInputChange}
                />
                <TextField
                  className="create-fundraiser__text-field"
                  variant="outlined"
                  label="Fundraiser Title"
                  value={values.title}
                  name="title"
                  {...(errors.title && {
                    error: true,
                    helperText: errors.title,
                  })}
                  onChange={handleInputChange}
                />
                <Autocomplete
                  id="category"
                  options={categories}
                  getOptionLabel={(option) => option.category}
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    margin: ".5rem auto",
                  }}
                  onChange={categoryChangeHandler}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                      value={selectedCategory}
                      {...(errors.category && {
                        error: true,
                        helperText: errors.category,
                      })}
                    />
                  )}
                />
                <Autocomplete
                  id="state"
                  options={states}
                  getOptionLabel={(option) => option.state}
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    margin: "1rem auto 0.5rem auto",
                  }}
                  onChange={stateChangeHandler}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      variant="outlined"
                      {...(errors.state && {
                        error: true,
                        helperText: errors.state,
                      })}
                    />
                  )}
                />
                {loadedState && (
                  <Autocomplete
                    id="city"
                    options={loadedState}
                    getOptionLabel={(option) => option.city}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                      margin: "1rem auto",
                    }}
                    onChange={cityChangeHandler}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        variant="outlined"
                        {...(errors.city && {
                          error: true,
                          helperText: errors.city,
                        })}
                      />
                    )}
                  />
                )}

                <div className="create-fundraiser__button-container">
                  <Link to="/">
                    <Button div>Cancel</Button>
                  </Link>
                  <Button dark div onClick={increaseStep} classes="submit-btn">
                    Continue
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="create-fundraiser__custom-label">
                  How much would you like to raise?*
                </div>
                <AmountInput
                  valid={amountValid}
                  onChange={donationAmountHandler}
                />
                <div className="create-fundraiser__button-container">
                  <Link to="/">
                    <Button div>Cancel</Button>
                  </Link>
                  <Button dark div onClick={increaseStep} classes="submit-btn">
                    Continue
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="create-fundraiser__custom-label">
                  Enter description of your fundraiser*
                </div>
                <TextareaAutosize
                  className={
                    descValid
                      ? `create-fundraiser__text-area`
                      : "create-fundraiser__text-area error"
                  }
                  name="description"
                  aria-label="minimum height"
                  rowsMin={15}
                  placeholder="Enter Description (Minimum 200 words)"
                  onChange={handleInputChange}
                />
                {!descValid && (
                  <div className="create-fundraiser__error">
                    <p>*Invalid Field (Min 200 characters)</p>
                  </div>
                )}
                <div className="create-fundraiser__button-container">
                  <Link to="/">
                    <Button div>Cancel</Button>
                  </Link>
                  <Button dark div onClick={increaseStep} classes="submit-btn">
                    Continue
                  </Button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className="create-fundraiser__custom-label">
                  Add a cover photo*
                </div>
                <ImageUpload
                  modal
                  preview
                  id="coverImg"
                  center
                  quality="0.8"
                  onInput={imageInputHandler}
                >
                  Pick Image
                </ImageUpload>
                {!coverValid && (
                  <div className="create-fundraiser__error">
                    <p>*Please upload a cover photo</p>
                  </div>
                )}
                <div className="create-fundraiser__button-container">
                  <Link to="/">
                    <Button div>Cancel</Button>
                  </Link>
                  <Button dark div onClick={increaseStep} classes="submit-btn">
                    Continue
                  </Button>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div className="create-fundraiser__custom-label">
                  Add documents*
                </div>
                <ImageUpload
                  id="doc1"
                  center
                  quality="0.9"
                  onInput={imageInputHandler}
                >
                  {values.doc1 !== null ? `${values.doc1.name}` : "Upload"}
                </ImageUpload>
                <ImageUpload
                  id="doc2"
                  center
                  quality="0.9"
                  onInput={imageInputHandler}
                >
                  {values.doc2 !== null ? `${values.doc2.name}` : "Upload"}
                </ImageUpload>
                <ImageUpload
                  id="doc3"
                  center
                  quality="0.9"
                  onInput={imageInputHandler}
                >
                  {values.doc3 !== null ? `${values.doc3.name}` : "Upload"}
                </ImageUpload>
                {!docValid && (
                  <div className="create-fundraiser__error">
                    <p>*Please upload atlease one document</p>
                  </div>
                )}
                <div className="create-fundraiser__button-container">
                  <Link to="/">
                    <Button div>Cancel</Button>
                  </Link>
                  <Button
                    div
                    dark
                    classes="submit-btn"
                    onClick={reviewFundraiserHandler}
                  >
                    Finish
                  </Button>
                </div>
              </>
            )}
            {review && (
              <>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">
                    Beneficiary Name
                  </div>
                  <div className="create-fundraiser__review-value">
                    {values.name}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">
                    Fundraiser Title
                  </div>
                  <div className="create-fundraiser__review-value">
                    {values.title}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">
                    Fundraiser Category
                  </div>
                  <div className="create-fundraiser__review-value">
                    {selectedCategory}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">State</div>
                  <div className="create-fundraiser__review-value">
                    {selectedState}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">City</div>
                  <div className="create-fundraiser__review-value">
                    {selectedCity}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">
                    Amount to be raised
                  </div>
                  <div className="create-fundraiser__review-value">
                    {values.amount}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">
                    Cover Image
                  </div>
                  <div className="create-fundraiser__review-value">
                    {values.coverImg ? "True" : "False"}
                  </div>
                </div>
                <div className="create-fundraiser__review-container">
                  <div className="create-fundraiser__custom-label">
                    Documents
                  </div>
                  <div className="create-fundraiser__review-value">
                    {values.doc1 && values.doc1.name}
                    <br />
                    {values.doc2 && values.doc2.name}
                    <br />
                    {values.doc3 && values.doc3.name}
                  </div>
                </div>
                <div className="create-fundraiser__terms-check">
                  <div className="checkbox">
                    <Checkbox
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      name="checkedB"
                      color="primary"
                    />
                  </div>
                  <div className="checkbox-label">I agree to Chipp's <Link to="/legal/fundraiserterms">Terms of Service</Link> and <Link to="/legal/privacypolicy">Privacy Policy</Link></div>
                </div>
                <div className="create-fundraiser__button-container">
                  <Link to="/">
                    <Button div>Cancel</Button>
                  </Link>
                  <Button dark disabled={!agree} classes="submit-btn" type="submit">
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateFundraiser;
