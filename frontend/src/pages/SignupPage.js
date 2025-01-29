import React from "react";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Signup</h1>
      <Signup onSignup={handleSignup} />
    </div>
  );
};

export default SignupPage;
