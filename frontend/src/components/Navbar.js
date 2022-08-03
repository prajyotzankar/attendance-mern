import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Student Info
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Students
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/student/add" className="nav-link">
                Admit Student
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
