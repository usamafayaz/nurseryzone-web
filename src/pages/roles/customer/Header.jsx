import React from "react";
import { Leaf, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../../store/cartStore";

const Header = ({ onSearchChange, searchTerm }) => {
  const navigate = useNavigate();
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  return (
    <div className="bg-green-600 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Leaf size={32} className="text-white" />
          <div>
            <h1 className="text-xl font-bold">Plant Paradise</h1>
            <p className="text-green-100 mt-1">
              Discover your perfect green companion
            </p>
          </div>
        </div>

        {/* Header Icons */}
        <div className="flex items-center space-x-4">
          {onSearchChange && (
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={onSearchChange}
                className="px-3 py-2 rounded-lg text-black bg-stone-200 w-full"
              />
              <Search
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          )}

          <button
            onClick={() => navigate("/chat-bot")}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Plant Assistant
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="text-white relative"
          >
            <ShoppingCart size={24} />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;