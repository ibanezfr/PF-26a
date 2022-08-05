import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import "./Login.css";
import { useAuth } from "../../../context/AuthContext";

import axios from "axios";
import { login_post } from "../../../api_url/api_url";

const Login = () => {
  const { t } = useTranslation();
  const { login, loginWithGoogle, resetPass, logout } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      setError(t('login.suspension'));
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = await login(user.email, user.password);
      const userInDb = await axios.post(login_post, {
        id: credentials.user.uid,
        fullName: credentials.user.displayName,
        email: credentials.user.email,
        image: credentials.user.photoURL,
      });

      if (userInDb.data[0].banned === true) {
        return handleLogout();
      }

      if (credentials.user.uid) {
        localStorage.setItem("usuario", JSON.stringify(credentials.user.uid));
      }
      if (userInDb.data[0].isAdmin) {
        localStorage.setItem(
          "isAdmin",
          JSON.stringify(credentials.user.accessToken)
        );
      }

      console.log(userInDb.data[0].isAdmin);
      history.push("/profile");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError(t('login.invalidCred'));
      } else setError(error.message);
    }
  }; //auth/invalid-email auth/weak-password

  const handleGoogle = async () => {
    try {
      const credentials = await loginWithGoogle();

      const userInDb = await axios.post(login_post, {
        id: credentials.user.uid,
        fullName: credentials.user.displayName,
        email: credentials.user.email,
        image: credentials.user.photoURL,
      });

      if (userInDb.data[0].banned === true) {
        return handleLogout();
      }

      if (credentials.user.uid) {
        localStorage.setItem("usuario", JSON.stringify(credentials.user.uid));
      }
      if (userInDb.data[0].isAdmin) {
        localStorage.setItem(
          "isAdmin",
          JSON.stringify(credentials.user.accessToken)
        );
      }
      console.log(userInDb.data[0].isAdmin);

      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPass = async (e) => {
    e.preventDefault();
    if (!user.email) return setError(t('login.reset.email'));
    try {
      await resetPass(user.email);
      alert(t('login.reset.sentEmail'));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <section id="login-window">
        <h1>{t('login.h1')}</h1>
        <p className="error" id="username-error">
          {error && <span className="error"> {error} </span>}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder={t('login.emailInput')}
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="form-input"
            type="password"
            placeholder={t('login.passwordInput')}
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button className="login-btn" type="submit">
            {" "}
            {t('login.login')}
          </button>
        </form>

        <div className="social">
          <button onClick={handleGoogle}>
            <i className="fa fa-google">
              <FcGoogle />
            </i>{" "}
            Google
          </button>
        </div>

        <p className="form-footer">
          <a href="#!" onClick={handleResetPass}>
            {t('login.forgotPass')}
          </a>
          <br />
          {t('login.notMember')}<Link to="/register"> {t('login.signUp')}</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
