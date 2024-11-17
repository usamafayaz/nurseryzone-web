import React from "react";
import { Users, Mail, Phone, Calendar, Package, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DUMMY_CUSTOMERS } from "../utils/dummyData";

const CustomersScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Users size={32} />
            <div>
              <h1 className="text-xl font-bold">Customers</h1>
              <p className="text-green-100 mt-1">
                View and manage customer information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {DUMMY_CUSTOMERS.length > 0 ? (
          DUMMY_CUSTOMERS.map((customer) => (
            <div key={customer.id} className="mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

                {/* Customer Header */}
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {customer.name}
                  </h2>
                  <div className="flex items-center">
                    <Package size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600">
                      {customer.orderCount} orders
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Mail size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        {customer.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Phone size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">
                        {customer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Calendar size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium text-gray-900">
                        {customer.joinDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">
              No customers yet
            </p>
            <p className="text-gray-500 mt-2">
              New customers will appear here when they register
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

export default CustomersScreen;
