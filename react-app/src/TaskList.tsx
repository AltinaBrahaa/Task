import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskEditModal from "./TaskEditModal";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";
import Sidebar from "./SideBar";

const notify = (text: string) => toast(text);

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentTask, setCurrentTask] = useState<any>(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5222/api/Taski");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        notify("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5222/api/Taski/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      notify("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      notify("Failed to delete task");
    }
  };

  const handleEdit = (task: any) => {
    setCurrentTask(task); 
    setIsModalOpen(true);  
  };

  const closeModal = () => {
    setIsModalOpen(false);  
    setCurrentTask(null);    
  };

  return (
    <>
    <Sidebar/>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="task-list-container">
        <h1>Task List</h1>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found</p>
        )}
      </div>


      {isModalOpen && currentTask && (
        <TaskEditModal
          task={currentTask} 
          closeModal={closeModal}  
        />
      )}
    </>
  );
};

export default TaskList;
