import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <h3 className="main-link">
        Contact Us
        <div className="sub-links">
          <p>Adrress: Zarqa/Al-Zawahry 132</p>
          <p>Email: emarkt@shop.jo</p>
          <p>Telefon: +962-4-553 383</p>
          <p>Mobile: +962-785 689 530</p>
        </div>
      </h3>

      <h3 className="main-link">
        Let Us Help YOU
        <div className="sub-links">
          <p>Emarkt</p>
          <p>Shipping Rates {`&`} Policies</p>
          <p>Help</p>
        </div>
      </h3>

      <h3 className="main-link">
        About Us
        <div className="sub-links">
          <p>Careers</p>
          <p>Blog</p>
        </div>
      </h3>
    </div>
  );
};

export default Footer;
