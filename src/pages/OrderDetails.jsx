// src/screens/OrderDetailsScreen.js
import React from "react";
// import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation
import { DUMMY_ORDERS } from "../utils/dummyData";

const OrderDetailsScreen = () => {
  const renderOrder = (item) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <p className="text-lg font-bold text-green-800 mb-2">Order #{item.id}</p>
      <p className="text-sm text-green-600 mb-1">
        Customer: {item.customerName}
      </p>
      <p className="text-sm text-green-600 mb-1">Date: {item.date}</p>
      <p className="text-sm text-green-500 mb-3">Status: {item.status}</p>
      <p className="text-lg font-bold text-green-800 mb-3">Items:</p>
      {item.items.map((orderItem, index) => (
        <div key={index} className="ml-4 mb-2">
          <p className="text-sm text-green-600">
            Plant ID: {orderItem.plantId}
          </p>
          <p className="text-sm text-green-600">
            Quantity: {orderItem.quantity}
          </p>
          <p className="text-sm text-green-600">Price: ${orderItem.price}</p>
        </div>
      ))}
      <p className="text-lg font-bold text-green-700 mt-4 text-right">
        Total: ${item.total}
      </p>
    </div>
  );

  return (
    <div className="flex-1 bg-white py-4">
      <h1 className="text-2xl font-bold text-green-800 mb-5">
        Customer's Orders
      </h1>
      {DUMMY_ORDERS.length > 0 ? (
        DUMMY_ORDERS.map((item) => (
          <div key={item.id} className="mb-6">
            {renderOrder(item)}
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-green-600">
          No orders available.
        </p>
      )}
    </div>
  );
};

export default OrderDetailsScreen;
