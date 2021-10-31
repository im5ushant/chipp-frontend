import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";

import Button from "../../shared/components/UIElements/Button/Button";

import "./ProfileDetails.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ProfileDetails = (props) => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.phone =
      values.phone.length === 0 ||
      (!isNaN(values.phone) && values.phone.length === 10)
        ? ""
        : "*Invalid Field";
    temp.email =
      values.email.length === 0 ||
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email
      )
        ? ""
        : "Email is not valid";
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

  const profileUpdateHandler = async (event) => {
    event.preventDefault();
    if (values.name.length === 0 && values.email.length === 0 && values.phone.length === 0){
      alert("You have not entered any update")
    }
    else if (validate()) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+"/api/user/updateprofiledetails",
          "PATCH",
          JSON.stringify({
            id: props.userId,
            name: values.name,
            email: values.email,
            phone: values.phone,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay/>}
      {!isLoading && <form onSubmit={profileUpdateHandler}>
        {error && <p>{error}</p>}

        <TextField
          className="profile-details__text-field"
          variant="outlined"
          label="Name"
          value={values.name}
          name="name"
          {...(errors.name && { error: true, helperText: errors.name })}
          onChange={handleInputChange}
        />
        <TextField
          className="profile-details__text-field"
          variant="outlined"
          label="E-Mail"
          value={values.email}
          name="email"
          {...(errors.email && { error: true, helperText: errors.email })}
          onChange={handleInputChange}
        />
        <TextField
          className="profile-details__text-field"
          variant="outlined"
          label="Phone"
          value={values.phone}
          name="phone"
          {...(errors.phone && { error: true, helperText: errors.phone })}
          onChange={handleInputChange}
        />
        <div className="profile-details__btn-section">
          <Link to="/">
            <Button div>Cancel</Button>
          </Link>
          <Button dark type="submit">
            Update
          </Button>
        </div>
      </form>}
    </>
  );
};

export default ProfileDetails;
