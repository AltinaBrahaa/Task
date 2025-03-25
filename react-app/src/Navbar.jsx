import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaShuttleVan } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/sideBar">Dashboard</Link></li>
        <li><Link to="/upload">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
