import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { Card, Button, Form, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const { login, loginWithGoogle, resetPass } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      history.push("/profile");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password"
      ) {
        setError("Invalid credentials");
      } else setError(error.message);
    }
  }; //auth/invalid-email auth/weak-password

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      history.push("/profile");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPass = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPass(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <span className="text-danger">{error}</span>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  id="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Form.Group>
              <a href="#!" onClick={handleResetPass}>
                <h6 className="text-center mb-4 mt-2"> Forgot Password? </h6>
              </a>
              <Button className="w-100 mb-2" type="submit">
                Sign In!
              </Button>
            </Form>
            <Button className="w-100" variant="danger" onClick={handleGoogle}>
              Login with Google
            </Button>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/register">Or create an Account</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
