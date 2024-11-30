import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

const ProductCard = ({ plant }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleViewDetails = () => {
    navigate(`/product/${plant.plant_id}`, { state: { plant } });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition hover:scale-105"
      onClick={handleViewDetails}
    >
      <img
        src={`http://localhost:8000/api${plant.image_url}`}
        alt={plant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{plant.name}</h3>
          <span className="text-green-600 font-bold">
            ${parseFloat(plant.price).toFixed(2)}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4">{plant.description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleViewDetails}
            className="text-green-600 flex items-center hover:underline"
          >
            View Details <ChevronRight size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to details
              addToCart(plant, 1);
            }}
            disabled={plant.stock === 0}
            className="bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 disabled:opacity-50"
          >
            {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
