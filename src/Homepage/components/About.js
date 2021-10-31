import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = (props) => {
  return (
    <>
      <div className="about__main-container">
        <div className="about__header-container">
          <h2>About Us</h2>
        </div>
        <div className="about__container">
          <p>
            We are Chipp, a professional fundraising organisation working for
            charities, nonprofit organisations, schools, groups and political
            campaigns to help each organisation raise the money it needs to
            serve the good cause.
          </p>
          <p>
            Our aim is to raise funds through crowdfunding, running out
            campaigns and facilitating events.
          </p>
          <div className="about__learn-more">
            <Link to="/legal/about">Learn More <i class="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
