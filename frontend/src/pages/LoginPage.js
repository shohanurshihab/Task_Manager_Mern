import React from "react";
import Login from "../components/Login";

const LoginPage = () => {

  const handleLogin = () => {
    window.location.href = "/tasks";
  };

  return (
    <div className="p-4">
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
