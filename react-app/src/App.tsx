import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import AddTask from "./AddTask";
import Sidebar from "./SideBar";
import AddUser from "./AddUser";
import TaskList from "./TaskList";
import UserList from "./UserList";
import HomePage from "./HomePage";
import ImageUpload from "./ImageUpload";
import ProductForm from "./ProductForm";
import Addproduct from "./Addproduct"; 
import Home from "./Home";
import FirstProduct from "./FirstProduct";
import SecondProduct from "./SecondProduct";
import EditSliderProduct from "./EditSliderProduct";
import EditSecondProduct from "./EditSecondProduct";


function App() {
  return (
   
        <Router>
          <div className="app">
            <div className="main-content">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/addproduct" element={<Addproduct />} />
                <Route path="/firstProduct" element={<FirstProduct />} />
                <Route path="/editSliderProduct" element={<EditSliderProduct />} />
                <Route path="/editSecondProduct" element={<EditSecondProduct />} />
                <Route path="/secondProduct" element={<SecondProduct />} />
                <Route path="/upload" element={<ImageUpload />} />
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/productForm" element={<ProductForm />} />
                <Route path="/sidebar" element={<Sidebar />} />
              </Routes>
            </div>
          </div>
        </Router>

  );
}

export default App;
