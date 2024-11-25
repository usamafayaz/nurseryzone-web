import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  XCircle,
  Users,
  ArrowRight,
  Leaf,
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [nurseryRequests, setNurseryRequests] = useState([
    {
      id: 1,
      name: "Green Thumb Nursery",
      address: "123 Garden St, Springville, CA 94123",
      contact_number: "(555) 123-4567",
      email: "contact@greenthumb.com",
      owner_name: "Sarah Johnson",
      business_type: "Retail Nursery",
      years_in_business: 5,
      specialties: ["Succulents", "Rare Tropical Plants"],
    },
    {
      id: 2,
      name: "Urban Jungle Nursery",
      address: "456 Botanical Ave, Portland, OR 97201",
      contact_number: "(555) 987-6543",
      email: "info@urbanjungle.com",
      owner_name: "Michael Chen",
      business_type: "Online Nursery",
      years_in_business: 3,
      specialties: ["Indoor Plants", "Plant Care Kits"],
    },
  ]);

  const [registeredNurseries, setRegisteredNurseries] = useState([
    {
      id: 1,
      name: "Bloom & Grow Nursery",
      address: "789 Meadow Rd, Austin, TX 78701",
      contact_number: "(555) 246-8135",
    },
  ]);

  const handleRequestAction = (requestId, action) => {
    const request = nurseryRequests.find((req) => req.id === requestId);
    if (action === "accept") {
      setRegisteredNurseries((prev) => [
        ...prev,
        {
          id: request.id,
          name: request.name,
          address: request.address,
          contact_number: request.contact_number,
        },
      ]);
      setNurseryRequests((prev) => prev.filter((req) => req.id !== requestId));
    } else {
      setNurseryRequests((prev) => prev.filter((req) => req.id !== requestId));
    }
  };

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
      {/* Header Section */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Access Menu */}
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

        {/* Nursery Requests Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Nursery Registration Requests
          </h2>
          {nurseryRequests.length === 0 ? (
            <p className="text-gray-600">No pending nursery requests</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50 text-green-800">
                    <th className="p-3 text-left">Nursery Name</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Contact Number</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nurseryRequests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="p-3">{request.name}</td>
                      <td className="p-3">{request.address}</td>
                      <td className="p-3">{request.contact_number}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleRequestAction(request.id, "accept")
                            }
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                          >
                            <CheckCircle2 size={20} />
                          </button>
                          <button
                            onClick={() =>
                              handleRequestAction(request.id, "reject")
                            }
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Registered Nurseries Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Registered Nurseries
          </h2>
          {registeredNurseries.length === 0 ? (
            <p className="text-gray-600">No nurseries registered yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50 text-green-800">
                    <th className="p-3 text-left">Nursery Name</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredNurseries.map((nursery) => (
                    <tr key={nursery.id} className="border-b">
                      <td className="p-3">{nursery.name}</td>
                      <td className="p-3">{nursery.address}</td>
                      <td className="p-3">{nursery.contact_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
