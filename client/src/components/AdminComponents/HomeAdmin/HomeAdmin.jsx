import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Featured from "../Featured/Featured";
import Graphics from "../Graphics/Graphics";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
// import UserList from "../UserList/UserList";
import Widget from "../Widget/Widget";
import "./HomeAdmin.scss";

const HomeAdmin = () => {
  const history = useHistory();

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);
  // useEffect(() => {
  //   function getUsers() {
  //     return `http://localhost:3001/admin/users`;
  //   }
  //   async function fetchData() {
  //     const result = await axios.get(getUsers());
  //     setUser(result.data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="home">
      <SidebarAdmin />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        {/* <div className="graphic">
          <Featured />
          <Graphics title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">
            Users
            {/* <UserList /> */}
          </div>
          {/* TABLAS */}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
