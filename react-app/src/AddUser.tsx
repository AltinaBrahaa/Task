import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";

const notify = (text: string) => toast(text);

interface UserValue {
  emri: string;
  email: string;
}

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [userValue, setUserValue] = useState<UserValue>({
    emri: "",
    email: "",
  });

  

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserValue({ ...userValue, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5222/api/User`,
        userValue,
  
      );

      if (response.data) {
        setUserValue({
          emri: "",
          email: "",
        });
        notify("User added successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to add user:", error.response || error);
        notify("Failed to add user");
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
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="container">
        <div className="Main_Add_User_div">
          <h1>Add User</h1>
          <form onSubmit={handleUserSubmit}>
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


