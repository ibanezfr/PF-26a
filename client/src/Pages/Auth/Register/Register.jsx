import axios from "axios";
import React, { useState } from "react";
import { register_post } from '../../../api_url/api_url';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from 'react-i18next';
// import { register } from "../../../redux/actions";

const Register = () => {
  const { signup } = useAuth();
  const { t } = useTranslation();
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newUser.confirmPassword !== newUser.password) {
      return setError(t('register.notMatching'));
    }
    try {
      const credentials = await signup(newUser.email, newUser.password);
      const userInDb = await axios.post(register_post, {
        id: credentials.user.uid,
        name: credentials.user.displayName,
        email: credentials.user.email,
        image: credentials.user.photoURL,
      });
      console.log(userInDb);
      if (credentials.user.uid) {
        localStorage.setItem("usuario", JSON.stringify(credentials.user.uid));
      }

      history.push("/");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password"
      ) {
        setError("Invalid credentials");
      }
    }
  }; //auth/invalid-email auth/weak-password

  return (
    <div className="login">
      <section id="login-window">
        <h1>{t('register.register')}</h1>

        {error && <span className="error"> {error} </span>}
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder={t('register.placeHolderName')}
            name="email"
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
          />

          <input
            className="form-input"
            type="email"
            placeholder={t('register.placeHolderEmail')}
            id="password"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <input
            className="form-input"
            type="password"
            placeholder={t('register.placeHolderPassword')}
            id="password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <input
            className="form-input"
            type="password"
            placeholder={t('register.placeHolder2Password')}
            id="password"
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
          />

          <button className="login-btn" type="submit">
            {" "}
            {t('register.signUp')}
          </button>
        </form>

        <p className="form-footer">
          {" "}
          {t('register.already')}<Link to="/login"> {t('register.signIn')}</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
