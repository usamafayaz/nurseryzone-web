import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, MapPin, ChevronLeft } from "lucide-react";

const CheckoutScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    // Address Validation
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    // Payment Validation
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardNumberRegex.test(formData.cardNumber.replace(/\D/g, ""))) {
      newErrors.cardNumber = "Invalid card number";
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date (MM/YY)";
    }

    const cvvRegex = /^[0-9]{3,4}$/;
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Prepare order data
        const orderData = {
          ...formData,
          items: cart,
          totalPrice,
        };

        // Mock API call to submit order
        const response = await fetch("http://localhost:8000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          // Clear cart and navigate to confirmation
          navigate("/order-confirmation", {
            state: {
              orderData,
            },
          });
        } else {
          // Handle error
          alert("Order submission failed");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        alert("An error occurred during checkout");
      }
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

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Personal Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-green-600" /> Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit phone number"
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Shipping & Payment Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 text-green-600" /> Shipping & Payment
            </h3>

            <div>
              <label className="block mb-2 text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-gray-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="16-digit card number"
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="3-4 digit CVV"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2 mt-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
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
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold text-xl">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Complete Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutScreen;
