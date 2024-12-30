import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FaSpinner className="text-blue-500 text-xl animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
