import React, { useEffect, useState } from "react";
import { Leaf, Info, X } from "lucide-react";

const RegisteredNurseries = () => {
  const [registeredNurseries, setRegisteredNurseries] = useState([]);
  const [selectedNursery, setSelectedNursery] = useState(null);
  useEffect(() => {
    getNurseries();
  }, []);
  const getNurseries = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/nursery/request?pending_request=false&skip=0&limit=20"
      );
      if (response.ok) {
        const data = await response.json();
        setRegisteredNurseries(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedNursery && renderNurseryModal(selectedNursery)}
      </div>
    </div>
  );
};

export default RegisteredNurseries;
