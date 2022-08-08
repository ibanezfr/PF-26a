import React from "react";
import "./Widget.scss";
import { RiArrowUpCircleFill } from "react-icons/ri";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { MdMonetizationOn, MdAccountBalance } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const Widget = ({ type, amount, ordersNumber }) => {
  let data;
  const { t } = useTranslation();
  // Valores temporales hasta que traiga los datos de la db

  const porcentage = 20;

  switch (type) {
    case "user":
      data = {
        title: t('widget.user.title'),
        isMoney: false,
        link: t('widget.user.link'),
        icon: <FaUserCircle className="icon" />,
      };
      break;

    case "order":
      data = {
        title: t('widget.order.title'),
        isMoney: false,
        link: t('widget.order.link'),
        icon: <FaShoppingCart className="icon" />,
      };
      break;

    case "earning":
      data = {
        title: t('widget.earning.title'),
        isMoney: true,
        link: t('widget.earning.link'),
        icon: <MdMonetizationOn className="icon" />,
      };
      break;

    case "balance":
      data = {
        title: t('widget.balance.title'),
        isMoney: true,
        link: t('widget.balance.link'),
        icon: <MdAccountBalance className="icon" />,
      };
      break;
    default:
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && <b>$</b>} {amount ? amount : ordersNumber}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <RiArrowUpCircleFill className="icon" />
          {porcentage}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
