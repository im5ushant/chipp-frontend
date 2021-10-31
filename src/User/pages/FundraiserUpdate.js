import React, {useContext} from "react";
import {useParams} from 'react-router';
import { useHistory } from "react-router-dom";

import {AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/UIElements/Button/Button";
import Input from "../../shared/components/FormElements/Input";
import Container from "../../shared/components/UIElements/Containers/Container";
import GoBackBtn from "../../shared/components/UIElements/Button/GoBackBtn";
import "./FundraiserUpdate.css";

const FundraiserUpdate = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const fundraiserId = useParams().fundraiserId;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm({
    updateFundraiser: {
      value: "",
      isValid: false,
    },
  });

  const fundraiserUpdateHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/api/fundraiser/${fundraiserId}/addupdate`,
        "PATCH",
        JSON.stringify({ update: formState.inputs.updateFundraiser.value }),
        { "Content-Type": "application/json",Authorization: 'Bearer ' + auth.token }
      );
      history.push(`/fundraiser/${fundraiserId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const goBackHandler = () => {
    history.push("/user/dashboard");
  };

  return (
    <>
      <div className="fundraiser-update__parent-container">
        <div className="fundraiser-update__main-container">
          <Container
            classSuffix="default"
            classes="fundraiser-update__container"
          >
            <div className="fundraiser-update__subcontainer">
              <GoBackBtn text onClick={goBackHandler} />
            </div>
            <div className="fundraiser-update__subcontainer">
              <form onSubmit={fundraiserUpdateHandler}>
                <Input
                  id="updateFundraiser"
                  element="input"
                  type="text"
                  placeholder="Enter update"
                  validators={[
                    VALIDATOR_MINLENGTH(6),
                    VALIDATOR_MAXLENGTH(200),
                  ]}
                  errorText="Invalid Field"
                  onInput={inputHandler}
                />
                <Button dark disabled={!formState.isValid} type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default FundraiserUpdate;
