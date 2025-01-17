import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Welcome to Ticket Management</h1>
        <p className="text-gray-600">Please choose your role</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/user_login')}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            User Login/Register
          </button>
          <button
            onClick={() => navigate('/admin_login')}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
