import React, { useState } from "react";
import { Leaf, Edit, Trash2, ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DUMMY_PLANTS } from "../utils/dummyData";

const ViewPlantsScreen = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState(DUMMY_PLANTS);

  const handleEdit = (plant) => {
    console.log("Editing plant:", plant);
    // Your logic to edit plant
  };

  const handleDelete = (plantId) => {
    setPlants(plants.filter((plant) => plant.id !== plantId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Leaf size={32} />
              <div>
                <h1 className="text-xl font-bold">Your Plants</h1>
                <p className="text-green-100 mt-1">
                  View and manage your plant inventory
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/manage-plants")}
              className="flex items-center px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add New Plant
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {plants.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-xl shadow-lg relative overflow-hidden"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {plant.name}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(plant)}
                        className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(plant.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Season</span>
                      <span className="font-medium text-gray-900">
                        {plant.season}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Type</span>
                      <span className="font-medium text-gray-900">
                        {plant.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Price</span>
                      <span className="font-medium text-green-600">
                        ${plant.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Leaf size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">
              No plants available
            </p>
            <p className="text-gray-500 mt-2">Add some plants to get started</p>
            <button
              onClick={() => navigate("/manage-plants")}
              className="mt-6 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Your First Plant
            </button>
          </div>
        )}
      </div>

      {/* Decorative circles */}
      <div className="fixed -bottom-32 -left-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -bottom-28 -left-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-32 -right-32 w-64 h-64 border-4 border-green-600 border-opacity-10 rounded-full" />
      <div className="fixed -top-28 -right-28 w-56 h-56 border-4 border-green-600 border-opacity-10 rounded-full" />
    </div>
  );
};

export default ViewPlantsScreen;
