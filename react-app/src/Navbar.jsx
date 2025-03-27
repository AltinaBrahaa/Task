/*import React from "react";
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

export default Navbar;*/
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import "./Header.css";



const Navbar = () => {
  return (
    <header className="header">
      <div className="header-left">
      <img src="/Images/logo_avci.png" alt="logo" className="logo" />

        <span className="phone">+1 (555) 333 22 11</span>
      </div>
           
      <nav className="nav">
        <ul>
          <li><Link to="/homepage">HOME</Link></li>
          <li><Link to="/products">PRODUCTS</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li className="dropdown">
            <Link to="/sidebar">Dashboard</Link>
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
     
      <div className="header-right">
        <span className="small-links">
          <Link to="/wishlist">Wishlist</Link> |
          <Link to="/checkout"> Checkout</Link> |
          <Link to="/account"> My Account</Link>
        </span>
        <FaSearch className="icon search-icon" />
        <div className="cart">
          <FaShoppingBag className="icon" />
          <span className="cart-price">$75.00</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;