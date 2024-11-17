// src/components/PlantCard.js
import React from "react";

const PlantCard = ({ plant, onEdit, onDelete }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-slate-100 p-4 rounded-lg shadow-md mb-4 md:flex-col lg:flex-row">
      <div className="flex-1">
        <span className="text-xl font-bold text-green-800 mb-2">
          {plant.name}
        </span>
        <div className="text-sm text-green-600">
          <p>Season: {plant.season}</p>
          <p>Type: {plant.type}</p>
          <p>Price: ${plant.price}</p>
        </div>
      </div>
      <div className="flex space-x-4 mt-3 md:mt-0">
        <button
          onClick={() => onEdit(plant)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(plant.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
