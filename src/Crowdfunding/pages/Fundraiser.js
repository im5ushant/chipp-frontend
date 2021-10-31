import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import FundraiserDetail from "../components/FundraiserDetail";
import FundraiserUpdates from "../components/FundraiserUpdates";
import DonateCard from "../components/DonateCard";
import "./Fundraiser.css";
import { useParams } from "react-router";

const Fundraiser = (props) => {
  const [fundraiserInfo, setFundraiserInfo] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fId = useParams().fundraiserId;

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/${fId}`
        );
        setFundraiserInfo(responseData);
      } catch (err) {}
    };
    fetchFundraisers();
  }, [sendRequest, fId]);

  return (
    <>
      {fundraiserInfo && (
        <div className="fundraiser__main-container">
          <div className="fundraiser__heading">
            <div className="fundraiser__subheading">{fundraiserInfo.fundraiser.title}</div>
          </div>

          <div className="fundraiser__container">
            <div className="fundraiser__details-container">
              <FundraiserDetail fundraiserInfo={fundraiserInfo.fundraiser}/>
              <FundraiserUpdates fundraiserInfo={fundraiserInfo.fundraiser}/>
            </div>
            <div className="fundraiser__donate-now-card">
              <DonateCard fundraiserInfo={fundraiserInfo.fundraiser}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fundraiser;
