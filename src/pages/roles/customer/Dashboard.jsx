import React, { useState } from "react";
import {
  Leaf,
  ShoppingCart,
  Heart,
  Search,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const plants = [
  {
    id: 2,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    price: 29.99,
    image:
      "https://img.freepik.com/free-photo/houseplant-with-long-leaves-pot-against-wooden-wall-lights_181624-14719.jpg?t=st=1732551605~exp=1732555205~hmac=38d7e0d33b74050e27efb209c470b85a466e7ecabf1b00c43a17c5a571c12fef&w=826",
    description: "Low-maintenance succulent known for air-purifying qualities.",
    careLevel: "Easy",
    sunExposure: "Low to Bright Indirect",
    wateringFrequency: "Bi-weekly",
    stock: 22,
    nurseryName: "Urban Jungle Nursery",
    nurseryContact: "+1 (555) 987-6543",
  },
  {
    id: 3,
    name: "Peace Lily",
    scientificName: "Spathiphyllum",
    price: 19.99,
    image:
      "https://img.freepik.com/free-photo/close-up-white-flower_23-2147810817.jpg?uid=R73542325&ga=GA1.1.519365141.1727002436&semt=ais_hybrid",
    description:
      "Beautiful indoor plant with glossy leaves and white blooms, easy to care for.",
    careLevel: "Easy",
    sunExposure: "Low to Moderate Indirect Light",
    wateringFrequency: "Weekly",
    stock: 10,
    nurseryName: "Flourish Plants",
    nurseryContact: "+1 (555) 555-1212",
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    price: 79.99,
    image:
      "https://img.freepik.com/free-photo/side-view-mission-figs-with-fig-half-wooden-table-horizontal_176474-7155.jpg?t=st=1732552327~exp=1732555927~hmac=c0843aff2946e60cfd1d626a157be6cd2354b3c02799e41f6910b5d0e97aa504&w=900",
    description:
      "Large, dramatic indoor tree with broad leaves, requires moderate care.",
    careLevel: "Moderate",
    sunExposure: "Bright Indirect Light",
    wateringFrequency: "Bi-weekly",
    stock: 5,
    nurseryName: "Urban Greenery",
    nurseryContact: "+1 (555) 321-7654",
  },
  {
    id: 5,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    price: 14.99,
    image:
      "https://img.freepik.com/free-photo/aloe-vera-leaves-isolated-white-background_181624-17062.jpg?t=st=1732552376~exp=1732555976~hmac=a7c3cfc4ea21f50338125d6d4f61c502f0f4d7e1004da730f859fc1a1fa42fbb&w=1060",
    description: "Succulent with medicinal properties, low-maintenance plant.",
    careLevel: "Easy",
    sunExposure: "Full Sun",
    wateringFrequency: "Monthly",
    stock: 30,
    nurseryName: "Succulent World",
    nurseryContact: "+1 (555) 111-2233",
  },
  {
    id: 1,
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    price: 45.99,
    image:
      "https://media.istockphoto.com/id/1310577216/photo/large-leaf-house-plant-monstera-deliciosa-in-a-gray-pot-on-a-white-background-in-a-light.webp?s=1024x1024&w=is&k=20&c=GpAh_sPtC1gR4WAo3TfxIsWGKYep3pSMWLGoQpp_z1A=",
    description:
      "Popular tropical houseplant with unique split leaves, perfect for indoor spaces.",
    careLevel: "Moderate",
    sunExposure: "Indirect Light",
    wateringFrequency: "Weekly",
    stock: 15,
    nurseryName: "Green Haven Nursery",
    nurseryContact: "+1 (555) 123-4567",
  },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [screen, setScreen] = useState("dashboard");

  const addToCart = (plant, quantity) => {
    const existingItem = cart.find((item) => item.id === plant.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...plant, quantity }]);
    }
    setScreen("dashboard");
  };

  const removeFromCart = (plantId) => {
    setCart(cart.filter((item) => item.id !== plantId));
  };

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(plantId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === plantId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const PlantDetailsScreen = () => {
    if (!selectedPlant) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
        <button
          onClick={() => setScreen("dashboard")}
          className="flex items-center text-green-600 mb-4"
        >
          <ChevronLeft size={24} /> Back to Plants
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={selectedPlant.image}
            alt={selectedPlant.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedPlant.name}
            </h2>
            <p className="text-gray-500 italic mb-4">
              {selectedPlant.scientificName}
            </p>
            <p className="text-green-600 text-2xl font-semibold mb-4">
              ${selectedPlant.price.toFixed(2)}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Care Level</p>
                <p className="font-semibold">{selectedPlant.careLevel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Sun Exposure</p>
                <p className="font-semibold">{selectedPlant.sunExposure}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Watering</p>
                <p className="font-semibold">
                  {selectedPlant.wateringFrequency}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">
                Nursery Details
              </h3>
              <p className="text-gray-600 mb-1">{selectedPlant.nurseryName}</p>
              <p className="text-gray-600">
                Contact: {selectedPlant.nurseryContact}
              </p>
            </div>

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
              onClick={() => addToCart(selectedPlant, selectedQuantity)}
              disabled={selectedPlant.stock === 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {selectedPlant.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartScreen = () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
        <button
          onClick={() => setScreen("dashboard")}
          className="flex items-center text-green-600 mb-4"
        >
          <ChevronLeft size={24} /> Back to Plants
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-green-50 p-1 rounded-full"
                    >
                      <Minus size={16} className="text-green-600" />
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-green-50 p-1 rounded-full"
                    >
                      <Plus size={16} className="text-green-600" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6">
                <div className="flex justify-between mb-4">
                  <span className="text-xl text-gray-700">Total</span>
                  <span className="text-2xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Leaf size={32} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">Plant Marketplace</h1>
              <p className="text-green-100 mt-1">
                Discover your perfect green companion
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/chat-bot")}
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Plant Assistant
            </button>
            <button onClick={() => {}} className="text-white">
              <Heart size={24} />
            </button>
            <button
              onClick={() => setScreen("cart")}
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex-grow mr-4">
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="bg-green-600 text-white p-2 rounded-lg">
            Filter
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => {
                setSelectedPlant(plant);
                setSelectedQuantity(1);
                setScreen("details");
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition hover:scale-105"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{plant.name}</h3>
                  <span className="text-green-600 font-bold">
                    ${plant.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {plant.scientificName}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedPlant(plant);
                      setSelectedQuantity(1);
                      setScreen("details");
                    }}
                    className="text-green-600 flex items-center hover:underline"
                  >
                    View Details <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => addToCart(plant, 1)}
                    disabled={plant.stock === 0}
                    className="bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 disabled:opacity-50"
                  >
                    {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === "dashboard" && <DashboardScreen />}
      {screen === "details" && <PlantDetailsScreen />}
      {screen === "cart" && <CartScreen />}
    </>
  );
};

export default CustomerDashboard;
