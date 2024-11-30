import React, { useState, useEffect } from "react";
import { Leaf, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/nursery/plants?skip=${0}&limit=${20}`
      );
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (plant, quantity = 1) => {
    const existingItem = cart.find((item) => item.plant_id === plant.plant_id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.plant_id === plant.plant_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...plant, quantity }]);
    }
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
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
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Plant Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading plants...</p>
          </div>
        ) : (
          <>
            {/* Search Input */}
            <div className="relative mx-4 mb-4">
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded-lg text-black bg-stone-200 w-full"
              />
              <Search
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                <ProductCard
                  key={plant.plant_id}
                  plant={plant}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
