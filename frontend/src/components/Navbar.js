import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyle.css";

export default class NavBar extends Component {
  render() {
    return (
      // <div className="container">
        <div className="nav">
          <div className="logo">
            <div className="logo-text">
              <b>A</b>ttendance <b>A</b>pp
            </div>
          </div>
          <div class="menu">
            <Link to="/" className="menu-item student">
              <b>S</b>tudents
            </Link>
            <Link to="/student/add" className="menu-item admitStudent">
              <b>A</b>dmit <b>S</b>tudent
            </Link>
          </div>
          <div className="logoutButton">
            <div className="logoutButton-text">Log Out</div>
          </div>
        </div>
      // </div>
    );
  }
}
