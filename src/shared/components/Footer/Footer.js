import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./Footer.css";

const Footer = (props) => {
  return (
    <>
      <div className="footer__main-container">
        <div className="footer__container">
          <div className="footer__logo-container">
            <img src={"/images/logo/logo_white.svg"} />
            <h2>we care for you</h2>
          </div>
          <div className="footer__contact-container">
            <h4>Reach Us</h4>
            <div className="footer__email">
              <i class="fas fa-envelope"></i>&nbsp;&nbsp;contactus@chipp.co.in
            </div>
            {/* <div className="footer__mobile"><i class="fas fa-phone-alt"></i>&nbsp;&nbsp;+91 82992 04426</div>
              <div className="footer__mobile"><i class="fas fa-phone-alt"></i>&nbsp;&nbsp;+91 82992 04426</div> */}
            <div className="footer__address"></div>
          </div>
          <div className="footer__social-container">
            <h4>Follow Us</h4>
            <div className="footer__social-icon-container">
              <div className="footer__social-icon first-icon">
                <i class="fab fa-facebook-f"></i>
              </div>
              <div className="footer__social-icon">
                <i class="fab fa-instagram"></i>
              </div>
              <div className="footer__social-icon">
                <i class="fab fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__legal-container">
        <div>© 2021 chipp.co.in. All rights reserved</div>
        <div className="footer__legal-links">
          <Link to="/legal/terms">Terms and Conditions</Link>|
          <Link to="/legal/privacypolicy">Privacy Policy</Link>|
          <Link to="/legal/security">Security</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
