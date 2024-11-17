// src/screens/ReviewsScreen.js
import React from "react";
import { DUMMY_REVIEWS } from "../utils/dummyData";

const ReviewsScreen = () => {
  const renderReview = (item) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between mb-2">
        <p className="text-lg font-bold text-green-800">{item.customerName}</p>
        <p className="text-sm text-green-600">{item.date}</p>
      </div>
      <p className="text-sm text-green-600 mb-2">Plant: {item.plantName}</p>
      <div className="flex items-center mb-2">
        <p className="text-sm text-green-600 mr-2">Rating:</p>
        <p className="text-lg font-bold text-yellow-500">
          {"⭐".repeat(item.rating)}
        </p>
      </div>
      <p className="text-sm text-green-800 mt-2">{item.comment}</p>
    </div>
  );

  return (
    <div className="flex-1 bg-white py-4 px-6">
      <h1 className="text-2xl font-bold text-green-800 mb-5">
        Customer's Reviews
      </h1>
      {DUMMY_REVIEWS.length > 0 ? (
        DUMMY_REVIEWS.map((item) => (
          <div key={item.id} className="mb-6">
            {renderReview(item)}
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-green-600">
          No reviews available.
        </p>
      )}
    </div>
  );
};

export default ReviewsScreen;
