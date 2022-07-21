import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import Search from "../Search/Search.jsx";
import carrito from '../../images/carrito.png';

export default function Nav() {
  return (
    <div className="space">
      <nav className="navBar">
        <div className="nav">
          <ul className="navbar-nav">
            <li className="text-nav">
              <Link to="" className="link-nav">
                <div className="line">Inicio</div>
              </Link>
            </li>
            <Search />
            <li className="text-nav">
              <Link to="/products" className="link-nav">
                <div>ALGO</div>
              </Link>
            </li>
            <li className="text-nav">
              <Link className="link-nav">
                <div>LogIn</div>
              </Link>
            </li>
          </ul>
          <img src={carrito} alt="not found" className="imageCar"/>
        </div>
      </nav>
    </div>
  );
}
