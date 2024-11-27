import React, { useState } from "react";
import { Home, FileText, DollarSign, Box, Image, Plus } from "lucide-react";
import { useToaster } from "../../../components/Toaster";
import { useLocation } from "react-router-dom";

const ManagePlants = () => {
  const [plantData, setPlantData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const addToast = useToaster();
  const location = useLocation();
  const nursery = location.state;

  const handleAddPlant = async () => {
    if (
      !plantData.name ||
      !plantData.price ||
      !plantData.image ||
      !plantData.description ||
      !plantData.stock
    ) {
      addToast("Please fill all the fields", "error");
      return;
    }
    // Create FormData
    const formData = new FormData();
    formData.append("nursery_id", nursery.user_id);
    formData.append("name", plantData.name);
    formData.append("description", plantData.description);
    formData.append("price", plantData.price);
    formData.append("stock", plantData.stock);
    formData.append("image", plantData.image);

    try {
      const response = await fetch("http://localhost:8000/api/nursery/plant", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        addToast("Plant added successfully", "success");
        setPlantData({
          name: "",
          description: "",
          price: "",
          stock: "",
          image: null,
        });
      } else {
        const data = await response.json();
        addToast(data.message || "Failed to add plant", "error");
      }
    } catch (err) {
      addToast("An error occurred. Please try again", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Home size={32} />
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
            {/* Name Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <div className="relative">
                <FileText
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
            </div>

            {/* Description Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={plantData.description}
                  onChange={(e) =>
                    setPlantData({ ...plantData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                  rows="3"
                ></input>
              </div>
            </div>

            {/* Price Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
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
            </div>

            {/* Stock Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <div className="relative">
                <Box
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  min="0"
                  value={plantData.stock}
                  onChange={(e) =>
                    setPlantData({ ...plantData, stock: e.target.value })
                  }
                  placeholder="Enter stock quantity"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* Image Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image *
              </label>
              <div className="relative">
                <Image
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setPlantData({ ...plantData, image: e.target.files[0] })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ease-in-out"
                />
              </div>
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
    </div>
  );
};

export default ManagePlants;
