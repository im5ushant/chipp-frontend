import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import DonationItem from "./DonationItem";
import "./DonationsContent.css";

const FundraiserContent = (props) => {
  const [loadedDonations, setLoadedDonations] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // {console.log(props.userInfo.user.donations)};

  return (
    <>
      <div className="donations-content__heading">My Donations</div>
      <div className="donations-content__container">
        {props.userInfo.user.donations.map((donation) => (
          <DonationItem
            key={donation.id}
            fundraiser={donation.fundraiser}
            donatedAmount={donation.donatedAmount}
          />
        ))}
        {/* <DonationItem />
        <DonationItem />
        <DonationItem />
        <DonationItem /> */}
      </div>
    </>
  );
};

export default FundraiserContent;
