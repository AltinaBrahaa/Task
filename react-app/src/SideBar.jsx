import React from "react";
import { Link } from "react-router-dom"; 
import { FaHome, FaPlusCircle, FaUserPlus, FaBox } from "react-icons/fa"; 
import "./Sidebar.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Sidebar Task</h2>
      <ul>
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
   
      </ul>
    </div>
  );
};

export default Sidebar;
