import React from "react";
import { Leaf, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NurseryPendingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-green-50 to-white">
      <div className="hidden lg:flex lg:w-1/2 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="mb-8">
            <Leaf size={48} className="animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Under Review</h2>
          <p className="text-xl text-center max-w-md">
            Your nursery application is being carefully evaluated by our team.
          </p>
        </div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -bottom-28 -left-28 w-56 h-56 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -top-32 -right-32 w-64 h-64 border-4 border-white border-opacity-10 rounded-full" />
        <div className="absolute -top-28 -right-28 w-56 h-56 border-4 border-white border-opacity-10 rounded-full" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-green-100">
            <Clock
              size={64}
              className="mx-auto mb-6 text-green-600 animate-spin-slow"
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Approval Pending
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your application. Our team is currently reviewing
              your nursery profile. We appreciate your patience and will notify
              you once your account is approved.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("userData");
                  navigate("/");
                }}
                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseryPendingApproval;
