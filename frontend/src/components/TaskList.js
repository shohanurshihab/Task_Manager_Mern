import React, { useState } from "react";
import { updateTask, deleteTask } from "../api";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const toggleTask = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, { completed: !task.completed });
      onUpdateTask(updatedTask.data); 
    } catch {
      alert("Failed to update task");
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      onDeleteTask(id);
    } catch {
      alert("Failed to delete task");
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setNewTaskName(task.title);
    setNewTaskDescription(task.description);
    setNewTaskDueDate(task.dueDate);
  };

  const saveTask = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, { 
        title: newTaskName,
        description: newTaskDescription,
        dueDate: newTaskDueDate
      });
      onUpdateTask(updatedTask.data);
      setEditingTaskId(null);
    } catch {
      alert("Failed to update task");
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <ul className="list-none p-0">
      {tasks.map((task) => (
        <li key={task._id} className="flex flex-col p-4 border border-gray-300 rounded-lg mb-3 bg-white shadow-md">
          {editingTaskId === task._id ? (
            <>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg mb-2"
              />
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg mb-2"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => saveTask(task)} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">Save</button>
                <button onClick={() => setEditingTaskId(null)} className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span
                  onClick={() => toggleTask(task)}
                  className={`cursor-pointer ${task.completed ? "line-through" : ""} text-gray-800 text-lg font-semibold`}
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => startEditing(task)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Edit</button>
                  <button onClick={() => removeTask(task._id)} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">Delete</button>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <p className="text-gray-600 mt-1">{formatDate(task.dueDate)}</p>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
