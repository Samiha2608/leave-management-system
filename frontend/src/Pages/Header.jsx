import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Leave Management System</h1>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.firstName}</span>
            {user.profilePicture && (
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt="Profile"
                className="w-8 h-8 rounded-full inline-block"
              />
            )}
            <Link to="/logout" className="ml-4">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
