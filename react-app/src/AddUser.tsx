import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
import Sidebar from "./SideBar";


const notify = (text: string) => toast(text);

interface UserValue {
  id: string;
  emri: string;
  email: string;
  password: string;
  role: string;
}

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [userValue, setUserValue] = useState<UserValue>({
    id: "",
    emri: "",
    email: "",
    password: "",
    role: "User",
  });

  
  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserValue({ ...userValue, [e.target.name]: e.target.value });
  };
  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    
    const userData = {
      id: userValue.id,
      emri: userValue.emri,
      email: userValue.email,
      password: userValue.password,
      role: userValue.role,
    };
  
    
    const token = localStorage.getItem("accessToken");
  
    
    if (!token) {
      console.error("Token is missing");
      notify("Authentication failed. Please log in.");
      setLoading(false);
      return;
    }
  
    try {
      
      const response = await axios.post(
        "http://localhost:5222/api/User",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      
      if (response.data) {
        setUserValue({
          id: "",
          emri: "",
          email: "",
          password: "",
          role: "User",
        });
        notify("User added successfully");
      }
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        console.error("Failed to add user:", error.response || error);
  
        
        if (error.response?.data?.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          notify(errorMessages.join(", ")); 
        } else if (error.response?.data?.message) {
         
          notify(error.response.data.message);
        } else {
          
          notify("Failed to add user");
        }
      } else {
        console.error("Unexpected error:", error);
        notify("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
    <Sidebar/>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="containeer">
        <div className="Main_Add_User_div">
          <h1>Add User</h1>
          <form onSubmit={handleUserSubmit}>
          <div className="input-container">
              <label>Id</label>
              <input
                type="text"
                placeholder="Id"
                name="id"
                value={userValue.id}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="input-container">
              <label>Name</label>
              <input
                type="text"
                placeholder="User Name"
                name="emri"
                value={userValue.emri}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="User Email"
                name="email"
                value={userValue.email}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userValue.password}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="input-container">
              <label>Role</label>
              <select
                name="role"
                value={userValue.role}
                onChange={handleUserChange}
                required
              >
                <option value="User">User</option>
                <option value="SUPERADMIN">SuperAdmin</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button type="submit" className="formsubmitbutton">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;


