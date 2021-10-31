import React, { useState } from "react";

import { useForm } from "../../../hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_NUMBER,
} from "../../../util/validators";
import Input from "../../FormElements/Input";
import Button from "../Button/Button";
import Modal from "./Modal";
import "./PaymentModal.css";

const PaymentModal = (props) => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      cardNo: {
        value: "",
        isValid: false,
      },
      cardExp: {
        value: "",
        isValid: false,
      },
      cardCvv: {
        value: "",
        isValid: false,
      },
      cardName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(formState.inputs);
  };

  const [isCard, setIsCard] = useState(true);
  const [isNetBanking, setIsNetBanking] = useState(false);
  const [isPaytm, setIsPaytm] = useState(false);
  const [isUPI, setIsUPI] = useState(false);
  const [isWallets, setIsWallets] = useState(false);

  const paymentMethodHandler = (e) => {
    let id = e.target.id;
    if (id === "card") {
      setIsCard(true);
      setIsNetBanking(false);
      setIsPaytm(false);
      setIsUPI(false);
      setIsWallets(false);
    } else if (id === "net-banking") {
      setIsCard(false);
      setIsNetBanking(true);
      setIsPaytm(false);
      setIsUPI(false);
      setIsWallets(false);
    } else if (id === "paytm") {
      setIsCard(false);
      setIsNetBanking(false);
      setIsPaytm(true);
      setIsUPI(false);
      setIsWallets(false);
    } else if (id === "UPI") {
      setIsCard(false);
      setIsNetBanking(false);
      setIsPaytm(false);
      setIsUPI(true);
      setIsWallets(false);
    } else if (id === "wallets") {
      setIsCard(false);
      setIsNetBanking(false);
      setIsPaytm(false);
      setIsUPI(false);
      setIsWallets(true);
    }
  };

  return (
    <>
      <Modal
        show={props.showModal}
        onCancel={props.onCancel}
        contentClass="payment-modal__content"
        header={
          <>
            <div className="payment-modal__header">
              <div className="payment-modal__header-content">
                Choose payment option
              </div>
            </div>
          </>
        }
        footer={
          <div className="payment-modal__footer">
            On clicking "Pay" button you might be taken to your bank's website
            for 3D secure authentication
          </div>
        }
        footerClass="payment-modal__footer"
      >
        <div className="payment-modal__content-main-container">
          <div className={"payment-modal__payment-options-container"}>
            <div
              id="card"
              className={`payment-modal__payment-option ${isCard}`}
              onClick={(e) => paymentMethodHandler(e)}
            >
              <i class="far fa-credit-card"></i>
              <span>Debit/Credit</span>
            </div>
            <div
              id="net-banking"
              className={`payment-modal__payment-option ${isNetBanking}`}
              onClick={(e) => paymentMethodHandler(e)}
            >
              <i class="fas fa-university"></i>
              <span>Net Banking</span>
            </div>
            <div
              id="paytm"
              className={`payment-modal__payment-option ${isPaytm}`}
              onClick={(e) => paymentMethodHandler(e)}
            >
              <i class="fas fa-mobile-alt"></i>
              <span>Paytm</span>
            </div>
            <div
              id="UPI"
              className={`payment-modal__payment-option ${isUPI}`}
              onClick={(e) => paymentMethodHandler(e)}
            >
              <i class="fas fa-mobile"></i>
              <span>UPI</span>
            </div>
            <div
              id="wallets"
              className={`payment-modal__payment-option ${isWallets}`}
              onClick={(e) => paymentMethodHandler(e)}
            >
              <i class="fas fa-wallet"></i>
              <span>Wallets</span>
            </div>
          </div>
          {isCard && (
            <div className="payment-modal__card-form-container">
              <form onSubmit={authSubmitHandler}>
                <div>
                  <Input
                    element="input"
                    id="cardNo"
                    type="text"
                    placeholder="Card Number"
                    validators={[
                      VALIDATOR_MINLENGTH(16),
                      VALIDATOR_MAXLENGTH(16),
                      VALIDATOR_NUMBER(),
                    ]}
                    errorText="Invalid Card"
                    onInput={inputHandler}
                  />
                  <Input
                    element="input"
                    id="cardExp"
                    type="text"
                    placeholder="Exp Date"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Invalid Date"
                    onInput={inputHandler}
                  />
                  <Input
                    element="input"
                    id="cardCvv"
                    type="text"
                    placeholder="CVV / CVC"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Invalid Code"
                    onInput={inputHandler}
                  />
                  <Input
                    element="input"
                    id="cardName"
                    type="text"
                    placeholder="Name on Card"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Field Required"
                    onInput={inputHandler}
                  />
                  <Button dark disabled={!formState.isValid} type="submit">
                    Pay
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
