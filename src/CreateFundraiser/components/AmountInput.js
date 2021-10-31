import React, { useState } from "react";

import "./AmountInput.css";

const AmountInput = (props) => {
  const [inputValue, setInputValue] = useState();
  const [isValid, setIsValid] = useState(props.valid);

  const changeHandler = (e) => {
    if (!isNaN(e.target.value)) {
      setInputValue(e.target.value);
      props.onChange(e);
    }
    if(e.target.value>=5000){
      setIsValid(true);
    }
  };

  const touchHandler = () => {
    if (!inputValue || inputValue < 5000) {
      setIsValid(false);
    }
  };

  return (
    <div className="create-fundraiser-amount__main-container">
      <div
        className={
          isValid ? "create-fundraiser-amount__container" : "create-fundraiser-amount__container error"
        }
      >
        <div className="create-fundraiser-amount__prefix-suffix">
          <i class="fas fa-rupee-sign"></i>
        </div>
        <input
          type="text"
          className="create-fundraiser-amount__input create-fundraiser-amount__input-font-large"
          onBlur={touchHandler}
          value={inputValue}
          onChange={(e) => changeHandler(e)}
        />
        <div className="create-fundraiser-amount__prefix-suffix create-fundraiser-amount__input-font-large">
          .00
        </div>
      </div>
      {!isValid && (
        <div className="create-fundraiser-amount__error">
          <p>Please enter a donation amount (minimum Rs.5000)</p>
        </div>
      )}
    </div>
  );
};

export default AmountInput;
