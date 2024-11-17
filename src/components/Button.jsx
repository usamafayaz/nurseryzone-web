// src/components/Button.jsx
import React from "react";

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
