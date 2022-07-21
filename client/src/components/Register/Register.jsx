import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { register } from "../../redux/actions";

const Register = () => {
  const { signup, user } = useAuth();
  const dispatch = useDispatch();
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
      dispatch(
        register({
          id: credentials.user.uid,
          fullName: newUser.fullName,
          email: newUser.email,
        })
      );

      history.push("/login");
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
              <Form.Group id="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  id="password"
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group id="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  id="confirmPassword"
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                />
              </Form.Group>

              <Button className="w-100 mt-4" type="submit">
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
