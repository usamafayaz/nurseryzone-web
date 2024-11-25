// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ManagePlants from "../pages/ManagePlants";
import ViewPlants from "../pages/ViewPlants";
import OrderDetails from "../pages/OrderDetails";
import Reviews from "../pages/Reviews";
import Customers from "../pages/Customers";
import ChatBot from "../pages/ChatBot";
import Signup from "../pages/Signup";
import SignupLanding from "../pages/SignupLanding";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/role-selection" element={<SignupLanding />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-plants" element={<ManagePlants />} />
        <Route path="/view-plants" element={<ViewPlants />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/chat-bot" element={<ChatBot />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
