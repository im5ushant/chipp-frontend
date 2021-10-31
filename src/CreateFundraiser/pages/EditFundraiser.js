import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import EditForm from "../components/EditForm";
import Container from "../../shared/components/UIElements/Containers/Container";

import "./EditFundraiser.css";

const EditFundraiser = (props) => {
  const fId = useParams().fundraiserId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = useState();

  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/${fId}`
        );
        setValues(responseData);
      } catch (err) {}
    };
    fetchFundraiser();
  }, [sendRequest, fId]);

  return (
    <>
      <div className="edit-fundraiser__main-container">
        {isLoading && <LoadingSpinner asOverlay />}
        <Container classSuffix="default" classes="edit-fundraiser__container">
          <div className="add-info__header">Edit Fundraiser</div>
          {values && (
            <EditForm
              fId={fId}
              title={values.fundraiser.title}
              description={values.fundraiser.description}
              cover={values.fundraiser.cover}
            />
          )}
        </Container>
      </div>
    </>
  );
};

export default EditFundraiser;
