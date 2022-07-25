import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useAuth } from "../../context/AuthContext";

import "./Profile.scss";

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

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3001/auth/${user.uid}`
  //     );
  //     setUserDb(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    function getUser() {
      return `http://localhost:3001/auth/${user.uid}`;
    }
    async function fetchData() {
      const result = await axios.get(getUser());
      setUserDb(result.data);
    }
    fetchData();
  }, [user.uid]);
  console.log(userDb);

  if (loading) {
    return <Loading />;
  }

  // console.log(userDb);
  return (
    <div className="wrapper">
      <div className="container">
        <div className="user-info">
          <p className="title">{userDb.email}</p>
          {userDb.image ? (
            <img src={userDb?.image} alt="" className="profile" />
          ) : (
            <FaUserCircle className="profile" />
          )}
          <p className="title">{userDb.fullName}</p>

          <div className="div-details">
            <div className="container-details">
              <p className="details">
                <span className="span-details">Country:</span>
                <br /> {userDb.country}
              </p>
              <p className="details">
                <span className="span-details">Province:</span>
                <br />
                {userDb.province}
              </p>
              <p className="details">
                <span className="span-details">City:</span>
                <br />
                {userDb.city}
              </p>
              <p className="details">
                <span className="span-details">Street:</span>
                <br />
                {userDb.street}
              </p>
              <p className="details">
                <span className="span-details">Postal code:</span>
                <br />
                {userDb.postalCode}
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
      <Link to="/profile/form">
        <button className="btnProfile">Edit Profile</button>
      </Link>
      <button className="btnProfile" onClick={handleLogout}>Logout</button>
    </div>

    // <div>
    //   <div>
    //     <div>
    //       {userDb?.image ? (
    //         <img src={userDb?.image} alt="profile" />
    //       ) : (
    //         <img src={defaultPhoto} alt="profile" />
    //       )}
    //       <span>{userDb?.fullName}</span>
    //       <span>{userDb?.email}</span>

    //       <div>
    //         <div>
    //           <span>{userDb?.country}</span>
    //           <span>{userDb?.province}</span>
    //           <span>{userDb?.city}</span>
    //           <span>{userDb?.street}</span>
    //           <span>{userDb?.postalCode}</span>
    //         </div>
    //       </div>

    //       <Link to="/profile/form">
    //         <Button>Edit Profile</Button>
    //       </Link>
    //     </div>
    //   </div>
    //   <Button onClick={handleLogout}>Logout</Button>
    // </div>
  );
};

export default Profile;
