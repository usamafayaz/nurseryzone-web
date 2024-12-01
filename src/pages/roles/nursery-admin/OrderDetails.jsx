import React, { useState, useEffect } from "react";
import { DollarSign, Package, Calendar, User } from "lucide-react";
import { useToaster } from "../../../components/Toaster";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToast = useToaster();
  const [statusOptions] = useState([
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const updateOrderStatus = async (orderId, newStatus) => {
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
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, Status: newStatus } : order
        )
      );
      addToast("Order status updated successfully!", "success");
    } catch (err) {
      console.error(err);
      addToast("Invalid status transition!", "error");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let nursery = localStorage.getItem("userData");
        nursery = JSON.parse(nursery);
        const nurseryId = nursery?.user_id;

        const response = await fetch(
          `http://localhost:8000/api/order?nursery_id=${nurseryId}&skip=0&limit=20`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-green-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Package size={32} />
            <div>
              <h1 className="text-xl font-bold">Order Details</h1>
              <p className="text-green-100 mt-1">
                View and manage customer orders
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <Package
              size={48}
              className="mx-auto text-green-600 mb-4 animate-pulse"
            />
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-red-600 mb-4" />
            <p className="text-red-600">Error: {error}</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Ord#{order.order_id}
                      </h2>
                      <div className="flex items-center mt-1 text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span className="text-xs">
                          {new Date(order.Created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {order.Status}
                    </span>
                  </div>

                  <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <User size={16} className="text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-gray-900">
                      Customer
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order["Plant name"]}
                        </p>
                        <p className="text-xs text-gray-600">
                          Quantity: {order.qunatity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={14} className="text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          ${order["Total Amount"]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        Change Status
                      </span>
                      <div className="relative">
                        <select
                          className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 pl-2 py-2 pr-10"
                          value={order.Status}
                          onChange={(e) =>
                            updateOrderStatus(order.order_id, e.target.value)
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">
                        Total
                      </span>
                      <div className="flex items-center">
                        <DollarSign size={16} className="text-green-600 mr-1" />
                        <span className="text-base font-bold text-green-600">
                          ${order["Total Amount"]}
                        </span>
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
              No orders available
            </p>
            <p className="text-gray-500 mt-2">
              New orders will appear here when customers make purchases
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
