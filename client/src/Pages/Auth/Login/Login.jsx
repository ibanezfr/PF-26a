import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Login.css";
import { useAuth } from "../../../context/AuthContext";
import { loginUser } from "../../../redux/actions";

const Login = () => {
  const { login, loginWithGoogle, resetPass } = useAuth();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleRedirect = async () => {
    const check = await JSON.parse(localStorage.getItem("usuario"));
    if (check) {
      history.push("/profile");
    }
  };
  useEffect(() => {
    handleRedirect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = await login(user.email, user.password);
      dispatch(
        loginUser({
          id: credentials.user.uid,
          fullName: credentials.user.displayName,
          email: credentials.user.email,
          // image: credentials.user.photoURL,
        })
      );

      history.push("/profile");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid credentials");
      } else setError(error.message);
    }
  }; //auth/invalid-email auth/weak-password

  const handleGoogle = async () => {
    try {
      const credentials = await loginWithGoogle();
      dispatch(
        loginUser({
          id: credentials.user.uid,
          fullName: credentials.user.displayName,
          email: credentials.user.email,
          image: credentials.user.photoURL,
        })
      );

      history.push("/profile");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPass = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset your Password");
    try {
      await resetPass(user.email);
      alert("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id="login-window">
      <h1>LOGIN</h1>
      <p className="error" id="username-error">
        {error && <span className="error"> {error} </span>}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="form-input"
          type="password"
          placeholder="********"
          id="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="login-btn" type="submit">
          {" "}
          Login
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
          Forgot Password?
        </a>
        <br />
        Not a member ? <Link to="/register"> Sign Up</Link>
      </p>
    </section>

    // <Container
    //   classNameName="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
    //   <div classNameName="w-100" style={{ maxWidth: "400px" }}>
    //     <Card>
    //       <Card.Body>
    //         <h2 classNameName="text-center mb-4">Login</h2>
    //         {error && <span classNameName="text-danger">{error}</span>}

    //         <Form onSubmit={handleSubmit}>
    //           <Form.Group id="email">
    //             <Form.Label>Email</Form.Label>
    //             <Form.Control
    //               type="email"
    //               placeholder="Email"
    //               name="email"
    //               onChange={(e) => setUser({ ...user, email: e.target.value })}
    //             />
    //           </Form.Group>
    //           <Form.Group id="password">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               placeholder="********"
    //               id="password"
    //               onChange={(e) =>
    //                 setUser({ ...user, password: e.target.value })
    //               }
    //             />
    //           </Form.Group>
    //           <a href="#!" onClick={handleResetPass}>
    //             <h6 classNameName="text-center mb-4 mt-2"> Forgot Password? </h6>
    //           </a>
    //           <Button classNameName="w-100 mb-2" type="submit">
    //             Sign In!
    //           </Button>
    //         </Form>
    //         <Button classNameName="w-100" variant="danger" onClick={handleGoogle}>
    //           Login with Google
    //         </Button>
    //       </Card.Body>
    //     </Card>
    //     <div classNameName="w-100 text-center mt-2">
    //       <Link to="/register">Or create an Account</Link>
    //     </div>
    //   </div>
    // </Container>
  );
};

export default Login;
