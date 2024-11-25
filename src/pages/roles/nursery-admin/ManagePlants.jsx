import React, { useState } from "react";
import { Leaf, Calendar, Tag, DollarSign, Plus } from "lucide-react";

const ManagePlants = () => {
  const [plantData, setPlantData] = useState({
    name: "",
    season: "",
    type: "",
    price: "",
  });

  const [error, setError] = useState("");

  const handleAddPlant = () => {
    if (
      !plantData.name ||
      !plantData.season ||
      !plantData.type ||
      !plantData.price
    ) {
      setError("All fields are required.");
      return;
    }
    setError("");
    alert("Plant added successfully");
    setPlantData({ name: "", season: "", type: "", price: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Leaf size={32} />
            <div>
              <h1 className="text-xl font-bold">Manage Plants</h1>
              <p className="text-green-100 mt-1">
                Add new plants to your inventory
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

          <div className="space-y-6">
            {/* Plant Name Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Name
              </label>
              <div className="relative">
                <Leaf
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={plantData.name}
                  onChange={(e) =>
                    setPlantData({ ...plantData, name: e.target.value })
                  }
                  placeholder="Enter plant name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                />
              </div>
              {error && !plantData.name && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            {/* Season Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={plantData.season}
                  onChange={(e) =>
                    setPlantData({ ...plantData, season: e.target.value })
                  }
                  placeholder="Enter season"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                />
              </div>
              {error && !plantData.season && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            {/* Type Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={plantData.type}
                  onChange={(e) =>
                    setPlantData({ ...plantData, type: e.target.value })
                  }
                  placeholder="Enter type"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                />
              </div>
              {error && !plantData.type && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            {/* Price Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  value={plantData.price}
                  onChange={(e) =>
                    setPlantData({ ...plantData, price: e.target.value })
                  }
                  placeholder="Enter price"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                />
              </div>
              {error && !plantData.price && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAddPlant}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
            >
              <Plus size={20} className="mr-2" />
              Add Plant
            </button>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="fixed -bottom-32 -left-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -bottom-28 -left-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-32 -right-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-28 -right-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
    </div>
  );
};

export default ManagePlants;
