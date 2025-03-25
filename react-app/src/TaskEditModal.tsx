import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import "./TaskEditModal.css";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskEditModalProps {
  task: Task;
  closeModal: () => void;
}

const notify = (text: string) => toast(text);

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task, closeModal }) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [loading, setLoading] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is a SuperAdmin based on the token
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token); // Decode the token
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        // Check if role is SuperAdmin
        setIsSuperAdmin(role === "SuperAdmin");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsSuperAdmin(false); // Default to false if decoding fails
      }
    }

    setEditedTask(task);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5222/api/Taski/${task.id}`, editedTask);
      notify("Task updated successfully");
      closeModal();
    } catch (error) {
      console.error("Error updating task:", error);
      notify("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleDelete = async () => {
    // Check if the user is a SuperAdmin before allowing delete
    if (!isSuperAdmin) {
      notify("You do not have permission to delete this task.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5222/api/Taski/${task.id}`);
      notify("Task deleted successfully");
      closeModal();
    } catch (error) {
      console.error("Error deleting task:", error);
      notify("Failed to delete task");
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="modal show">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Edit Task</h2>
          {loading ? (
            <p>Saving task...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                required
              />
              <input type="submit" value="Update Task" />
            </form>
          )}
          {isSuperAdmin && (
            <button onClick={handleDelete} className="delete-button">
              Delete Task
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskEditModal;

