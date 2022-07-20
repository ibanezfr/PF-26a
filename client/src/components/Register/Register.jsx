import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { Card, Button, Form, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const { signup } = useAuth();

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
      await signup(user.email, user.password);
      history.push("/profile");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password"
      ) {
        setError("Invalid credentials");
      }
      // setError(error.message);
    }
  }; //auth/invalid-email auth/weak-password

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
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

              <Button className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </Container>
  );
};

export default Register;
