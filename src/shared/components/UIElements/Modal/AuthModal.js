import React, { useState, useContext } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import { useForm } from "../../../hooks/form-hook";
import { Checkbox } from "@material-ui/core";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_NUMBER,
} from "../../../util/validators";
import { AuthContext } from "../../../context/auth-context";
import ImageUpload from "../../FormElements/ImageUpload";
import Input from "../../FormElements/Input";
import Button from "../Button/Button";
import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";
import "./AuthModal.css";
import { Link } from "react-router-dom";

const AuthModal = (props) => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(!props.signup);
  const [verifyConfirmation, setVerifyConfirmation] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [agree, setAgree] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          // image: undefined,
          phone: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,

          name: {
            value: "",
            isValid: false,
          },
          // image: {
          //   value: null,
          //   isValid: false
          // },
          phone: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const verifyConfirmationHandler = () => {
    if (verifyConfirmation) {
      setVerifyConfirmation(false);
      window.location.reload();
    } else {
      setVerifyConfirmation(true);
    }
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/user/signin",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.user.id, responseData.user.token);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("phone", formState.inputs.phone.value);
        // formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/user/signup",
          "POST",
          formData
        );
        verifyConfirmationHandler();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Modal
        show={props.showModal}
        onCancel={props.onCancel}
        contentClass="auth-modal__content"
        header={
          <>
            <div className="auth-modal__header">
              <div className="auth-modal__header-content">
                {isLoginMode ? "Login" : "Create an account"}
              </div>
            </div>
          </>
        }
        footer={
          <div className="auth-modal__footer">
            {isLoginMode ? "Don't" : "Already"} have an account?{" "}
            <span
              className="auth-modal__switch-btn"
              onClick={switchModeHandler}
            >
              {isLoginMode ? "Sign up" : "Sign in"}
            </span>
          </div>
        }
        footerClass="auth-modal__footer"
      >
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p className="auth-modal__error">{error}</p>}
        <div className="auth-modal__content-main-container">
          <div className="auth-modal__form-container">
            {verifyConfirmation && (
              <div className="auth-modal__verify-message-container">
                <h2>Verification email sent!</h2>
                <p>
                  Please check your email inbox and follow the instructions to
                  verify your account.
                </p>
                <Button onClick={verifyConfirmationHandler}>Confirm</Button>
              </div>
            )}
            {!verifyConfirmation && (
              <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                  <Input
                    element="input"
                    id="name"
                    type="text"
                    placeholder="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Field Required"
                    onInput={inputHandler}
                  />
                )}
                {/* {!isLoginMode && (
                <ImageUpload center id="image" onInput={inputHandler} />
              )} */}
                <Input
                  id="email"
                  element="input"
                  type="email"
                  placeholder="E-Mail"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Field Required"
                  onInput={inputHandler}
                />
                <Input
                  id="password"
                  element="input"
                  type="password"
                  placeholder="Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Password must contain at least 6 characters"
                  onInput={inputHandler}
                />
                {!isLoginMode && (
                  <Input
                    element="input"
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    validators={[
                      VALIDATOR_MINLENGTH(10),
                      VALIDATOR_MAXLENGTH(10),
                      VALIDATOR_NUMBER(),
                    ]}
                    errorText="Please enter a valid number."
                    onInput={inputHandler}
                  />
                )}
                {!isLoginMode && (
                  <div className="auth-modal__privacy-container">
                    <Checkbox
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      name="checkedB"
                      color="primary"
                    />
                    <div className="checkbox-label">
                      I agree to Chipp's &nbsp;
                      <Link to="/legal/terms">Terms and Conditions</Link> and &nbsp; 
                      <Link to="/legal/privacypolicy">Privacy Policy</Link>
                    </div>
                  </div>
                )}
                {isLoginMode && (
                  <div className="auth-modal__forgot-container">
                    <Link to={`/forgot_password`}>Forgot Password</Link>
                  </div>
                )}
                {isLoginMode && (
                  <Button
                    dark
                    disabled={!formState.isValid }
                    classes="auth-modal__btn"
                    type="submit"
                  >
                    SIGN IN
                  </Button>
                )}
                {!isLoginMode && (
                  <Button
                    dark
                    disabled={!formState.isValid || !agree}
                    classes="auth-modal__btn"
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                )}
                <Button div classes="auth-modal__btn" onClick={props.onCancel}>
                  CANCEL
                </Button>
              </form>
            )}
          </div>
          {/* <div className="auth-modal__word-line-break">
          <span>or</span>
        </div> */}
          {/* <div className="auth-modal__divider"></div> */}

          {/* <div className="auth-modal__social-media-container">
            <Button
              div
              classes="auth-modal__social-signin-btn auth-modal__google-btn"
            >
              <i className="fab fa-google"></i>
              <div> {isLoginMode ? "Sign in" : "Sign up"} with Google</div>
            </Button>
            <Button
              div
              classes="auth-modal__social-signin-btn auth-modal__facebook-btn"
            >
              <i className="fab fa-facebook-square"></i>
              <div> {isLoginMode ? "Sign in" : "Sign up"} with Facebook</div>
            </Button>
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;
