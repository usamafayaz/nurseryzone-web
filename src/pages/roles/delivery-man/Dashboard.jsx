import React, { useState, useEffect } from "react";
import { Package, Calendar, User, Phone, Home, LogOut } from "lucide-react";
import { useToaster } from "../../../components/Toaster";
import LogoutModal from "../../../components/LogoutModal";

const DeliveryDasboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const addToast = useToaster();
  const [statusOptions] = useState(["Choose Status", "Delivered", "Cancelled"]);
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  let storedUserData = localStorage.getItem("userData");
  storedUserData = JSON.parse(storedUserData);

  useEffect(() => {
    fetchDeliveries();
  }, []);
  const fetchDeliveries = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delivery/schedule?user_id=${storedUserData.user_id}`
      );
      const result = await response.json();
      setDeliveries(result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (newStatus != "Choose Status") {
      try {
        const response = await fetch(
          `http://localhost:8000/api/order/status?order_id=${orderId}&status=${newStatus}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update order status.");
        }

        // Update the local state with the new status
        setDeliveries((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId ? { ...order, Status: newStatus } : order
          )
        );
        fetchDeliveries();

        addToast("Order status updated successfully!", "success");
      } catch (err) {
        console.error(err);
        addToast("Invalid status transition!", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-green-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Package size={32} />
            <div>
              <h1 className="text-xl font-bold">
                Welcome, {storedUserData.name}
              </h1>
              <p className="text-green-100 mt-1">
                View and manage your deliveries
              </p>
            </div>
            <button
              className="absolute right-10 z-10"
              onClick={handleLogoutClick}
            >
              <LogOut />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {deliveries.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveries.map((delivery) => (
              <div
                key={delivery.order_id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Ord#{delivery.order_id}
                      </h2>
                      <div className="flex items-center mt-1 text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span className="text-xs">
                          {new Date(
                            delivery.schedule_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {delivery.status}
                    </span>
                  </div>

                  <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <User size={16} className="text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {delivery.name}
                    </p>
                  </div>

                  <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {delivery.contact_number}
                    </p>
                  </div>

                  <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <Home size={16} className="text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {delivery.address}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        Change Status
                      </span>
                      <div className="relative">
                        <select
                          className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 pl-2 py-2 pr-10"
                          value={delivery.status}
                          onChange={(e) =>
                            updateOrderStatus(delivery.order_id, e.target.value)
                          }
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">
              No Deliveries assigned to you
            </p>
            <p className="text-gray-500 mt-2">
              New Deliveries will appear here when admin assign you!
            </p>
          </div>
        )}
      </div>
      {showModal && <LogoutModal setShowModal={setShowModal} />}
    </div>
  );
};

export default DeliveryDasboard;
