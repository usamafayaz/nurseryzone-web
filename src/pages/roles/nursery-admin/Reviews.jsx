import React from "react";
import { MessageSquare, Star } from "lucide-react";
import { DUMMY_REVIEWS } from "../../../utils/dummyData";
import { useLocation } from "react-router-dom";

const Reviews = () => {
  const location = useLocation();
  const nursery = location.state;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <MessageSquare size={32} />
            <div>
              <h1 className="text-xl font-bold">Customer Reviews</h1>
              <p className="text-green-100 mt-1">
                View and manage customer feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {DUMMY_REVIEWS.length > 0 ? (
          DUMMY_REVIEWS.map((review) => (
            <div key={review.id} className="mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

                {/* Review Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {review.customerName}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {review.plantName}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={`${
                        index < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Comment */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900">No reviews yet</p>
            <p className="text-gray-500 mt-2">
              Customer reviews will appear here
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

export default Reviews;
