import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";

const defaultPhoto =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU";

const Profile = () => {
  const dispatch = useDispatch();
  const [userDb, setUserDb] = useState("");

  const { user, logout, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState({
    fullName: "",
  });

  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const getUser = async () => {
    let cookie = JSON.parse(localStorage.getItem("usuario"));
    try {
      const [data] = await axios.get(`http://localhost:3001/auth/${cookie}`);
      setUserDb(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <h1>{userDb}</h1>
    </div>
  );
};

export default Profile;
