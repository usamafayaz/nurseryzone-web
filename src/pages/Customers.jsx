// src/screens/CustomersScreen.js
import React from "react";
import { DUMMY_CUSTOMERS } from "../utils/dummyData";

const CustomersScreen = () => {
  const renderCustomer = (item) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 mx-4">
      <p className="text-lg font-bold text-green-800 mb-2">{item.name}</p>
      <p className="text-sm text-green-600 mb-1">Email: {item.email}</p>
      <p className="text-sm text-green-600 mb-1">Phone: {item.phone}</p>
      <p className="text-sm text-green-600 mb-1">Join Date: {item.joinDate}</p>
      <p className="text-sm text-green-600 mb-1">
        Total Orders: {item.orderCount}
      </p>
    </div>
  );

  return (
    <div className="flex-1 bg-white py-4 px-6">
      <h1 className="text-2xl font-bold text-green-800 mb-5">Customers List</h1>
      {DUMMY_CUSTOMERS.length > 0 ? (
        DUMMY_CUSTOMERS.map((item) => (
          <div key={item.id} className="mb-6">
            {renderCustomer(item)}
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-green-600">
          No customers available.
        </p>
      )}
    </div>
  );
};

export default CustomersScreen;
