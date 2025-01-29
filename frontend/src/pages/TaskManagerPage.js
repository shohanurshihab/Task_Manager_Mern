import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, getUser } from "../api";
import { useNavigate } from "react-router-dom";

const TaskManagerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch {
        alert("Failed to fetch tasks");
      }
    };
    fetchTasks();

  
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await getUser(token);
        console.log(data);
        setUser(data);
      } catch {
        alert("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const handleTaskCreated = (task) => {
    setTasks((prev) => [...prev, task]);
    setIsTaskFormOpen(false);
  };
  const handleTaskUpdated = (updatedTask) =>
    setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  const handleTaskDeleted = (id) => setTasks((prev) => prev.filter((task) => task._id !== id));

  const filteredTasks = tasks.filter((task) =>
    (showCompleted ? true : !task.completed)
  );

  const handleSignOut = (e) => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-5">
        {user && (
          <div className="inherit top-5 left-5 p-3 bg-white border border-gray-300 rounded-lg w-36 text-center">
            <div className="font-bold mb-1">User: {user.username}</div>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-800 text-center">Task Manager</h1>
        <button
          onClick={handleSignOut}
          className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Sign Out
        </button>
      </div>
      <label className="ml-2">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={(e) => setShowCompleted(e.target.checked)}
        />
        Show Completed
      </label>
      <div className="flex flex-col gap-5">
        <button
          onClick={() => setIsTaskFormOpen(true)}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Task
        </button>
        <TaskList tasks={filteredTasks} onUpdateTask={handleTaskUpdated} onDeleteTask={handleTaskDeleted} />
      </div>
      {isTaskFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <TaskForm onTaskCreated={handleTaskCreated} />
            <button
              onClick={() => setIsTaskFormOpen(false)}
              className="mt-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagerPage;
