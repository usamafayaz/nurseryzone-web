import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Leaf,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import { useToaster } from "../../../components/Toaster";

const DeliveryBoy = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  let storedUserData = localStorage.getItem("userData");
  storedUserData = JSON.parse(storedUserData);
  const addToast = useToaster();

  const addDeliveryBoy = async () => {
    const data = {
      email,
      name,
      address,
      password_hash: password,
      contact_number: contactNumber,
      nursery_id: storedUserData.user_id,
    };
    console.log(data);

    const response = await fetch("http://localhost:8000/api/delivery/boy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      addToast("Nursery boy successfully added.", "success");
      navigate("/nursery/dashboard");
    } else {
      addToast("Error adding nursery boy!", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-green-50 to-white">
      <div className="hidden lg:flex lg:w-1/2 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="mb-8">
            <Leaf size={48} className="animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Register a Delivery Boy</h2>
          <p className="text-xl text-center max-w-md">
            Add a delivery associate to streamline your nursery's operations
          </p>
        </div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -bottom-28 -left-28 w-56 h-56 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -top-32 -right-32 w-64 h-64 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -top-28 -right-28 w-56 h-56 border-4 border-white border-opacity-10 rounded-full" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Register Delivery Associate
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Register a delivery associate to ensure smooth and efficient
              deliveries.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"Full Name"}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Contact Number"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                  required
                />
              </div>
            </div>

            <button
              onClick={addDeliveryBoy}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
            >
              Add Delivery Boy
              <ArrowRight
                className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 ease-in-out"
                size={20}
              />
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoy;
