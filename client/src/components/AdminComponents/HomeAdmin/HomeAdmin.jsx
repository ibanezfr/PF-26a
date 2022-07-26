import React from "react";
import Featured from "../Featured/Featured";
import Graphics from "../Graphics/Graphics";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import Widget from "../Widget/Widget";
import "./HomeAdmin.scss";

const HomeAdmin = () => {
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
        <div className="graphic">
          <Featured />
          <Graphics title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          {/* TABLAS */}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
