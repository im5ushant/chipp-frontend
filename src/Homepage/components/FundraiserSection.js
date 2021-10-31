import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import { Link, useHistory } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card/Card";

import "./FundraiserSection.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const FundraiserSection = (props) => {
  const [fundraiser1, setFundraiser1] = useState({
    active: true,
    amount: 15000,
    category: "Education",
    city: "Bheemunipatnam",
    collectionAmt: 0,
    cover:
      "uploads/images/fundraisers/97373230-426c-42a8-acd5-b75bfd57ea03.jpeg",
    created_at: "2021-05-20T22:59:49.663Z",
    creator: "6084aeb0cc59a750ba33bd86",
    creatorName: "Sushant Dev Singh",
    description: "asdfsfasdfsadfaasdfasdfasdfasdfasdfasefa",
    documents: [
      "uploads/images/documents/dceb6f7c-a265-48d0-8821-5aec7733869f.jpeg",
    ],
    donors: [],
    id: "60a6e9e51031f657a915e374",
    name: "Hamza Hashmi",
    state: "Andhra Pradesh",
    title: "India Gate",
    updated_at: "2021-05-20T22:59:50.138Z",
    updates: [],
    __v: 1,
    _id: "60a6e9e51031f657a915e374",
  });
  const [fundraiser2, setFundraiser2] = useState({
    active: true,
    amount: 15000,
    category: "Education",
    city: "Bheemunipatnam",
    collectionAmt: 0,
    cover:
      "uploads/images/fundraisers/97373230-426c-42a8-acd5-b75bfd57ea03.jpeg",
    created_at: "2021-05-20T22:59:49.663Z",
    creator: "6084aeb0cc59a750ba33bd86",
    creatorName: "Sushant Dev Singh",
    description: "asdfsfasdfsadfaasdfasdfasdfasdfasdfasefa",
    documents: [
      "uploads/images/documents/dceb6f7c-a265-48d0-8821-5aec7733869f.jpeg",
    ],
    donors: [],
    id: "60a6e9e51031f657a915e374",
    name: "Hamza Hashmi",
    state: "Andhra Pradesh",
    title: "India Gate",
    updated_at: "2021-05-20T22:59:50.138Z",
    updates: [],
    __v: 1,
    _id: "60a6e9e51031f657a915e374",
  });
  const [fundraiser3, setFundraiser3] = useState({
    active: true,
    amount: 15000,
    category: "Education",
    city: "Bheemunipatnam",
    collectionAmt: 0,
    cover:
      "uploads/images/fundraisers/97373230-426c-42a8-acd5-b75bfd57ea03.jpeg",
    created_at: "2021-05-20T22:59:49.663Z",
    creator: "6084aeb0cc59a750ba33bd86",
    creatorName: "Sushant Dev Singh",
    description: "asdfsfasdfsadfaasdfasdfasdfasdfasdfasefa",
    documents: [
      "uploads/images/documents/dceb6f7c-a265-48d0-8821-5aec7733869f.jpeg",
    ],
    donors: [],
    id: "60a6e9e51031f657a915e374",
    name: "Hamza Hashmi",
    state: "Andhra Pradesh",
    title: "India Gate",
    updated_at: "2021-05-20T22:59:50.138Z",
    updates: [],
    __v: 1,
    _id: "60a6e9e51031f657a915e374",
  });

  return (
    <>
      <div className="home-fundraiser-section__main-container">
        <div className="home-fundraiser-section__header-container">
          <h2>Fundraisers</h2>
        </div>
        <div className="home-fundraiser-section__tools">
          <Link className="home-fundraiser-section__see-all-container" to="/crowdfunding/fundraisers">
            <div>
              <i class="fas fa-search"></i>
              <br />
              See All
            </div>
          </Link>
        </div>
        <div className="home-fundraiser-section__container">
          <Carousel
            enableAutoPlay
            autoPlaySpeed={4000}
            showArrows={false}
            breakPoints={breakPoints}
          >
            <Card
              classes="home-fundraiser-section__card"
              key={fundraiser1.id}
              id={fundraiser1.id}
              image={fundraiser1.cover}
              pincode={fundraiser1.pincode}
              title={fundraiser1.title}
              description={fundraiser1.description}
              amount={fundraiser1.amount}
              collectionAmt={fundraiser1.collectionAmt}
              chipp
            />
            <Card
              classes="home-fundraiser-section__card"
              key={fundraiser2.id}
              id={fundraiser2.id}
              image={fundraiser2.cover}
              pincode={fundraiser2.pincode}
              title={fundraiser2.title}
              description={fundraiser2.description}
              amount={fundraiser2.amount}
              collectionAmt={fundraiser2.collectionAmt}
              chipp
            />
            <Card
              classes="home-fundraiser-section__card"
              key={fundraiser3.id}
              id={fundraiser3.id}
              image={fundraiser3.cover}
              pincode={fundraiser3.pincode}
              title={fundraiser3.title}
              description={fundraiser3.description}
              amount={fundraiser3.amount}
              collectionAmt={fundraiser3.collectionAmt}
              chipp
            />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default FundraiserSection;
