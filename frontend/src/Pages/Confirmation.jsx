// Confirmation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <div className="mx-auto flex items-center justify-center">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Application Submitted</h2>
        <p>Your leave application has been successfully submitted.</p>
        <button 
          onClick={() => navigate('/userDashboard')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
