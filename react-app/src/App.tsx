import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./Register";



function App() {
  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


/*import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SideBar from "./SideBar";
import AddTask from "./AddTask";
import AddUser from "./AddUser";
import TaskList from "./TaskList";
import UserList from "./UserList";


function App() {
  return (
    <Router>
      <div className="app">
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/user-list" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/


