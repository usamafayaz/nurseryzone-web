import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Eye,
  ShoppingCart,
  Star,
  Users,
  MessageSquare,
  ArrowRight,
  Bike,
} from "lucide-react";

const NurseryDashboard = () => {
  const navigate = useNavigate();
  let storedUserData = localStorage.getItem("userData");
  storedUserData = JSON.parse(storedUserData);

  const menuItems = [
    {
      title: "Manage Plants",
      description: "Add, edit, and maintain your plant inventory",
      icon: <Leaf size={24} />,
      screen: "/nursery/manage-plants",
      color: "bg-green-600",
    },
    {
      title: "View Plants",
      description: "Browse and search your plant collection",
      icon: <Eye size={24} />,
      screen: "/nursery/view-plants",
      color: "bg-green-600",
    },
    {
      title: "Orders",
      description: "Track and manage customer orders",
      icon: <ShoppingCart size={24} />,
      screen: "/nursery/order-details",
      color: "bg-green-600",
    },
    {
      title: "Reviews",
      description: "Monitor customer feedback and ratings",
      icon: <Star size={24} />,
      screen: "/nursery/reviews",
      color: "bg-green-600",
    },
    {
      title: "Add Delivery Boy",
      description: "Add and manage delivery boy",
      icon: <Bike size={24} />,
      screen: "/nursery/delivery-boy",
      color: "bg-green-600",
    },
    {
      title: "Chat with Gemini",
      description: "Get AI assistance for your queries",
      icon: <MessageSquare size={24} />,
      screen: "/chat-bot",
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Leaf size={32} className="text-white" />
            <div>
              <h1 className="text-3xl font-bold">{storedUserData.name}</h1>
              <p className="text-green-100 mt-1">
                Manage your botanical business with ease
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.screen)}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-green-50 text-green-600">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <ArrowRight
                    className="text-gray-400 group-hover:text-green-600 transform translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    size={20}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative circles */}
      <div className="fixed -bottom-32 -left-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -bottom-28 -left-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-32 -right-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-28 -right-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
    </div>
  );
};

export default NurseryDashboard;
