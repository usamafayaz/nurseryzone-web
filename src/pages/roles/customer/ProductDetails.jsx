import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Minus } from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plant } = location.state || {};

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!plant) {
    return <div>No plant selected</div>;
  }

  const handleAddToCart = () => {
    // Implement add to cart logic
    // You might want to pass this up to a parent component or use context
    navigate("/cart", {
      state: {
        plant,
        quantity: selectedQuantity,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <button
        onClick={() => navigate("/customer/dashboard")}
        className="flex items-center text-green-600 mb-4"
      >
        <ChevronLeft size={24} /> Back to Plants
      </button>

      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={`http://localhost:8000/api${plant.image_url}`}
          alt={plant.name}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {plant.name}
          </h2>
          <p className="text-gray-500 italic mb-4">{plant.description}</p>
          <p className="text-green-600 text-2xl font-semibold mb-4">
            ${plant.price}
          </p>

          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() =>
                setSelectedQuantity(Math.max(1, selectedQuantity - 1))
              }
              className="bg-green-50 p-2 rounded-full"
            >
              <Minus size={20} className="text-green-600" />
            </button>
            <span className="text-xl font-semibold">{selectedQuantity}</span>
            <button
              onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              className="bg-green-50 p-2 rounded-full"
            >
              <Plus size={20} className="text-green-600" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={plant.stock === 0}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
