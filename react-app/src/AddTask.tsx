import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Add.css"; 

const notify = (text: string) => toast(text);

interface TaskValue {
  title: string;
  description: string;
}

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const [taskValue, setTaskValue] = useState<TaskValue>({
    title: "",
    description: "",
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskValue({ ...taskValue, [e.target.name]: e.target.value });
  };


  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5222/api/Taski`,
        taskValue,
       
      );

      if (response.data) {
        setTaskValue({
          title: "",
          description: "",
        });
        notify("Task added successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to add task:", error.response || error);
        notify("Failed to add task");
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
        <div className="Main_Add_Task_div">
          <h1>Add Task</h1>
          <form onSubmit={handleTaskSubmit}>
            <div className="input-container">
              <label>Title</label>
              <input
                type="text"
                placeholder="Task Title"
                name="title"
                value={taskValue.title}
                onChange={handleTaskChange}
                required
              />
            </div>

            <div className="input-container">
              <label>Description</label>
              <textarea
                placeholder="Task Description"
                name="description"
                value={taskValue.description}
                onChange={handleTaskChange}
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

export default AddTask;

