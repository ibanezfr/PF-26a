import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./SidebarAdmin.scss";
import {
  MdDashboardCustomize,
  MdSettings,
  MdSettingsSystemDaydream,
  MdQueryStats,
  MdNotifications,
} from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { SiLogstash, SiProducthunt } from "react-icons/si";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

const SidebarAdmin = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.clear();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">{t("sidebarAdmin.spanLogo")}</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">{t("sidebarAdmin.pTitle")}</p>
          <li>
            <Link to="/admin/home" className="link">
              <MdDashboardCustomize className="icons" />
              <span>{t("sidebarAdmin.linkDashboard")}</span>
            </Link>
          </li>
          <p className="title">{t("sidebarAdmin.pLists")}</p>

          <li>
            <Link to="/admin/users" className="link">
              <FaUserCircle className="icons" />
              <span>{t("sidebarAdmin.spanUsers")}</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="link">
              <SiProducthunt className="icons" />
              <span>{t("sidebarAdmin.spanProducts")}</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/categorias" className="link">
              <AiOutlineForm className="icons" />
              <span>{t('sidebarAdmin.spanCategories')}</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/orders" className="link">
              <FaShoppingCart className="icons" />
              <span>{t("sidebarAdmin.spanOrders")}</span>
            </Link>
          </li>

          <p className="title">{t("sidebarAdmin.pUtils")}</p>
          <li>
            <Link to="/admin/qas" className="link">
              <AiOutlineForm className="icons" />
              <span>{t('sidebarAdmin.spanQuestions')}</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/creation" className="link">
              <AiOutlineForm className="icons" />
              <span>{t("sidebarAdmin.spanCreationForm")}</span>
            </Link>
          </li>
          <li>
            <MdQueryStats className="icons" />
            <span>{t("sidebarAdmin.spanStats")}</span>
          </li>
          <li>
            <MdNotifications className="icons" />
            <span>{t("sidebarAdmin.spanNotis")}</span>
          </li>
          <p className="title">{t("sidebarAdmin.pService")}</p>

          <li>
            <MdSettingsSystemDaydream className="icons" />
            <span>{t("sidebarAdmin.spanSystem")}</span>
          </li>
          <li>
            <MdSettings className="icons" />
            <span>{t("sidebarAdmin.spanSettings")}</span>
          </li>
          <p className="title">{t("sidebarAdmin.pUser")}</p>

          <li>
            <Link to="/profile" className="link">
              <ImProfile className="icons" />
              <span>{t("sidebarAdmin.spanProfile")}</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <RiLogoutBoxFill className="icons" />
            <span>{t("sidebarAdmin.spanQuit")}</span>
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
