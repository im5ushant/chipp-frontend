import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import Button from "../../shared/components/UIElements/Button/Button";

import "./VerifyKYC.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const VerifyKYC = (props) => {
  const auth = useContext(AuthContext);

  const initialValues = {
    aadharcard: null,
    pancard: null,
    userimage: null,
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [uploadStatus, setUploadStatus] = useState(false);
  const [docValid, setDocValid] = useState(true);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    if (
      values.aadharcard !== null &&
      values.pancard !== null &&
      values.userimage !== null
    ) {
      setDocValid(true);
      return true;
    } else {
      setDocValid(false);
      return false;
    }
  };

  const imageInputHandler = (id, file) => {
    setValues({
      ...values,
      [id]: file,
    });
  };

  const uploadKYCHandler = async (event) => {
    event.preventDefault();
    console.log(values);
    if (validate()) {
      let response;
      try {
        const formData = new FormData();
        formData.append("userId", props.userId);
        formData.append("aadhar", values.aadharcard);
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/kyc/aadhar`,
          "PATCH",
          formData,
          { Authorization: "Bearer " + auth.token }
        );
      } catch (err) {
        console.log(err);
      }
      try {
        const formData = new FormData();
        formData.append("userId", props.userId);
        formData.append("pancard", values.aadharcard);
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/kyc/pancard`,
          "PATCH",
          formData,
          { Authorization: "Bearer " + auth.token }
        );
      } catch (err) {
        console.log(err);
      }
      try {
        const formData = new FormData();
        formData.append("userId", props.userId);
        formData.append("userimage", values.userimage);
        response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/kyc/userimage`,
          "PATCH",
          formData,
          { Authorization: "Bearer " + auth.token }
        );
        setUploadStatus(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="verify-kyc__header">Verify KYC</div>
      {isLoading && <LoadingSpinner asOverlay />}
      { !uploadStatus && !isLoading && (
        <div className="verify-kyc__form-container">
          <div className="verify-kyc__custom-label">Upload Aadhar Card*</div>
          <ImageUpload
            preview
            id="aadharcard"
            center
            quality="0.8"
            onInput={imageInputHandler}
          >
            {values.aadharcard ? "Change Image" : "Pick Image"}
          </ImageUpload>
          <div className="verify-kyc__custom-label">Upload Pan Card*</div>
          <ImageUpload
            preview
            id="pancard"
            center
            quality="0.8"
            onInput={imageInputHandler}
          >
            Pick Image
          </ImageUpload>
          <div className="verify-kyc__custom-label">
            Upload your photo holding aadhar card (face must be visible)*
          </div>
          <ImageUpload
            preview
            id="userimage"
            center
            quality="0.8"
            onInput={imageInputHandler}
          >
            Pick Image
          </ImageUpload>
          {!docValid && (
            <div className="verify-kyc__error">
              <p>*Please upload all the required documents</p>
            </div>
          )}
          <div className="verify-kyc__button-container">
            <Link to="/">
              <Button div>Cancel</Button>
            </Link>
            <Button div dark classes="submit-btn" onClick={uploadKYCHandler}>
              Submit
            </Button>
          </div>
        </div>
      )}
      { uploadStatus && 
        <div className="verify-kyc__upload-successful">
          <h3>KYC Verified <i class="fas fa-check-circle"></i></h3>
        </div>
      }
    </>
  );
};

export default VerifyKYC;
