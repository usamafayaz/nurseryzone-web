import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

const Reviews = () => {
  let nursery = localStorage.getItem("userData");
  nursery = JSON.parse(nursery);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/feedback/${nursery.user_id}`
      );
      if (response.ok) {
        const result = await response.json();
        setReviews(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-8">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <MessageSquare size={32} />
            <div>
              <h1 className="text-2xl font-bold">Customer Reviews</h1>
              <p className="text-green-100 mt-1">
                View and manage customer feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.order_id}
                className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />

                {/* Review Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {review.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Plant: {review["plant name"]}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Order ID */}
                <p className="mb-4 text-sm text-gray-700">
                  <strong>Order ID:</strong> ORD-
                  {String(review.order_id).padStart(4, "0")}
                </p>

                {/* Comment */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
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
