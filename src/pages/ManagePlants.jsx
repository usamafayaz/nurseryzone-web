import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import {
  FaLeaf,
  FaCalendarAlt,
  FaTag,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";

const ManagePlantsScreen = () => {
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
    <div className="container mx-auto p-5 bg-white">
      <h1 className="text-2xl font-bold text-green-800 mb-5">Manage Plants</h1>

      <div className="space-y-4">
        <InputField
          label="Plant Name"
          icon={<FaLeaf />}
          placeholder="Enter plant name"
          value={plantData.name}
          onChangeText={(text) => setPlantData({ ...plantData, name: text })}
          error={error && !plantData.name ? "This field is required" : ""}
        />
        <InputField
          label="Season"
          icon={<FaCalendarAlt />}
          placeholder="Enter season"
          value={plantData.season}
          onChangeText={(text) => setPlantData({ ...plantData, season: text })}
          error={error && !plantData.season ? "This field is required" : ""}
        />
        <InputField
          label="Type"
          icon={<FaTag />}
          placeholder="Enter type"
          value={plantData.type}
          onChangeText={(text) => setPlantData({ ...plantData, type: text })}
          error={error && !plantData.type ? "This field is required" : ""}
        />
        <InputField
          label="Price"
          icon={<FaMoneyBillWaveAlt />}
          placeholder="Enter price"
          value={plantData.price}
          onChangeText={(text) => setPlantData({ ...plantData, price: text })}
          keyboardType="numeric"
          error={error && !plantData.price ? "This field is required" : ""}
        />

        <Button onClick={handleAddPlant}>Add Plant</Button>
      </div>
    </div>
  );
};

export default ManagePlantsScreen;
