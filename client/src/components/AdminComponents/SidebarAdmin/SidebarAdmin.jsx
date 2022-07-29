import React from "react";
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
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
const SidebarAdmin = () => {
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

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
            <Link to="/admin/products" className="link">
              <SiProducthunt className="icons" />
              <span>Products</span>
            </Link>
          </li>
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
            <Link to="/profile">
              <ImProfile className="icons" />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
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
