import React, { useState } from "react";
import {
  ChevronLeft,
  Leaf,
  Info,
  MoreVertical,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisteredNurseries = () => {
  const navigate = useNavigate();
  const [registeredNurseries, setRegisteredNurseries] = useState([
    {
      id: 1,
      name: "Bloom & Grow Nursery",
      address: "789 Meadow Rd, Austin, TX 78701",
      contact_number: "(555) 246-8135",
      email: "info@bloomandgrow.com",
      owner_name: "Emily Rodriguez",
      business_type: "Retail Nursery",
      years_in_business: 7,
      specialties: ["Native Plants", "Landscaping Supplies"],
      status: "Active",
    },
    {
      id: 2,
      name: "Evergreen Nurseries",
      address: "321 Forest Lane, Seattle, WA 98101",
      contact_number: "(555) 135-7924",
      email: "contact@evergreennurseries.com",
      owner_name: "David Kim",
      business_type: "Wholesale Nursery",
      years_in_business: 12,
      specialties: ["Tree Saplings", "Commercial Landscaping"],
      status: "Active",
    },
  ]);

  const [selectedNursery, setSelectedNursery] = useState(null);
  //   const [activeOptionsMenu, setActiveOptionsMenu] = useState(null);

  //   const handleDeleteNursery = (nurseryId) => {
  //     setRegisteredNurseries((prev) =>
  //       prev.filter((nursery) => nursery.id !== nurseryId)
  //     );
  //     setSelectedNursery(null);
  //     setActiveOptionsMenu(null);
  //   };

  const renderNurseryModal = (nursery) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
        <button
          onClick={() => setSelectedNursery(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Nursery Details
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-700">Nursery Name</p>
            <p className="text-gray-600">{nursery.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Contact Number</p>
            <p className="text-gray-600">{nursery.contact_number}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-gray-600">{nursery.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Address</p>
            <p className="text-gray-600">{nursery.address}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Owner Name</p>
            <p className="text-gray-600">{nursery.owner_name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Business Type</p>
            <p className="text-gray-600">{nursery.business_type}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Years in Business</p>
            <p className="text-gray-600">{nursery.years_in_business}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Specialties</p>
            <p className="text-gray-600">{nursery.specialties.join(", ")}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Status</p>
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
              {nursery.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Leaf size={32} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">Registered Nurseries</h1>
              <p className="text-green-100 mt-1">
                Manage and view all registered nurseries
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Registered Nurseries Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {registeredNurseries.length === 0 ? (
            <div className="text-center py-8">
              <Info size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-xl">No nurseries registered</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50 text-green-800">
                    <th className="p-3 text-left">Nursery Name</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Contact Number</th>
                    {/* <th className="p-3 text-center">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {registeredNurseries.map((nursery) => (
                    <tr
                      key={nursery.id}
                      className="border-b hover:bg-green-50 relative"
                    >
                      <td
                        className="p-3 cursor-pointer"
                        onClick={() => setSelectedNursery(nursery)}
                      >
                        {nursery.name}
                      </td>
                      <td
                        className="p-3 cursor-pointer"
                        onClick={() => setSelectedNursery(nursery)}
                      >
                        {nursery.address}
                      </td>
                      <td
                        className="p-3 cursor-pointer"
                        onClick={() => setSelectedNursery(nursery)}
                      >
                        {nursery.contact_number}
                      </td>
                      {/* <td className="p-3 text-center">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveOptionsMenu(
                                activeOptionsMenu === nursery.id
                                  ? null
                                  : nursery.id
                              )
                            }
                            className="hover:bg-green-100 p-2 rounded-full"
                          >
                            <MoreVertical size={20} />
                          </button>
                          {activeOptionsMenu === nursery.id && (
                            <div className="absolute right-0 top-full z-10 bg-white shadow-md rounded-md border mt-2">
                              <button
                                className="flex items-center w-full p-2 hover:bg-green-50 text-sm"
                                onClick={() => {
                                  // TODO: Implement edit functionality
                                  console.log("Edit nursery");
                                }}
                              >
                                <Edit size={16} className="mr-2" /> Edit
                              </button>
                              <button
                                className="flex items-center w-full p-2 hover:bg-red-50 text-sm text-red-600"
                                onClick={() => handleDeleteNursery(nursery.id)}
                              >
                                <Trash2 size={16} className="mr-2" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Nursery Details Modal */}
        {selectedNursery && renderNurseryModal(selectedNursery)}
      </div>
    </div>
  );
};

export default RegisteredNurseries;
