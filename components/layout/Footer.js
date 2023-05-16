import isMobile from "is-mobile";
import React, { useEffect, useState } from "react";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { SiPaytm } from "react-icons/si";
import Bot_Footer from "./Bot_Footer";

const Footer = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const containerStyle = {
    marginBottom: isMobileDevice ? "5rem" : 0,
  };
  return (
    <div className="footer" style={containerStyle}>
      <div className="footer_">
        <div className="footer__tit">
          <p>Urban Bliss</p>
          <p>Specialises in providing high quality, latest in trend clothes.</p>
        </div>
        <div className="footer__cont">
          <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>SHOP</p>
          <p>All Collections</p>
          <p>Winter Edition</p>
          <p>Discount</p>
        </div>
        <div className="footer__cont">
          <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>COMPANY</p>
          <p>About Us</p>
          <p>Contact</p>
          <p>Affilates</p>
        </div>
        <div className="footer__cont">
          <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>SUPPORT</p>
          <p>FAQs</p>
          <p>Cookie Policy</p>
          <p>Terms of Use</p>
        </div>
        <div className="footer__pay">
          <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
            PAYMENT METHODS
          </p>
          <div className="footer__pay_">
            <RiVisaLine />
            <SiPaytm />
            <RiMastercardFill />
          </div>
        </div>
      </div>
      <Bot_Footer />
    </div>
  );
};

export default Footer;
