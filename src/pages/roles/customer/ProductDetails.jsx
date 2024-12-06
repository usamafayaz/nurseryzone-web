import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Minus, MessageSquare, Quote, UserCircle2 } from "lucide-react";
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
    window.scrollTo(0, 0);
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

  const generatePastelBackground = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  };

  return (
    <div className="flex flex-col  bg-gradient-to-br from-green-50 to-white">
      <Header />
      <div className="flex flex-1 overflow-hidden container mx-auto px-4 p-8">
        <div className="w-1/2 bg-green-50 rounded-2xl flex items-center justify-center px-8">
          <img
            src={`http://localhost:8000/api${plant.image_url}`}
            alt={plant.name}
            className="max-w-[80%] max-h-[80%] object-contain shadow-xl rounded-2xl transform transition hover:scale-105"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-center px-12 space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-green-900 mb-2">
              {plant.name}
            </h1>
            <p className="text-gray-600 mb-4">{plant.description}</p>
            <div className="text-3xl font-extrabold text-green-800 mb-4">
              Rs. {plant.price}
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

      <div className="px-12 py-12 bg-green-50/50">
        <div className="container mx-auto">
          {reviews.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold text-green-900 mb-8 flex items-center">
                <MessageSquare size={36} className="mr-4 text-green-600" />
                Customer Experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <div
                    key={review.order_id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
                  >
                    <div
                      className="h-2 w-full"
                      style={{ backgroundColor: generatePastelBackground() }}
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
                          style={{
                            backgroundColor: generatePastelBackground(),
                          }}
                        >
                          <UserCircle2 size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="relative pl-6">
                        <Quote
                          className="absolute left-0 top-0 text-green-300 opacity-50"
                          size={24}
                        />
                        <p className="text-gray-700 italic">
                          "{review.comment}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <MessageSquare
                size={64}
                className="mx-auto text-green-300 mb-6"
              />
              <p className="text-2xl font-semibold text-gray-900 mb-4">
                No experiences shared yet
              </p>
              <p className="text-gray-600 max-w-md mx-auto">
                Be the first to share your thoughts about this beautiful plant!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
