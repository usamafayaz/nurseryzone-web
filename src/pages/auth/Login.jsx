import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Leaf } from "lucide-react";
import { useToaster } from "../../components/Toaster";

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("userpassword");
  const navigate = useNavigate();
  const addToast = useToaster();

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        addToast("Please enter username and password", "info");
        return;
      }
      console.log("Login with:", { email, password });
      const response = await fetch(
        `http://localhost:8000/api/login?email=${email}&password=${password}`
      );

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          if (errorData.detail === "Permission denied") {
            navigate("/nursery/pending-approval");
            return;
          }
        }

        addToast("Invalid credentials, please try again.", "error");
        return;
      }

      const result = await response.json();
      console.log(result);

      // Save the result object in localStorage
      localStorage.setItem("userData", JSON.stringify(result));
      addToast("Login successful!", "success");

      if (result.role.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else if (result.role.toLowerCase() === "nursery") {
        navigate("/nursery/dashboard");
      } else if (result.role.toLowerCase() === "customer") {
        navigate("/customer/dashboard");
      } else if (result.role.toLowerCase() === "deliveryboy") {
        navigate("/delivery-man/dashboard");
      }
    } catch (error) {
      addToast("Something went wrong. Please try again later.", "error");
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
          <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
          <p className="text-xl text-center max-w-md">
            Your personal gateway to a world of botanical wonders and expert
            gardening knowledge.
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
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to Nursery Zone
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg  transition-all duration-200 ease-in-out"
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg  transition-all duration-200 ease-in-out"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
            >
              Sign in
              <ArrowRight
                className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 ease-in-out"
                size={20}
              />
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            New to Nursery Zone?{" "}
            <span
              onClick={() => navigate("/role-selection")}
              className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
