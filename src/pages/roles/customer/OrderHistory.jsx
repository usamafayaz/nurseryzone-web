import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  XCircle,
  Package,
  Calendar,
  User,
  Send,
  X,
  MessageSquare,
} from "lucide-react";
import { useToaster } from "../../../components/Toaster";
import { BiMoney } from "react-icons/bi";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [comment, setComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const addToast = useToaster();
  const statusStyles = {
    Pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
    Processing: { bg: "bg-blue-100", text: "text-blue-800" },
    Shipped: { bg: "bg-purple-100", text: "text-purple-800" },
    Delivered: { bg: "bg-green-100", text: "text-green-800" },
    Cancelled: { bg: "bg-red-100", text: "text-red-800" },
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
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFeedbackSubmit = async () => {
    try {
      console.log({
        order_id: selectedOrder.order_id,
        comment: comment,
      });

      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: selectedOrder.order_id,
          comment: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setFeedbackSubmitted((prev) => ({
        ...prev,
        [selectedOrder.order_id]: true,
      }));

      addToast("Feedback submitted successfully!", "success");
      setShowModal(false);
    } catch (error) {
      addToast(`Error submitting feedback: ${error.message}`, "success");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Package
            size={48}
            className="mx-auto text-green-600 mb-4 animate-pulse"
          />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <XCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-600">Error: {error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center mb-6">
          <List size={32} className="mr-4 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">
              You haven't placed any orders yet
            </p>
            <p className="text-gray-500 mt-2">
              Browse plants to make your first purchase!
            </p>
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Browse Plants
            </button>
          </div>
        ) : (
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
                        Order #
                        {`ORD-${String(order.order_id).padStart(4, "0")}`}
                      </h2>
                      <div className="flex items-center mt-1 text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span className="text-xs">
                          {new Date(order.Created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[order.Status]?.bg
                      } ${statusStyles[order.Status]?.text}`}
                    >
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
                        <BiMoney size={14} className="text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          Rs{order["Total Amount"].toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {order.Status === "Delivered" &&
                    !feedbackSubmitted[order.order_id] && (
                      <button
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                      >
                        Write Feedback
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto animate-modal-scale">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="mr-2 text-green-600" />
                  Order Feedback
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Provide feedback for Order #
                {`ORD-${String(selectedOrder.order_id).padStart(4, "0")}`}
              </p>

              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                placeholder="Share your experience..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center justify-center px-4 py-2 rounded-lg transition  bg-green-500 hover:bg-green-600 text-white
                  "
                  onClick={handleFeedbackSubmit}
                >
                  <Send size={16} className="mr-2" /> Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
