import React, { useState } from "react";
import { signup } from "../api";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({ username: "", password: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      onSignup();
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="p-3 mb-4 w-full border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-3 mb-4 w-full border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-3 mb-4 w-full border border-gray-300 rounded-lg"
        />
        <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
