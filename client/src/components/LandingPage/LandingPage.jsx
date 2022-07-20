import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div id="generalContainer">
      <div className="heading">
        <h1>Products</h1>
      </div>
      <div id="buttonsContainer">
        <Link to="login">
          <button className="button">Login</button>
        </Link>
        <Link to="register">
          <button className="button">Registrarse</button>
        </Link>
        <Link to="/home">
          <button className="button">Invitado</button>
        </Link>
      </div>
    </div>
  );
}
