import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CardContainer from "../../shared/components/UIElements/Containers/CardContainer";
import Card from "../../shared/components/UIElements/Card/Card";
import "./FundraisersContent.css";

const FundraiserContent = (props) => {
  const auth = useContext(AuthContext);
  const [userFundraisers, setUserFundraisers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/fundraiser/user/${props.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setUserFundraisers(responseData.fundraisers);
      } catch (err) {}
    };
    fetchFundraisers();
  }, [sendRequest, props.userId]);

  let sortedUserFundraisers;

  if (!isLoading && userFundraisers) {
    sortedUserFundraisers = sort_by_key(userFundraisers, "id");
  }

  const fundraiserDeletedHandler = (deletedFundraiserId) => {
    window.location.reload();
  };

  return (
    <>
      <CardContainer
        classes="fundraisers-content__container"
        heading="My Fundraisers"
      >
        {!isLoading &&
          userFundraisers &&
          sortedUserFundraisers.map((fundraiser) => (
            <Card
              disabled={!fundraiser.active}
              key={fundraiser.id}
              id={fundraiser.id}
              image={fundraiser.cover}
              pincode={fundraiser.pincode}
              title={fundraiser.title}
              description={fundraiser.description}
              amount={fundraiser.amount}
              collectionAmt={fundraiser.collectionAmt}
              onDelete={fundraiserDeletedHandler}
              edit
            />
          ))}

        {/* <Card edit></Card>
        <Card edit></Card>
        <Card edit></Card>
        <Card edit></Card>
        <Card edit></Card> */}
      </CardContainer>
    </>
  );
};

export default FundraiserContent;
