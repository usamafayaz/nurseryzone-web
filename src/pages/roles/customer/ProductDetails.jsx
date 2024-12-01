import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import useCartStore from "../../../store/cartStore";
import Header from "./Header";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plant } = location.state || {};
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!plant) {
    return (
      <div className="flex justify-center items-center h-screen">
        No plant selected
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(plant, selectedQuantity);
    navigate("/cart");
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 bg-green-100 flex items-center justify-center">
          <img
            src={`http://localhost:8000/api${plant.image_url}`}
            alt={plant.name}
            className="max-w-[80%] max-h-[80%] object-contain shadow-lg rounded-lg"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-center px-12 space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-green-900 mb-2">
              Title: {plant.name}
            </h1>
            <p className="text-gray-600 mb-4">
              Description: {plant.description}
            </p>
            <div className="text-3xl font-extrabold text-green-800 mb-4">
              Price: ${plant.price}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() =>
                setSelectedQuantity(Math.max(1, selectedQuantity - 1))
              }
              className="bg-green-50 p-2 rounded-full hover:bg-green-100 transition"
            >
              <Minus size={20} className="text-green-700" />
            </button>
            <span className="text-xl font-semibold">{selectedQuantity}</span>
            <button
              onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              className="bg-green-50 p-2 rounded-full hover:bg-green-100 transition"
            >
              <Plus size={20} className="text-green-700" />
            </button>
          </div>

          <div>
            {plant.stock < 15 && plant.stock !== 0 && (
              <p className="text-red-500 mb-2">Only a few items are left!</p>
            )}
            <button
              onClick={handleAddToCart}
              disabled={plant.stock < selectedQuantity}
              className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition ${
                plant.stock >= selectedQuantity
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {plant.stock == 0
                ? "Out of Stock"
                : plant.stock < selectedQuantity
                ? "Stock is less than your selected quantity"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
