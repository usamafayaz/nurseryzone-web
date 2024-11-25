// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SignupLanding from "../pages/auth/SignupLanding";
import NurseryDashboard from "../pages/roles/nursery-admin/Dashboard";
import ManagePlants from "../pages/roles/nursery-admin/ManagePlants";
import ViewPlants from "../pages/roles/nursery-admin/ViewPlants";
import OrderDetails from "../pages/roles/nursery-admin/OrderDetails";
import Reviews from "../pages/roles/nursery-admin/Reviews";
import CustomersList from "../pages/roles/nursery-admin/Customers";
import ChatBot from "../pages/roles/customer/ChatBot";
import SuperAdminDashboard from "../pages/roles/super-admin/Dashboard";
import RegisteredNurseries from "../pages/roles/super-admin/RegisteredNurseries";
import NurseryRequests from "../pages/roles/super-admin/NurseryRequest";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes*/}
        <Route path="/" element={<Login />} />
        <Route path="/role-selection" element={<SignupLanding />} />
        <Route path="/signup" element={<Signup />} />

        {/* Nursery Admin */}
        <Route path="/nursery/dashboard" element={<NurseryDashboard />} />
        <Route path="/nursery/manage-plants" element={<ManagePlants />} />
        <Route path="/nursery/view-plants" element={<ViewPlants />} />
        <Route path="/nursery/order-details" element={<OrderDetails />} />
        <Route path="/nursery/reviews" element={<Reviews />} />
        <Route path="/nursery/customers" element={<CustomersList />} />

        {/* Customer */}
        <Route path="/chat-bot" element={<ChatBot />} />
        {/* Super Admin */}
        <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin/nursery-requests" element={<NurseryRequests />} />
        <Route
          path="/admin/registered-nurseries"
          element={<RegisteredNurseries />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
