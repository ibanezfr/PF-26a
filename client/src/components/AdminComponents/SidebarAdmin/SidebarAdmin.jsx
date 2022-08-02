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

const SidebarAdmin = () => {
  const history = useHistory();

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
        <span className="logo">Panel del administrador</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Principal</p>
          <li>
            <MdDashboardCustomize className="icons" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTAS</p>

          <li>
            <Link to="/admin/users">
              <FaUserCircle className="icons" />
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="link">
              <SiProducthunt className="icons" />
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/creation" className="link">
              <AiOutlineForm className="icons" />
              <span>Formulario de creación</span>
            </Link>
          </li>
          <li>
            <FaShoppingCart className="icons" />
            <span>Órdenes</span>
          </li>
          <li>
            <MdSettings className="icons" />
            <span>Configuración</span>
          </li>
          <p className="title">Útiles</p>

          <li>
            <MdQueryStats className="icons" />
            <span>Estadísticas</span>
          </li>
          <li>
            <MdNotifications className="icons" />
            <span>Notificaciones</span>
          </li>
          <p className="title">SERVICIO</p>

          <li>
            <MdSettingsSystemDaydream className="icons" />
            <span>Sistema</span>
          </li>
          <p className="title">USUARIO</p>

          <li>
            <Link to="/profile">
              <ImProfile className="icons" />
              <span>Perfil</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <RiLogoutBoxFill className="icons" />
            <span>Salir</span>
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
