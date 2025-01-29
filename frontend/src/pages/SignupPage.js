import React from "react";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div >
      <Signup onSignup={handleSignup} />
    </div>
  );
};

export default SignupPage;
