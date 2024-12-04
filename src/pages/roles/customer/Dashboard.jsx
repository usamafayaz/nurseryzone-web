import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // // Use Zustand hook to get cart items and total items
  // const cart = useCartStore((state) => state.cart);
  // const totalCartItems = useCartStore((state) => state.getTotalItems());

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
  let filteredPlants = [];
  if (plants.length > 0) {
    filteredPlants = plants?.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-[#4A4A4A] opacity-50" />
            </div>
            <input
              type="text"
              placeholder="Search plants by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl 
                bg-white 
                border border-[#E0E0E0] 
                text-[#2C3E50] 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#2ECC71] 
                transition duration-300 
                shadow-sm"
            />
          </div>

          <button
            className="
            bg-[#2ECC71] 
            text-white 
            p-3 
            rounded-xl 
            hover:bg-[#27AE60] 
            transition 
            flex 
            items-center 
            justify-center
            shadow-md
          "
          >
            <Filter size={20} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-[#7F8C8D]">Loading plants...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPlants.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-[#7F8C8D] text-lg">
                  No plants found matching your search
                </p>
              </div>
            ) : (
              filteredPlants.map((plant) => (
                <ProductCard key={plant.plant_id} plant={plant} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
