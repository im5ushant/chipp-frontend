import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router";

const ConfirmEmail = (props) => {
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const TOKEN = useParams().key;

  useEffect(() => {
    const updateEmailStatus = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/user/confirmemail/${TOKEN}`,
          "PATCH"
        );
        setEmailConfirmed(true);
      } catch (err) {
        console.log(err);
      }
    };
    updateEmailStatus();
  }, [sendRequest, TOKEN]);

  return (
    <>
      <div style={{ paddingTop: "1rem", fontWeight: "500", fontSize: "26px", height: "48rem" }}>
        {emailConfirmed && <p>Your E-Mail has been verified!</p>}
        {!emailConfirmed && <p>Please wait...</p>}
      </div>
    </>
  );
};

export default ConfirmEmail;
