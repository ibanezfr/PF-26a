import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{user.displayName || user.email}</h1>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Profile;
