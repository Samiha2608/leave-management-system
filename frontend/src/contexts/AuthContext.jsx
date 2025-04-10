import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext(); // Ensure it is exported

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Fetch the user details from the backend
      const response = await fetch('http://localhost:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token in headers
        },
      });

      // Check if the response is not OK
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized'); // Handle unauthorized error specifically
        }
        if (response.status === 404) {
          throw new Error('User not found'); // Handle not found error specifically
        }
        throw new Error('Failed to fetch user'); // General error for other statuses
      }

      // Parse the JSON response
      const userData = await response.json();

      // Set the user data in state
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Reset user state on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchUser(); // Call the fetchUser function on component mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children} {/* Provide the user data and loading state to children components */}
    </AuthContext.Provider>
  );
};
