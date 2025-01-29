import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, getUser } from "../api";
import { useNavigate } from "react-router-dom";

const TaskManagerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [filter, setFilter] = useState("all"); 

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const handleSignOut = (e) => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="w-1/4 p-5 bg-white border-r border-gray-300">
        {user && (
          <div className="mb-5 p-3 bg-white border border-gray-300 rounded-lg text-center">
            <div className="font-bold mb-1">User: {user.username}</div>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Sign Out
        </button>
      </div>
      <div className="w-3/4 p-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Task Manager</h1>
        <div className="mb-5">
          <label className="mr-2">
            <input
              type="radio"
              value="all"
              checked={filter === "all"}
              onChange={(e) => setFilter(e.target.value)}
            />
            All
          </label>
          <label className="mr-2">
            <input
              type="radio"
              value="completed"
              checked={filter === "completed"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Completed
          </label>
          <label>
            <input
              type="radio"
              value="incomplete"
              checked={filter === "incomplete"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Incomplete
          </label>
        </div>
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
    </div>
  );
};

export default TaskManagerPage;
