import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { useAuth } from "../../context/AuthContext";

const defaultPhoto =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU";

const Profile = () => {
  const dispatch = useDispatch();
  const [userDb, setUserDb] = useState("");
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/${user.uid}`
      );
      setUserDb(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log(userDb);
  return (
    <div>
      <div>
        <div>
          {userDb?.image ? (
            <img src={userDb?.image} alt="profile" />
          ) : (
            <img src={defaultPhoto} alt="profile" />
          )}
          <span>{userDb?.fullName}</span>
          <span>{userDb?.email}</span>

          <div>
            <div>
              <span>{userDb?.country}</span>
              <span>{userDb?.province}</span>
              <span>{userDb?.city}</span>
              <span>{userDb?.street}</span>
              <span>{userDb?.postalCode}</span>
            </div>
          </div>

          <Link to="/profile/form">
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Profile;
