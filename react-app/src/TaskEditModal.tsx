import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  useEffect(() => {
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
        </div>
      </div>
    </>
  );
};

export default TaskEditModal;
