import React from "react";

import Card from "../../shared/components/UIElements/Card/Card";

const FundraisersList = (props) => {
  return (
    <>
      {props.items.map((fundraiser) => (
        <>
          <Card
            key={fundraiser.id}
            id={fundraiser.id}
            image={fundraiser.cover}
            pincode={fundraiser.pincode}
            title={fundraiser.title}
            description={fundraiser.description}
            amount={fundraiser.amount}
            collectionAmt={fundraiser.collectionAmt}
            chipp
          />
        </>
      ))}
    </>
  );
};

export default FundraisersList;
