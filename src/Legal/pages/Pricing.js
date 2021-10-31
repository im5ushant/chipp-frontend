import React from "react";

import Container from "../components/Container";
import PricingCard from "../components/PricingCard";

import "./Pricing.css";

const Pricing = (props) => {
  return (
    <>
      <Container heading="Pricing">
        <div className="pricing__main-container">
          <div className="pricing__heading">
            <h1>Simple Pricing</h1>
            <p>Choose what suits you the most!</p>
          </div>
          <div className="pricing__container">
            <PricingCard heading="STANDARD" percentage="0%*">
              <p className="pricing__sub-heading">
                <i>Applicable to both NGOs and individuals</i>
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Local Payment
                Gateway
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Fundraiser upto 1
                Lakh
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Real Time Support
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Share Fundraiser
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Upto two
                fundraisers
              </p>
            </PricingCard>
            <PricingCard heading="PREMIUM" percentage="4%*">
              <p className="pricing__sub-heading">
                <i>Applicable to both NGOs and individuals</i>
              </p>
              <p className="pricing__prev-feature">
                STANDARD FEATURES
                <br />+
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Multiple
                Fundraisers
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;No limit on
                campaign goals
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Social Media
                Outreach
              </p>
              <p className="pricing__feature-list-item">
                <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Fundraiser
                Assistance
              </p>
            </PricingCard>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Pricing;
