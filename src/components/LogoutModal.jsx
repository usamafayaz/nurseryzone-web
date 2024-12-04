import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, X, AlertTriangle } from "lucide-react";

const LogoutModal = ({ setShowModal }) => {
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    console.log("Logging out...");
    navigate("/");
    localStorage.removeItem("userData");
    localStorage.removeItem("plant-cart-storage");
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-modal-scale p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="text-yellow-500" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          You are about to log out of your account. Are you sure you want to
          proceed?
        </p>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center"
            onClick={handleCancel}
          >
            <X className="mr-2" size={16} />
            Cancel
          </button>
          <button
            className="
                px-4 py-2 rounded-lg 
                bg-red-500 text-white 
                hover:bg-red-600 
                transition-colors
                flex items-center
                shadow-md hover:shadow-lg
              "
            onClick={handleLogoutConfirm}
          >
            <LogOut className="mr-2" size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
