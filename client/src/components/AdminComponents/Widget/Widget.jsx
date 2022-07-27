import React from "react";
import "./Widget.scss";
import { RiArrowUpCircleFill } from "react-icons/ri";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { MdMonetizationOn, MdAccountBalance } from "react-icons/md";

const Widget = ({ type }) => {
  let data;

  // Valores temporales hasta que traiga los datos de la db
  const amount = 100;
  const porcentage = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all Users",
        icon: <FaUserCircle className="icon" />,
      };
      break;

    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all Orders",
        icon: <FaShoppingCart className="icon" />,
      };
      break;

    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: <MdMonetizationOn className="icon" />,
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
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
          {data.isMoney && "$"} {amount}
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
