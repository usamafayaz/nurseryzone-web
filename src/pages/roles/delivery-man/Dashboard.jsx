import React from "react";

const DeliveryBoyDashboard = () => {
  let storedUserData = localStorage.getItem("userData");
  storedUserData = JSON.parse(storedUserData);
  return <div>{storedUserData.name}</div>;
};

export default DeliveryBoyDashboard;
