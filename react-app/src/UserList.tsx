import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserEditModal from "./UserEditModal";
import { useNavigate } from "react-router-dom";
import "./UserList.css";
import Sidebar from "./SideBar";

const notify = (text: string) => toast(text);

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentUser, setCurrentUser] = useState<any>(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5222/api/User");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching User:", error);
        notify("Failed to fetch Users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5222/api/User/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      notify("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      notify("Failed to delete user");
    }
  };

  const handleEdit = (user: any) => {
    setCurrentUser(user); 
    setIsModalOpen(true);  
  };

  const closeModal = () => {
    setIsModalOpen(false);  
    setCurrentUser(null);    
  };

  return (
    <>
    <Sidebar/>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="user-list-container">
        <h1>User List</h1>
        {loading ? (
          <p>Loading tasks...</p>
        ) : users.length > 0 ? (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <h2>{user.emri}</h2>
                <p>{user.email}</p>
                <div className="user-actions">
                  <button onClick={() => handleEdit(user)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>

      {isModalOpen && currentUser&& (
        <UserEditModal
          user={currentUser} 
          closeModal={closeModal}  
        />
      )}
    </>
  );
};

export default UserList;
