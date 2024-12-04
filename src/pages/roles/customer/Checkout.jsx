import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, ChevronLeft, ShoppingCart, CreditCard } from "lucide-react";
import { useToaster } from "../../../components/Toaster";

const CheckoutScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  // Get stored user data from localStorage
  let storedUserData = localStorage.getItem("userData");
  storedUserData = JSON.parse(storedUserData);
  const addToast = useToaster();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare order data
      const orderData = {
        user_id: storedUserData.user_id,
        plant_id: cart[0].plant_id,
        quantity: cart[0].quantity,
      };
      console.log(orderData);

      const response = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        addToast("Order placed successfully!", "success");
        navigate("/customer/dashboard");
      } else {
        addToast("Order Submission Failed!", "error");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-2xl mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center text-green-600 mb-4"
      >
        <ChevronLeft size={24} /> Back to Cart
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-green-600" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={storedUserData.name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={storedUserData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={storedUserData.contact_number}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Address</label>
                <input
                  type="text"
                  value={storedUserData.address}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 text-green-600" /> Payment Method
            </h3>
            <div className="flex items-center">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="mr-2"
              />
              <label htmlFor="cod" className="text-gray-700">
                Cash on Delivery (COD)
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="online"
                name="paymentMethod"
                value="Online"
                disabled
                className="mr-2"
              />
              <label htmlFor="online" className="text-gray-700">
                Online Payment (Currently unavailable)
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-green-600" /> Order Summary
            </h3>
            {cart.map((item) => (
              <div
                key={item.plant_id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:8000/api${item.image_url}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold text-xl">
              <span>Total</span>
              <span>Rs. {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            >
              Complete Order
              <ChevronLeft className="ml-2 rotate-180" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
