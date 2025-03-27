import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaHome, FaPlusCircle, FaUserPlus, FaBox, FaImage, FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import "./Sidebar.css"; 

const Sidebar = () => {
  const [heroDropdown, setHeroDropdown] = useState(false);
  const [imageDropdown, setImageDropdown] = useState(false);

  return (
    <div className="sidebar">
      <h2>Sidebar Task</h2>
      <ul>
        <li>
          <Link to="/homepage">
            <FaHome style={{ marginRight: "10px" }} /> HomePage
          </Link>
        </li>

       
        <li 
          className="dropdown" 
          onClick={(e) => {
            e.stopPropagation(); 
            setHeroDropdown(!heroDropdown);
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
            <FaImage style={{ marginRight: "10px" }} /> AddProduct
          </Link>
        </li>
        <li>
          <Link to="/upload">
            <FaImage style={{ marginRight: "10px" }} /> UploadImage
          </Link>
        </li>
        <li>
          <Link to="/addproduct">
            <FaImage style={{ marginRight: "10px" }} /> ProductAdd
          </Link>
        </li>

        {/* IMAGE DROPDOWN */}
        <li 
          className="dropdown" 
          onClick={(e) => {
            e.stopPropagation();
            setImageDropdown(!imageDropdown);
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
              <Link to="/hero/first-section" onClick={() => setImageDropdown(false)}>First Section</Link>
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
