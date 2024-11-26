import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Leaf, Info, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NurseryRequests = () => {
  const [selectedNursery, setSelectedNursery] = useState(null);
  const [nurseryRequests, setNurseryRequests] = useState([]);

  useEffect(() => {
    getNurseryRequests();
  }, []);

  const handleRequestAction = async (nurseryId, action) => {
    console.log(typeof nurseryId);
    console.log(nurseryId);

    setNurseryRequests((prev) =>
      prev.filter((req) => req.nursery_id !== nurseryId)
    );
    setSelectedNursery(null);
    const is_accepted = action === "accept" ? true : false;
    try {
      const response = await fetch(
        `http://localhost:8000/api/nursery/request?nursery_id=${nurseryId}&is_accepted=${is_accepted}`,
        {
          method: "POST",
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getNurseryRequests = async () => {
    console.log("Fetching Data from DB");
    try {
      const response = await fetch(
        "http://localhost:8000/api/nursery/request?pending_request=true&skip=0&limit=20"
      );
      if (response.ok) {
        const data = await response.json();
        setNurseryRequests(data);
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

        <div className="flex justify-between items-center my-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Nursery Details
          </h2>
          <div className="flex space-x-2">
            <div className="relative group">
              <button
                onClick={() =>
                  handleRequestAction(nursery.nursery_id, "accept")
                }
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
              >
                <CheckCircle2 size={20} />
              </button>
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black p-2 rounded opacity-0 group-hover:opacity-100 transition">
                Accept
              </div>
            </div>
            <div className="relative group">
              <button
                onClick={() =>
                  handleRequestAction(nursery.nursery_id, "reject")
                }
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                <XCircle size={20} />
              </button>
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black p-2 rounded opacity-0 group-hover:opacity-100 transition">
                Reject
              </div>
            </div>
          </div>
        </div>

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
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Leaf size={32} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">Nursery Requests</h1>
              <p className="text-green-100 mt-1">
                Review and manage nursery registration requests
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {nurseryRequests.length === 0 ? (
            <div className="text-center py-8">
              <Info size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-xl">
                No pending nursery requests
              </p>
            </div>
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
                    <tr
                      key={request.id}
                      className="border-b hover:bg-green-50 cursor-pointer"
                      onClick={() => setSelectedNursery(request)}
                    >
                      <td className="p-3">{request.name}</td>
                      <td className="p-3">{request.address}</td>
                      <td className="p-3">{request.contact_number}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAction(request.nursery_id, "accept");
                            }}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                          >
                            <CheckCircle2 size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAction(request.nursery_id, "reject");
                            }}
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

        {/* Nursery Details Modal */}
        {selectedNursery && renderNurseryModal(selectedNursery)}
      </div>
    </div>
  );
};

export default NurseryRequests;
