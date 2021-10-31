import React from "react";

import FundraiserUpdate from './FundraiserUpdate';
import "./FundraiserUpdates.css";

const FundraiserUpdates = (props) => {

  return (
    <>
      <h3 className="fundraiser-updates__heading">Updates</h3>
      {props.fundraiserInfo.updates.length > 0 && <div className="fundraiser-updates__updates-container">
        {props.fundraiserInfo.updates.map(update => (
          <FundraiserUpdate key={update.id} date={update.date} content={update.content} /> 
        ))}
      </div>}
      {props.fundraiserInfo.updates.length === 0 && <p><i>This fundraiser has no updates yet.</i></p>}
    </>
  );
};

export default FundraiserUpdates;
