// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login with:", { email, password });
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="text-center">
          <img
            src="src/assets/logo.png"
            alt="Nursery Zone Logo"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-green-600">Nursery Zone</h1>
          <p className="text-gray-600">Your Personal Plant Paradise</p>
        </div>

        <form className="mt-6">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <Button onClick={handleLogin}>Log In</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            New to Nursery Zone?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-600 font-bold cursor-pointer"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
