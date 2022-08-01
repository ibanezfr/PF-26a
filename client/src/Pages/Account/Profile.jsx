import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

// import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { get_one_user } from "../../api_url/api_url";

import { useAuth } from "../../context/AuthContext";

import "./Profile.scss";

const Profile = () => {
  // const dispatch = useDispatch();
  const [userDb, setUserDb] = useState("");
  const { logout, user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    function getUser() {
      let localUser = JSON.parse(localStorage.getItem("usuario"));
      if (localUser) return get_one_user + localUser;
    }
    async function fetchData() {
      const result = await axios.get(getUser());
      if (isMounted) {
        setUserDb(result.data);
        console.log(userDb);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="user-info">
          <p className="title">
            {userDb?.email} {userDb === null ? "Logeate Capo" : null}{" "}
          </p>
          {userDb?.image ? (
            <img src={userDb?.image} alt="" className="profile" />
          ) : (
            <FaUserCircle className="profile" />
          )}

          <p className="title">{userDb?.fullName}</p>

          <div className="div-details">
            <div className="container-details">
              <p className="details">
                <span className="span-details">Country:</span>
                <br /> {userDb?.country}
              </p>
              <p className="details">
                <span className="span-details">Province:</span>
                <br />
                {userDb?.province}
              </p>
              <p className="details">
                <span className="span-details">City:</span>
                <br />
                {userDb?.city}
              </p>
              <p className="details">
                <span className="span-details">Street:</span>
                <br />
                {userDb?.street}
              </p>
              <p className="details">
                <span className="span-details">Postal code:</span>
                <br />
                {userDb?.postalCode}
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
      <Link to="/profile/form">
        <button className="btnProfile">Edit Profile</button>
      </Link>
      <button className="btnProfile" onClick={handleLogout}>
        Logout
      </button>
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
