import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import AddTask from "./AddTask";
import Sidebar from "./SideBar";
import AddUser from "./AddUser";
import TaskList from "./TaskList";
import UserList from "./UserList";
import Home from "./Home";
import ImageUpload from "./ImageUpload";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<ImageUpload />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/user-list" element={<UserList />} />
          </Routes>
          <Routes>
            <Route path="/sidebar" element={<Sidebar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;