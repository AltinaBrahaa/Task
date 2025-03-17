import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserEditModal.css";


interface User {
  id: number;
  emri: string;
  email: string;
}


interface UserEditModalProps {
  user: User;
  closeModal: () => void;
}

const notify = (text: string) => toast(text);

const UserEditModal: React.FC<UserEditModalProps> = ({ user, closeModal }) => {
  const [editedUser, setEditedUser] = useState<User>(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedUser(user); 
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5222/api/User/${user.id}`, editedUser);
      notify("User updated successfully");
      closeModal();  
    } catch (error) {
      console.error("Error updating User:", error);
      notify("Failed to update User");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="modal show">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Edit User</h2>
          {loading ? (
            <p>Saving User...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Emri</label>
              <input
                type="text"
                name="emri"
                value={editedUser.emri}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <textarea
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                required
              />
              <input type="submit" value="Update User" />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEditModal;
