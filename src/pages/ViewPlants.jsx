// src/screens/ViewPlantsScreen.js
import React, { useState } from "react";
import PlantCard from "../components/PlantCard";
import { DUMMY_PLANTS } from "../utils/dummyData";

const ViewPlantsScreen = () => {
  const [plants, setPlants] = useState(DUMMY_PLANTS);

  const handleEdit = (plant) => {
    console.log("Editing plant:", plant);
    // Your logic to edit plant
  };

  const handleDelete = (plantId) => {
    setPlants(plants.filter((plant) => plant.id !== plantId));
  };

  return (
    <div className="flex flex-col p-5 bg-white">
      <h2 className="text-2xl font-bold text-green-800 mb-5">Your Plants</h2>
      {plants.length > 0 ? (
        <div className="space-y-4">
          {plants.map((item) => (
            <PlantCard
              key={item.id}
              plant={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <span className="text-lg text-green-600 text-center mt-12">
          No plants available. Add some!
        </span>
      )}
    </div>
  );
};

export default ViewPlantsScreen;
