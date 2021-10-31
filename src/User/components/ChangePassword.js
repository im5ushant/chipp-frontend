import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import Button from "../../shared/components/UIElements/Button/Button";

import "./ChangePassword.css";

const initialValues = {
  currentPass: "",
  newPass: "",
  confirmPass: "",
};

const ChangePassword = (props) => {
  const [resData, setResData] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    setErrors({});
    let temp = {};
    temp.currentPass = values.currentPass ? "" : "*Invalid Field";
    temp.newPass =
      values.newPass.length > 5 ? "" : "*Invalid Field (Min. 6 characters)";
    temp.confirmPass = values.confirmPass ? "" : "*Invalid Field";
    if (values.confirmPass) {
      temp.confirmPass =
        values.confirmPass === values.newPass ? "" : "*Passwords doesn't match";
    }
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const changePassHandler = async (event) => {
    event.preventDefault();
    if (props.isLoggedIn && validate()) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/user/changePassword",
          "PATCH",
          JSON.stringify({
            email: props.userInfo.user.email,
            currPass: values.currentPass,
            newPass: values.newPass,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // console.log(responseData);
        setResData(responseData);
        history.push(`/`);
      } catch (err) {
        console.log(err);
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

  return (
    <>
      <div className="change-password__header">
        <h3>Change Password</h3>
      </div>
      <div className="change-password__form-container">
        <form onSubmit={changePassHandler}>
          {error && <p className="change-password__error">{error}</p>}
          <TextField
            className="change-password__text-field"
            variant="outlined"
            label="Current Password"
            type="password"
            value={values.currentPass}
            name="currentPass"
            {...(errors.currentPass && {
              error: true,
              helperText: errors.currentPass,
            })}
            onChange={handleInputChange}
          />
          <TextField
            className="change-password__text-field"
            variant="outlined"
            label="New Password"
            type="password"
            value={values.newPass}
            name="newPass"
            {...(errors.newPass && { error: true, helperText: errors.newPass })}
            onChange={handleInputChange}
          />
          <TextField
            className="change-password__text-field"
            variant="outlined"
            label="Confirm New Password"
            type="password"
            value={values.confirmPass}
            name="confirmPass"
            {...(errors.confirmPass && {
              error: true,
              helperText: errors.confirmPass,
            })}
            onChange={handleInputChange}
          />
          <div className="change-password__btn-section">
            <Link to="/">
              <Button div>Cancel</Button>
            </Link>
            <Button dark type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
