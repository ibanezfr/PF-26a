import React from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.scss";
import {
  MdDashboardCustomize,
  MdSettings,
  MdSettingsSystemDaydream,
  MdQueryStats,
  MdNotifications,
} from "react-icons/md";
import { SiLogstash, SiProducthunt } from "react-icons/si";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin Panel</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <MdDashboardCustomize className="icons" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>

          <li>
            <FaUserCircle className="icons" />
            <span>Users</span>
          </li>
          <li>
            <SiProducthunt className="icons" />
            <span>Products</span>
          </li>
          <Link to="/admin/creation">
            <SiProducthunt className="icons" />
            <span>Creation form</span>
          </Link>
          <li>
            <FaShoppingCart className="icons" />
            <span>Orders</span>
          </li>
          <li>
            <MdSettings className="icons" />
            <span>Settings</span>
          </li>
          <p className="title">USEFUL</p>

          <li>
            <MdQueryStats className="icons" />
            <span>Stats</span>
          </li>
          <li>
            <MdNotifications className="icons" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>

          <li>
            <MdSettingsSystemDaydream className="icons" />
            <span>System</span>
          </li>
          <li>
            <SiLogstash className="icons" />
            <span>Logs</span>
          </li>
          <p className="title">USER</p>

          <li>
            <ImProfile className="icons" />
            <span>Profile</span>
          </li>
          <li>
            <RiLogoutBoxFill className="icons" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
