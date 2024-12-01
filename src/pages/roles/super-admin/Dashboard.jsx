import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, ArrowRight, Leaf } from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Nursery Requests",
      description: "Review and manage nursery registration requests",
      icon: <Users size={24} />,
      screen: "/admin/nursery-requests",
      color: "bg-green-600",
    },
    {
      title: "Registered Nurseries",
      description: "View and manage all registered nurseries",
      icon: <Building2 size={24} />,
      screen: "/admin/registered-nurseries",
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-green-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Leaf size={32} className="text-white" />
            <div>
              <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-green-100 mt-1">
                Manage and oversee nursery network
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

export default SuperAdminDashboard;
