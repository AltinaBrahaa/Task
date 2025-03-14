import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

import SideBar from "./SideBar";
import AddTask from "./AddTask"; 
import AddProduct from "./AddProduct"; 
import TaskList from "./TaskList";
import ProductList from "./ProductList";

function App() {
  return (
    <Router> {}
      <div className="app">
        <SideBar />
        <div className="main-content">
          <Routes> {}
            {}
            <Route path="/add-task" element={<AddTask />} /> 
            {}
            {}
            <Route path="/add-product" element={<AddProduct />} /> 
            {}
            {}
            <Route path="/task-list" element={<TaskList />} /> 
            {}
            {}
            <Route path="/product-list" element={<ProductList />} /> 
            {}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
