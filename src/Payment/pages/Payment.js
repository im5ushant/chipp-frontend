import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
// import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
// import Input from "../../shared/components/FormElements/Input";
import PaymentModal from "../../shared/components/UIElements/Modal/PaymentModal";
import Button from "../../shared/components/UIElements/Button/Button";
import GoBackBtn from "../../shared/components/UIElements/Button/GoBackBtn";
import Container from "../../shared/components/UIElements/Containers/Container";
import AmountInput from "../components/AmountInput";
import "./Payment.css";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Payment = (props) => {
  const auth = useContext(AuthContext);

  const [donationAmount, setDonationAmount] = useState("0");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [fundraiserInfo, setFundraiserInfo] = useState();

  const fId = useParams().fundraiserId;

  let feeAmount = (Number(donationAmount) / 100) * 5;
  let totalAmount = Number(donationAmount) + feeAmount;

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

  const donationAmountHandler = (e) => {
    setDonationAmount(e.target.value);
  };

  const submitDonationHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/${fId}/donate`,
        "PATCH",
        JSON.stringify({
          donorId: auth.userId,
          amount: Number(donationAmount),
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let data;

    try {
      data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/razorpay`,
        "POST",
        JSON.stringify({
          amount: Number(donationAmount),
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // console.log(data);
    } catch (err) {
      console.log(err);
      return;
    }

    const options = {
      key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Chipp",
      description: "Thank you for your donation.",
      // "image": "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      // "prefill": {
      //     "name": "Gaurav Kumar",
      //     "email": "gaurav.kumar@example.com",
      //     "contact": "9999999999"
      // },
      theme: {
        color: "#202d65",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {fundraiserInfo && (
        <div className="payment__parent-container">
          <div className="payment__main-container">
            <Container classSuffix="default" classes="payment__container">
              <div className="payment__subcontainer">
                <GoBackBtn text />
              </div>
              <div className="payment__subcontainer">
                <div className="payment__fundraiser-info">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${fundraiserInfo.fundraiser.cover}`}
                    alt="Can't be loaded"
                  />
                  <div>
                    <p>
                      You're supporting{" "}
                      <strong>{fundraiserInfo.fundraiser.title}</strong>
                    </p>
                    <p style={{ fontSize: ".85rem", color: "#666" }}>
                      Your donation will benefit{" "}
                      <strong>{fundraiserInfo.fundraiser.name}</strong>
                    </p>
                  </div>
                </div>
                <div className="payment__donation-amount">
                  <p className="payment__subheading">Enter donation amount</p>
                  <AmountInput onChange={donationAmountHandler} />
                </div>
              </div>
              <div className="payment__summary-subcontainer mobile">
                <p className="payment__subheading">Your Donation</p>
                <dl>
                  <dt>Your donation</dt>
                  <dd>
                    <i class="fas fa-rupee-sign"></i>
                    {donationAmount > 0 ? donationAmount : "0"}.00
                  </dd>
                  <dt>Chipp Fee</dt>
                  <dd>
                    <i class="fas fa-rupee-sign"></i>
                    {feeAmount.toFixed(2)}
                  </dd>
                </dl>
              </div>
              <div className="payment__summary-subcontainer mobile">
                <dl style={{ color: "#111" }}>
                  <dt>Total amount</dt>
                  <dd>
                    <i class="fas fa-rupee-sign"></i>
                    {totalAmount.toFixed(2)}
                  </dd>
                </dl>
              </div>
              <div className="payment__subcontainer-noborder">
                <p>
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </p>
                <Button
                  dark
                  classes="payment__continue-btn"
                  onClick={displayRazorpay}
                >
                  Continue
                </Button>
              </div>
            </Container>
            <Container classSuffix="default" classes="payment__summary">
              <div className="payment__summary-subcontainer">
                <p className="payment__subheading">Your Donation</p>
                <dl>
                  <dt>Your donation</dt>
                  <dd>
                    <i class="fas fa-rupee-sign"></i>
                    {donationAmount > 0 ? donationAmount : "0"}.00
                  </dd>
                  <dt>Chipp Fee</dt>
                  <dd>
                    <i class="fas fa-rupee-sign"></i>
                    {feeAmount.toFixed(2)}
                  </dd>
                </dl>
              </div>
              <div className="payment__summary-subcontainer">
                <dl style={{ color: "#111" }}>
                  <dt>Total amount</dt>
                  <dd>
                    <i class="fas fa-rupee-sign"></i>
                    {totalAmount.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
