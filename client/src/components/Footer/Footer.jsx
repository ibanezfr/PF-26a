import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineFacebook,
  AiOutlineLinkedin,
} from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 loremIpsum All rights reserverd</p>
      <p className="icons">
        <AiOutlineGithub />
        <AiOutlineLinkedin />
        <AiOutlineFacebook />
        <AiOutlineInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
