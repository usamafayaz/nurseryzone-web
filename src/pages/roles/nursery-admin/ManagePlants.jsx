import React, { useEffect, useState } from "react";
import { Leaf, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../../../components/Toaster";

const ManagePlants = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPlant, setModalPlant] = useState(null);
  const addToast = useToaster();
  let nursery = localStorage.getItem("userData");
  nursery = JSON.parse(nursery);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/nursery/plants?nursery_id=${nursery.user_id}&skip=0&limit=20`
      );
      const data = await response.json();
      if (response.ok) {
        setPlants(data);
      }
    } catch (error) {
      console.error("Error fetching plants:", error);
      addToast("Failed to fetch plants", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plant) => {
    setModalPlant({ ...plant, currentImage: plant.image_url });
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
    const requiredFields = ["name", "description", "price", "stock"];
    const missingFields = requiredFields.filter((field) => !modalPlant[field]);

    if (missingFields.length > 0) {
      addToast(`Please fill in: ${missingFields.join(", ")}`, "error");
      return;
    }

    const formData = new FormData();
    Object.keys(modalPlant).forEach((key) => {
      if (key !== "currentImage") {
        formData.append(key, modalPlant[key]);
      }
    });

    try {
      const response = await fetch(`http://localhost:8000/api/nursery/plant`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update plant");
      fetchPlants();

      const updatedPlant = await response.json();
      addToast("Plant updated successfully", "success");

      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.plant_id === updatedPlant.plant_id ? updatedPlant : plant
        )
      );
      handleModalClose();
    } catch (error) {
      console.error("Error updating plant:", error);
      addToast("Failed to update plant", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-gray-800">
      <header className="bg-green-600 text-white py-6 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Leaf size={40} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Plant Inventory
              </h1>
              <p className="text-sm text-blue-100">
                Manage your nursery's collection
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/nursery/add-plant")}
            className="flex items-center px-4 py-2 bg-white text-stone-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            <Plus size={20} className="mr-2" />
            Add Plant
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-12">
            <Leaf
              size={48}
              className="mx-auto text-gray-400 mb-4 animate-pulse"
            />
            <p className="text-xl text-gray-600">Loading plants...</p>
          </div>
        ) : plants.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Plants Found
            </h2>
            <p className="text-gray-600 mb-6">
              Start by adding your first plant to the inventory
            </p>
            <button
              onClick={() => navigate("/nursery/add-plant")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-[#17transparent "
            >
              <Plus size={20} className="mr-2 inline" /> Add First Plant
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <div
                key={plant.plant_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={`http://127.0.0.1:8000/api${plant.image_url}`}
                    alt={plant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(plant)}
                      className="bg-white/80 p-2 rounded-full hover:bg-white shadow-md"
                    >
                      <Edit size={20} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(plant.plant_id)}
                      className="bg-white/80 p-2 rounded-full hover:bg-white shadow-md"
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {plant.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="font-semibold text-stone-600">
                        Rs. {plant.price}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">Stock</span>
                      <span className="font-semibold text-gray-800">
                        {plant.stock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Edit Plant Details
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={modalPlant.name}
                onChange={(e) =>
                  setModalPlant({ ...modalPlant, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5f7a]"
                placeholder="Plant Name"
              />
              <textarea
                value={modalPlant.description}
                onChange={(e) =>
                  setModalPlant({ ...modalPlant, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5f7a]"
                placeholder="Description"
                rows="4"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={modalPlant.price}
                  onChange={(e) =>
                    setModalPlant({ ...modalPlant, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5f7a]"
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={modalPlant.stock}
                  onChange={(e) =>
                    setModalPlant({ ...modalPlant, stock: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5f7a]"
                  placeholder="Stock"
                />
              </div>
              <input
                type="file"
                onChange={(e) =>
                  setModalPlant({ ...modalPlant, image: e.target.files[0] })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-[#17transparent"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlants;
