import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-stone-700">
          Confirm Logout
        </h2>
        <p className="text-stone-500">Are you sure you want to log out?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogoutConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
