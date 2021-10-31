import React, { useContext, useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Footer from '../../shared/components/Footer/Footer';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { categories } from "../../shared/util/notice-details";
import {cities} from '../../shared/util/Cities';
import {states} from "../../shared/util/States";

import Button from "../../shared/components/UIElements/Button/Button";
import "./AddInfo.css";

const initialValues = {
  name: "",
  phone1: "",
  phone2: "",
  msg: "",
};

const AddInfo = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [selectedState, setSelectedState] = useState(null);
  const [loadedState, setLoadedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const history = useHistory();

  const validate = () => {
    let temp = {};
    temp.name = values.name ? "" : "*Invalid Field";
    temp.phone1 = !isNaN(values.phone1) && values.phone1.length === 10 ? "" : "*Invalid Field";
    temp.state = selectedState !== null ? "" : "*Please select a state";
    temp.city = selectedCity !== null ? "" : "*Please select a city";
    temp.category =
      selectedCategory !== null ? "" : "*Please select a category";
    temp.msg = values.msg.length < 200 ? "" : "*Character limit exceeded (Maximum 180 characters)"
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

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

  const submitInfoHandler = async (event) => {
    event.preventDefault();

    if (validate()) {
      if (auth.isLoggedIn) {
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL+"/api/notice/createnotice",
            "POST",
            JSON.stringify({
              userId: auth.userId,
              state: selectedState,
              city: selectedCity,
              category: selectedCategory,
              name: values.name,
              phone1: values.phone1,
              phone2: values.phone2,
              msg: values.msg,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
          setSelectedState(null);
          setLoadedState(null);
          setSelectedCity(null);
          setSelectedCategory(null);
          history.push('/notices');
        } catch (err) {
          setSelectedState(null);
          setLoadedState(null);
          setSelectedCity(null);
          setSelectedCategory(null);
          console.log(err);
        }
      }
    }
  };

  return (
    <>
      <div className="add-info__main-container">
      {isLoading && <LoadingSpinner asOverlay />}
      
        <div className="add-info__container">
          <div className="add-info__header">
            Add Info
          </div>
          {error && <p>{error}</p>}
          <form onSubmit={submitInfoHandler}>
            <Autocomplete
              id="state"
              options={states}
              getOptionLabel={(option) => option.state}
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.5",
                margin: "0.5rem auto",
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
                  margin: "0.5rem auto",
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
            <Autocomplete
              id="category"
              options={categories}
              getOptionLabel={(option) => option.category}
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.5",
                margin: "0.5rem auto",
              }}
              onChange={categoryChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                  {...(errors.category && {
                    error: true,
                    helperText: errors.category,
                  })}
                />
              )}
            />
            <TextField
              className="add-info__text-field"
              variant="outlined"
              label="Name*"
              value={values.name}
              name="name"
              {...(errors.name && { error: true, helperText: errors.name })}
              onChange={handleInputChange}
            />
            <TextField
              className="add-info__text-field"
              variant="outlined"
              label="Phone 1*"
              value={values.phone1}
              name="phone1"
              {...(errors.phone1 && { error: true, helperText: errors.phone1 })}
              onChange={handleInputChange}
            />
            <TextField
              className="add-info__text-field"
              variant="outlined"
              label="Phone 2"
              value={values.phone2}
              name="phone2"
              onChange={handleInputChange}
            />
            <TextField
              className="add-info__text-field"
              variant="outlined"
              label="Message"
              value={values.msg}
              name="msg"
              {...(errors.msg && {
                error: true,
                helperText: errors.msg,
              })}
              onChange={handleInputChange}
            />
            <div className="add-info__button-container">
              <Link to="/"><Button>Cancel</Button></Link>
              <Button dark type="submit" classes="submit-btn">Submit</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddInfo;
