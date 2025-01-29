import React from "react";
import Login from "../components/Login";

const LoginPage = () => {

  const handleLogin = () => {
    window.location.href = "/tasks";
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
