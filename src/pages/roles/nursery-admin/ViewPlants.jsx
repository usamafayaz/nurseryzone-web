import React, { useEffect, useState } from "react";
import { Leaf, Edit, Trash2, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToaster } from "../../../components/Toaster";

const ViewPlants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nursery = location.state;
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPlant, setModalPlant] = useState(null);
  const addToast = useToaster();
  // Fetch plants from API
  useEffect(() => {
    fetchPlants();
  }, []);
  const fetchPlants = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/nursery/plants?nursery_id=${
          nursery.user_id
        }&skip=${0}&limit=${20}`
      );
      const data = await response.json();
      console.log(data);

      setPlants(data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (plant) => {
    setModalPlant(plant);
  };

  const handleDelete = async (plantId) => {
    const response = await fetch(
      `http://localhost:8000/api/nursery/plant?plant_id=${plantId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      addToast("Plant Successfully Deleted", "success");
      setPlants(plants.filter((plant) => plant.plant_id !== plantId));
    }
  };

  const handleModalClose = () => {
    setModalPlant(null);
  };

  const handleModalSave = async () => {
    if (
      !modalPlant.name ||
      !modalPlant.description ||
      !modalPlant.price ||
      !modalPlant.stock ||
      !modalPlant.image
    ) {
      addToast("Please fill in all fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("plant_id", modalPlant.plant_id);
    formData.append("name", modalPlant.name);
    formData.append("description", modalPlant.description);
    formData.append("price", modalPlant.price);
    formData.append("stock", modalPlant.stock);
    formData.append("image", modalPlant.image);

    try {
      const response = await fetch(`http://localhost:8000/api/nursery/plant`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update plant");
      }

      const updatedPlant = await response.json();
      addToast("Plant updated successfully", "success");

      // Fetch updated plants or update the state directly
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.plant_id === updatedPlant.plant_id ? updatedPlant : plant
        )
      );
      fetchPlants();

      handleModalClose();
    } catch (error) {
      console.error("Error updating plant:", error);
      addToast("Failed to update plant", "error");
    }
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
              onClick={() =>
                navigate("/nursery/manage-plants", { state: nursery })
              }
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
        {loading ? (
          <div className="text-center py-12">
            <Leaf size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">
              Loading plants...
            </p>
          </div>
        ) : plants.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {plants.map((plant) => (
              <div
                key={plant.plant_id}
                className="bg-white rounded-xl shadow-lg relative overflow-hidden"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />
                <div className="p-6">
                  <img
                    src={` http://127.0.0.1:8000/api${plant.image_url}`}
                    alt={plant.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
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
                        onClick={() => handleDelete(plant.plant_id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {plant.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Price</span>
                      <span className="font-medium text-green-600">
                        ${plant.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Stock</span>
                      <span className="font-medium text-gray-900">
                        {plant.stock}
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
              onClick={() =>
                navigate("/nursery/manage-plants", { state: nursery })
              }
              className="mt-6 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Your First Plant
            </button>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {modalPlant && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Edit Plant</h3>
            <input
              type="text"
              value={modalPlant.name}
              onChange={(e) =>
                setModalPlant({ ...modalPlant, name: e.target.value })
              }
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
              placeholder="Plant Name"
            />
            <textarea
              value={modalPlant.description}
              onChange={(e) =>
                setModalPlant({ ...modalPlant, description: e.target.value })
              }
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
              placeholder="Description"
              rows="4"
            />
            <input
              type="number"
              value={modalPlant.price}
              onChange={(e) =>
                setModalPlant({ ...modalPlant, price: e.target.value })
              }
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
              placeholder="Price"
            />
            <input
              type="number"
              value={modalPlant.stock}
              onChange={(e) =>
                setModalPlant({ ...modalPlant, stock: e.target.value })
              }
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
              placeholder="Stock"
            />
            <input
              type="file"
              onChange={(e) =>
                setModalPlant({ ...modalPlant, image: e.target.files[0] })
              }
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
              placeholder="Upload New Image"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPlants;
