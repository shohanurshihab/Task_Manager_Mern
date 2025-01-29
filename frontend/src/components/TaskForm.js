import React, { useState } from "react";
import { createTask } from "../api";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTask({ title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
      onTaskCreated(data);
    } catch {
      alert("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add</button>
    </form>
  );
};

export default TaskForm;
