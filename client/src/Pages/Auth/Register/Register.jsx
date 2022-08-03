import axios from "axios";
import React, { useState } from "react";
// import { register_post } from '../../../api_url';
import { register_post } from '../../../api_url/api_url';

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
// import { register } from "../../../redux/actions";

const Register = () => {
  const { signup } = useAuth();

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
      return setError("Passwords do not match, please try again.");
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
        <h1>Register</h1>

        {error && <span className="error"> {error} </span>}
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Your Name"
            name="email"
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
          />
          {/* <p className="error" id="username-error">
          {" "}
          * Username is required !{" "}
        </p> */}

          <input
            className="form-input"
            type="email"
            placeholder="Your Email"
            id="password"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <input
            className="form-input"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <input
            className="form-input"
            type="password"
            placeholder="Repeat Password"
            id="password"
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
          />

          <button className="login-btn" type="submit">
            {" "}
            Sign Up!
          </button>
        </form>

        <p className="form-footer">
          {" "}
          Already have an account ? <Link to="/login"> Sign In!</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
