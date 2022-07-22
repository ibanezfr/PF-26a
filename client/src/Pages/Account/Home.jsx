import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Button>Hello world</Button>
    </div>
  );
};

export default Home;
