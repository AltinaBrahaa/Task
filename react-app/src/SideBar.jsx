import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { FaHome, FaPlusCircle, FaUserPlus, FaBox, FaImage, FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import "./Sidebar.css"; 

const Sidebar = () => {
  const [heroDropdown, setHeroDropdown] = useState(false);
  const [imageDropdown, setImageDropdown] = useState(false);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.sidebar')) {
        setHeroDropdown(false);
        setImageDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="sidebar">
      <h2>Sidebar Task</h2>
      <ul>
        <li>
          <Link to="/homepage">
            <FaHome style={{ marginRight: "10px" }} /> HomePage
          </Link>
        </li>
        <li>
          <Link to="/home">
            <FaHome style={{ marginRight: "10px" }} /> Home
          </Link>
        </li>

        <li
          className="dropdown"
          onClick={(e) => {
            e.stopPropagation();
            setHeroDropdown(prev => !prev); 
          }}
        >
          <span>
            <FaHome style={{ marginRight: "10px" }} /> Hero Section{" "}
            {heroDropdown ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </li>
        {heroDropdown && (
          <ul className="dropdown-menu dropdown-menu-columns">
            <li>
              <Link to="/hero/slider" onClick={() => setHeroDropdown(false)}>Slider</Link>
            </li>
            <li>
              <Link to="/hero/first-section" onClick={() => setHeroDropdown(false)}>First Section</Link>
            </li>
            <li>
              <Link to="/hero/second-section" onClick={() => setHeroDropdown(false)}>Second Section</Link>
            </li>
          </ul>
        )}

        <li>
          <Link to="/add-task">
            <FaPlusCircle style={{ marginRight: "10px" }} /> Add Task
          </Link>
        </li>

        <li>
          <Link to="/add-user">
            <FaUserPlus style={{ marginRight: "10px" }} /> Add User
          </Link>
        </li>
        <li>
          <Link to="/task-list">
            <FaBox style={{ marginRight: "10px" }} /> Task List
          </Link>
        </li>
        <li>
          <Link to="/user-list">
            <FaBox style={{ marginRight: "10px" }} /> User List
          </Link>
        </li>
        <li>
          <Link to="/productForm">
            <FaImage style={{ marginRight: "10px" }} /> Add Product
          </Link>
        </li>
        <li>
          <Link to="/upload">
            <FaImage style={{ marginRight: "10px" }} /> Upload Image
          </Link>
        </li>
        <li>
          <Link to="/addproduct">
            <FaImage style={{ marginRight: "10px" }} /> Product Add
          </Link>
        </li>
        <li>
          <Link to="/firstProduct">
            <FaImage style={{ marginRight: "10px" }} /> First Product
          </Link>
        </li>
        <li>
          <Link to="/secondProduct">
            <FaImage style={{ marginRight: "10px" }} /> Second Product
          </Link>
        </li>

       
        <li
          className="dropdown"
          onClick={(e) => {
            e.stopPropagation();
            setImageDropdown(prev => !prev); 
          }}
        >
          <span>
            <FaHome style={{ marginRight: "10px" }} /> Add Product{" "}
            {imageDropdown ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </li>
        {imageDropdown && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/addproduct" onClick={() => setImageDropdown(false)}>Slider</Link>
            </li>
            <li>
              <Link to="/firstProduct" onClick={() => setImageDropdown(false)}>First Section</Link>
            </li>
            <li>
              <Link to="/hero/second-section" onClick={() => setImageDropdown(false)}>Second Section</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
