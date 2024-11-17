import React from "react";
import { DollarSign, Package, Calendar, User } from "lucide-react";
import { DUMMY_ORDERS } from "../utils/dummyData";

const OrderDetailsScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Package size={32} />
            <div>
              <h1 className="text-xl font-bold">Order Details</h1>
              <p className="text-green-100 mt-1">
                View and manage customer orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {DUMMY_ORDERS.length > 0 ? (
          DUMMY_ORDERS.map((order) => (
            <div key={order.id} className="mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

                {/* Order Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Order #{order.id}
                    </h2>
                    <div className="flex items-center mt-2 text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{order.date}</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <User size={20} className="text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.customerName}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Order Items</h3>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          Plant ID: {item.plantId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={16} className="text-gray-400 mr-1" />
                        <span className="font-medium text-gray-900">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <div className="flex items-center">
                      <DollarSign size={20} className="text-green-600 mr-1" />
                      <span className="text-xl font-bold text-green-600">
                        ${order.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">
              No orders available
            </p>
            <p className="text-gray-500 mt-2">
              New orders will appear here when customers make purchases
            </p>
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

export default OrderDetailsScreen;
