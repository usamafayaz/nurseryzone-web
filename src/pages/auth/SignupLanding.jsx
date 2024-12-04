import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Users, ShoppingBasket } from "lucide-react";

const SignupLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-green-50 to-white">
      <div className="hidden lg:flex lg:w-1/2 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="mb-8">
            <Leaf size={48} className="animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Welcome to Nursery Zone</h2>
          <p className="text-xl text-center max-w-md">
            Choose your role and start your journey in the world of plants and
            gardening.
          </p>
        </div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -bottom-28 -left-28 w-56 h-56 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -top-32 -right-32 w-64 h-64 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -top-28 -right-28 w-56 h-56 border-4 border-white border-opacity-10 rounded-full" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Role</h2>
          <p className="text-sm text-gray-600 mb-6">
            Select how you want to interact with Nursery Zone
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/signup?role=Customer")}
              className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all duration-200 ease-in-out"
            >
              <ShoppingBasket
                className="mr-3 group-hover:animate-pulse"
                size={24}
              />
              Sign up as Customer
            </button>
            <button
              onClick={() => navigate("/signup?role=Nursery Admin")}
              className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition-all duration-200 ease-in-out"
            >
              <Users className="mr-3 group-hover:animate-pulse" size={24} />
              Sign up as Nursery Admin
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
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

export default SignupLanding;
