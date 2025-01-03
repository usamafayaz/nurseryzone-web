import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SignupLanding from "../pages/auth/SignupLanding";

import NurseryDashboard from "../pages/roles/nursery-admin/Dashboard";
import AddPlant from "../pages/roles/nursery-admin/AddPlant";
import ManagePlants from "../pages/roles/nursery-admin/ManagePlants";
import ManageOrders from "../pages/roles/nursery-admin/ManageOrders";
import Reviews from "../pages/roles/nursery-admin/Reviews";
import NurseryPendingApproval from "../pages/roles/nursery-admin/NurseryApproval";
import ChatBot from "../pages/roles/customer/ChatBot";

import SuperAdminDashboard from "../pages/roles/super-admin/Dashboard";
import RegisteredNurseries from "../pages/roles/super-admin/RegisteredNurseries";
import NurseryRequests from "../pages/roles/super-admin/NurseryRequest";

import CustomerDashboard from "../pages/roles/customer/Dashboard";
import CartScreen from "../pages/roles/customer/Cart";
import ProductDetails from "../pages/roles/customer/ProductDetails";
import CheckoutScreen from "../pages/roles/customer/Checkout";
import TrackOrders from "../pages/roles/customer/TrackOrders";
import DeliveryBoy from "../pages/roles/nursery-admin/DeliveryBoy";
import DeliveryBoyDashboard from "../pages/roles/delivery-man/Dashboard";

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
        <Route path="/nursery/add-plant" element={<AddPlant />} />
        <Route path="/nursery/manage-plants" element={<ManagePlants />} />
        <Route path="/nursery/manage-orders" element={<ManageOrders />} />
        <Route path="/nursery/reviews" element={<Reviews />} />
        <Route path="/nursery/delivery-boy" element={<DeliveryBoy />} />
        <Route
          path="/nursery/pending-approval"
          element={<NurseryPendingApproval />}
        />

        {/* Customer */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/chat-bot" element={<ChatBot />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/track-orders" element={<TrackOrders />} />

        {/* Super Admin */}
        <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin/nursery-requests" element={<NurseryRequests />} />
        <Route
          path="/admin/registered-nurseries"
          element={<RegisteredNurseries />}
        />
        {/* Super Admin */}
        <Route
          path="/delivery-man/dashboard"
          element={<DeliveryBoyDashboard />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
