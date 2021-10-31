import React, { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom';

import {AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./DonationItem.css";

const DonationItem = (props) => {
  const auth = useContext(AuthContext);
  const [fundraiserInfo, setFundraiserInfo] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/fundraiser/${props.fundraiser}`, 'GET', null,
          {Authorization: 'Bearer ' + auth.token}
        );
        setFundraiserInfo(responseData);
      } catch (err) {}
    };
    fetchFundraisers();
  }, [sendRequest, props.fundraiser]);

  // console.log(fundraiserInfo);

  return (
    <>
      {fundraiserInfo && (
        <div className="donation-item__container">
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${fundraiserInfo.fundraiser.image}`} alt="Can't be loaded" />
          <div>
            <Link to={`/fundraiser/${fundraiserInfo.fundraiser.id}`}><p>{fundraiserInfo.fundraiser.title}</p></Link>
            <p className="donation-item__donated-amt">
              Donated: <i class="fas fa-rupee-sign"></i> {props.donatedAmount}
            </p>
            <p className="donation-item__transaction-id">
              Transaction ID: OD116221221159111000
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationItem;
