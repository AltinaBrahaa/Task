import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { FaHome, FaPlusCircle, FaUserPlus, FaBox, FaImage, FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import "./Sidebar.css"; 

const Sidebar = () => {
  const [productDropdown, setProductDropdown] = useState(false);
  const [heroDropdown, setHeroDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.sidebar')) {
        setProductDropdown(false);
        setHeroDropdown(false);
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
        <li 
          className="dropdown" 
          onClick={(e) => {
            e.stopPropagation();
            setHeroDropdown(prev => !prev);
          }}
        >
          <span>
            <FaImage style={{ marginRight: "10px" }} /> Hero Section{" "}
            {productDropdown ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </li>

        {heroDropdown && (
          <ul className="dropdown-menuu showw">
            <div className="dropdown-menu-columns">
              <li>
                <Link to="/editSliderProduct" onClick={() => setHeroDropdown(false)}>
                  Edit Product
                </Link>
              </li>
              <li>
                <Link to="/firstProduct" onClick={() => setHeroDropdown(false)}>
                  First Product
                </Link>
              </li>
              <li>
                <Link to="/secondProduct" onClick={() => setHeroDropdown(false)}>
                  Second Product
                </Link>
              </li>
            </div>
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
          <Link to="/upload">
            <FaImage style={{ marginRight: "10px" }} /> Upload Image
          </Link>
        </li>


        <li 
          className="dropdown" 
          onClick={(e) => {
            e.stopPropagation();
            setProductDropdown(prev => !prev);
          }}
        >
          <span>
            <FaImage style={{ marginRight: "10px" }} /> Add Product{" "}
            {productDropdown ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </li>

        {productDropdown && (
          <ul className="dropdown-menu show">
            <div className="dropdown-menu-columns">
              <li>
                <Link to="/addproduct" onClick={() => setProductDropdown(false)}>
                  Add New Product
                </Link>
              </li>
              <li>
                <Link to="/firstProduct" onClick={() => setProductDropdown(false)}>
                  First Product
                </Link>
              </li>
              <li>
                <Link to="/secondProduct" onClick={() => setProductDropdown(false)}>
                  Second Product
                </Link>
              </li>
            </div>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
