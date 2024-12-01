import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, Clock, CheckCircle, XCircle, Package } from "lucide-react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const statusStyles = {
    Pending: {
      color: "text-yellow-500",
      icon: <Clock className="inline mr-2" />,
      description: "Order is being processed",
    },
    Completed: {
      color: "text-green-500",
      icon: <CheckCircle className="inline mr-2" />,
      description: "Order has been delivered",
    },
    Cancelled: {
      color: "text-red-500",
      icon: <XCircle className="inline mr-2" />,
      description: "Order was cancelled",
    },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!storedUserData?.user_id) {
          throw new Error("User data not found in local storage");
        }

        const response = await fetch(
          `http://localhost:8000/api/order/${storedUserData.user_id}?skip=0&limit=20`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [storedUserData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="mx-auto text-green-600 mb-4" />
          <p className="text-[#7F8C8D]">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <XCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-[#7F8C8D]">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <List size={32} className="mr-4 text-green-600" />
          <h1 className="text-2xl font-bold text-[#2C3E50]">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-10">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-[#7F8C8D]">You haven't placed any orders yet</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Browse Plants
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order.order_id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#2C3E50]">
                      Order #{`ORD-${String(order.order_id).padStart(4, "0")}`}
                    </h2>
                    <p className="text-sm text-[#7F8C8D]">
                      {new Date(order.Created_at).toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`flex items-center ${
                      statusStyles[order.Status]?.color || "text-gray-500"
                    }`}
                  >
                    {statusStyles[order.Status]?.icon}
                    <span className="font-medium">{order.Status}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#2C3E50]">
                      <span className="font-semibold">Plant:</span>{" "}
                      {order["Plant name"]}
                    </p>
                    <p className="text-[#7F8C8D]">
                      <span className="font-medium">Quantity:</span>{" "}
                      {order.qunatity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₹{order["Total Amount"].toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
