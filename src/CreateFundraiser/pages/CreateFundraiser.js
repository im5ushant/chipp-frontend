import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import GoBackBtn from "../../shared/components/UIElements/Button/GoBackBtn";
import Input from "../../shared/components/FormElements/Input";
import AmountInput from "../components/AmountInput";
import Button from "../../shared/components/UIElements/Button/Button";
import Container from "../../shared/components/UIElements/Containers/Container";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import StepBar from "../components/StepBar";
import "./CreateFundraiser.css";

const CreateFundraiser = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [donationAmount, setDonationAmount] = useState("0");

  const [formState, inputHandler, setFormData] = useForm(
    {
      step: {
        value: 1,
        isValid: true,
      },
      image: {
        value: null,
        isValid: false,
      },
      category: {
        value: "None",
        isValid: false,
        touched: false,
      },
      beneficiary: {
        value: "",
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      pincode: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const increaseStep = () => {
    const currStep = formState.inputs.step.value;

    setFormData({
      ...formState.inputs,
      step: {
        value: currStep + 1,
        isValid: true,
      },
    });
  };

  const decreaseStep = () => {
    const currStep = formState.inputs.step.value;
    setFormData({
      ...formState.inputs,
      step: {
        value: currStep - 1,
        isValid: true,
      },
    });
  };

  const history = useHistory();

  const donationAmountHandler = (e) => {
    setDonationAmount(e.target.value);
  };

  const categoryTouchedHandler = () => {
    if (formState.inputs.category.value === "None") {
      setFormData({
        ...formState.inputs,
        category: {
          ...formState.inputs.category,
          isValid: false,
          touched: true,
        },
      });
    }
  };

  const categoryHandler = (e) => {
    setFormData({
      ...formState.inputs,
      category: {
        value: e.target.value,
        isValid: true,
        touched: true,
      },
    });
  };

  const createFundraiserHander = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("category", formState.inputs.category.value);
      formData.append("name", formState.inputs.beneficiary.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("amount", donationAmount);
      formData.append("description", formState.inputs.description.value);
      formData.append("pincode", formState.inputs.pincode.value);
      formData.append("creator", auth.userId);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/create`,
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );

      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <div className="create-fundraiser__parent-container">
        <div className="create-fundraiser__main-container">
          <Container
            classSuffix="default"
            classes="create-fundraiser__container"
          >
            <StepBar step={formState.inputs.step.value} />
            <div className="create-fundraiser__subcontainer">
              <form onSubmit={createFundraiserHander}>
                {isLoading && <LoadingSpinner asOverlay />}
                {formState.inputs.step.value === 1 && (
                  <>
                    <h2>Basic Information</h2>
                    <Input
                      id="pincode"
                      element="input"
                      type="text"
                      label="Enter your area's pincode"
                      placeholder="Ex. 111111"
                      validators={[
                        VALIDATOR_MINLENGTH(6),
                        VALIDATOR_MAXLENGTH(6),
                        VALIDATOR_NUMBER(),
                      ]}
                      errorText="Invalid Field"
                      onInput={inputHandler}
                    />
                    <div className="create-fundraiser__custom-label">
                      What are you fundraising for?
                    </div>
                    <select
                      id="category"
                      onBlur={categoryTouchedHandler}
                      onChange={categoryHandler}
                      className={
                        !formState.inputs.category.isValid &&
                        formState.inputs.category.touched
                          ? "create-fundraiser__category invalid"
                          : "create-fundraiser__category"
                      }
                    >
                      <option value="None">Select Category: </option>
                      <option value="Medical">Medical</option>
                      <option value="Memorial">Memorial</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Nonprofit">Nonprofit</option>
                      <option value="Education">Education</option>
                      <option value="Animals">Animals</option>
                      <option value="Community">Community</option>
                      <option value="Competition">Competition</option>
                      <option value="Creative">Creative</option>
                      <option value="Event">Event</option>
                      <option value="Faith">Faith</option>
                      <option value="Family">Family</option>
                      <option value="Sports">Sports</option>
                      <option value="Travel">Travel</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Wishes">Wishes</option>
                      <option value="Others">Others</option>
                    </select>
                    {!formState.inputs.category.isValid &&
                      formState.inputs.category.touched && (
                        <div className="create-fundraiser__category-error">
                          <p>*Please select a category</p>
                        </div>
                      )}
                    <Input
                      id="beneficiary"
                      element="input"
                      type="text"
                      placeholder="Self / Person's Name"
                      label="Beneficiary Name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Invalid Field"
                      onInput={inputHandler}
                    />
                    <Input
                      id="title"
                      element="input"
                      type="text"
                      label="What is your fundraiser title?"
                      placeholder="Ex. Help us to rebuild our shelter"
                      validators={[VALIDATOR_MINLENGTH(5)]}
                      errorText="Enter atleast 5 characters"
                      onInput={inputHandler}
                    />
                    <Button to="/">Cancel</Button>
                    <Button
                      dark
                      disabled={
                        !formState.inputs.pincode.isValid ||
                        !formState.inputs.category.isValid ||
                        !formState.inputs.beneficiary.isValid ||
                        !formState.inputs.title.isValid
                      }
                      onClick={increaseStep}
                    >
                      Next
                    </Button>
                  </>
                )}
                {formState.inputs.step.value === 2 && (
                  <>
                    <h2>Set your fundraiser goal</h2>
                    <div className="create-fundraiser__custom-label">
                      How much would you like to raise?
                    </div>
                    <AmountInput onChange={donationAmountHandler} />
                    
                    <Button div onClick={decreaseStep}>
                      Prev
                    </Button>
                    <Button dark disabled={
                        donationAmount < 1000
                      } onClick={increaseStep}>
                      Next
                    </Button>
                  </>
                )}
                {formState.inputs.step.value === 3 && (
                  <>
                    <h2>Add a cover photo</h2>
                    <div className="create-fundraiser__custom-label">
                      A high quality photo will help tell your story
                    </div>
                    <ImageUpload id="image" center onInput={inputHandler} />
                    <Button div onClick={decreaseStep}>
                      Prev
                    </Button>
                    <Button dark disabled={!formState.inputs.image.value} onClick={increaseStep}>
                      Next
                    </Button>
                  </>
                )}
                {formState.inputs.step.value === 4 && (
                  <>
                    <h2>Enter a description</h2>
                    <div className="create-fundraiser__custom-label">
                      Explain who you are and why you're fundraising
                    </div>
                    <Input
                      id="description"
                      element="textarea"
                      type="textarea"
                      rows="10"
                      placeholder="Description"
                      validators={[VALIDATOR_MINLENGTH(15)]}
                      errorText="Enter atleast 15 characters"
                      onInput={inputHandler}
                    />
                    <Button div onClick={decreaseStep}>
                      Prev
                    </Button>
                    <Button dark disabled={!formState.isValid} type="submit">
                      Submit
                    </Button>
                  </>
                )}
              </form>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CreateFundraiser;
