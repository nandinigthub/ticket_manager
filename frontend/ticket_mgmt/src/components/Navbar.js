import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-white text-xl font-semibold">Ticket Manager</div>
          </div>
          <div className="ml-10 flex items-baseline space-x-4">
            {/* Home Link */}
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            {/* Login/Register Link (Visible if not authenticated) */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/user_login"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  User Login
                </Link>
                <Link
                  to="/admin_login"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Login
                </Link>
              </>
            ) : (
              // Conditional Dashboard Links based on user role
              <>
                {userRole === 'admin' ? (
                  <>
                    <Link
                      to="/admin_dashboard"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Dashboard
                    </Link>

                    <Link
                      to="/user_login"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      User Login
                    </Link>

                  </>
                ) : (
                  <>
                    <Link
                      to="/user_dashboard"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      User Dashboard
                    </Link>

                    <Link
                      to="/admin_login"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Login
                    </Link>

                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
