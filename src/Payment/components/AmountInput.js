import React, { useState } from "react";

import "./AmountInput.css";

const AmountInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const changeHandler = (e) => {
    if (!isNaN(e.target.value)) {
      setIsValid(true);
      setInputValue(e.target.value);
      props.onChange(e);
    }
  };

  const touchHandler = () => {
    if (inputValue.length === 0) {
      setIsValid(false);
    }
  };

  return (
    <>
      <div
        className={
          isValid ? "amount-input__container" : "amount-input__container error"
        }
      >
        <div className="amount-input__prefix-suffix">
          <i class="fas fa-rupee-sign"></i>
        </div>
        <input
          type="text"
          className="amount-input__input amount-input__input-font-large"
          onBlur={touchHandler}
          value={inputValue}
          onChange={(e) => changeHandler(e)}
        />
        <div className="amount-input__prefix-suffix amount-input__input-font-large">
          .00
        </div>
      </div>
      {!isValid && (
        <div className="amount-input__error">
          <p>*Please enter a donation amount</p>
        </div>
      )}
    </>
  );
};

export default AmountInput;
