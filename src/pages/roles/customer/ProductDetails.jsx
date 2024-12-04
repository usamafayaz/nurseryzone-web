import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Minus, MessageSquare } from "lucide-react";
import useCartStore from "../../../store/cartStore";
import Header from "./Header";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plant } = location.state || {};
  const [reviews, setReviews] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!plant) {
    return (
      <div className="flex justify-center items-center h-screen">
        No plant selected
      </div>
    );
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/feedback/?plant_id=${plant.plant_id}`
      );
      if (response.ok) {
        const result = await response.json();
        setReviews(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    addToCart(plant, selectedQuantity);
    navigate("/cart");
  };

  return (
    <div className="flex flex-col">
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
              Price: {plant.price} Rs
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

      <div className=" px-6 py-8">
        {reviews.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold pb-6">Customer Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.order_id}
                  className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {review.name}
                      </h2>
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">No reviews yet</p>
            <p className="text-gray-500 mt-2">
              Customer reviews will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
