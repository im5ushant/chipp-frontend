import React from "react";

import "./Contributor.css";

const Contributor = (props) => {
  let amount = Number(props.amount);
  let finalAmount = amount;
  if(amount>10000000){
    amount = amount / 10000000;
    finalAmount = amount.toFixed(1) + 'Cr';
  } else if(amount>100000){
    amount = amount / 100000;
    finalAmount = amount.toFixed(1) + 'L';
  } else if(amount > 10000){
    amount = amount / 1000;
    finalAmount = amount.toFixed(1) + 'K';
  }

  return (
    <>
      <div className="contributer__container">
        <div className="contributer__name">{props.children}</div>
        <div className="contributer__amount">&#8377; {finalAmount}</div>
      </div>
    </>
  );
};

export default Contributor;
