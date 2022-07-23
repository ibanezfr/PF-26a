import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading/Loading";
import "./ProfileForm.css";

export default function ProfileForm() {
  const history = useHistory();
  const { user, loading } = useAuth();
  const [currentUser, setUser] = useState({
    fullName: "",
    image: "",
    address: "",
    country: "",
    province: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/auth/${user.uid}`, currentUser);

      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <section id="userDetail-window">
      <h1>Complete All Fields</h1>

      {/* {error && <span className="error"> {error} </span>} */}
      <form onSubmit={handleSubmit}>
        {currentUser?.image ? (
          <img src={currentUser.image} alt="" />
        ) : (
          <label>Profile Image</label>
        )}
        <input
          className="form-input"
          type="url"
          placeholder="Profile Image"
          id="image"
          onChange={(e) => setUser({ ...currentUser, image: e.target.value })}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Name"
          name="fullName"
          onChange={(e) =>
            setUser({ ...currentUser, fullName: e.target.value })
          }
        />

        {/* <p className="error" id="username-error">
          {" "}
          * Username is required !{" "}
        </p> */}

        {/* <input
          className="form-input"
          type="email"
          placeholder="Your Email"
          id="password"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        /> */}
        <input
          className="form-input"
          type="text"
          placeholder="Address"
          id="address"
          onChange={(e) => setUser({ ...currentUser, address: e.target.value })}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Country"
          id="country"
          onChange={(e) => setUser({ ...currentUser, country: e.target.value })}
        />

        <input
          className="form-input"
          type="text"
          placeholder="State or Province"
          id="province"
          onChange={(e) =>
            setUser({ ...currentUser, province: e.target.value })
          }
        />

        <input
          className="form-input"
          type="text"
          placeholder="City"
          id="city"
          onChange={(e) => setUser({ ...currentUser, city: e.target.value })}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Street"
          id="street"
          onChange={(e) => setUser({ ...currentUser, street: e.target.value })}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Postal Code"
          id="postalCode"
          onChange={(e) =>
            setUser({ ...currentUser, postalCode: e.target.value })
          }
        />

        <button className="userDetail-btn" type="submit">
          {" "}
          Update Info
        </button>
      </form>
    </section>
  );
}
