import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineFacebook,
  AiOutlineLinkedin,
} from "react-icons/ai";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer-container">
      <p>{t('footer.p')}</p>
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
