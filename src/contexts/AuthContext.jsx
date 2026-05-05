import React, { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser({
      ...userData,
      activeRequests: userData.activeRequests || []
    });
  };

  const takeRequest = (requestData) => {
    if (user) {
      setUser({
        ...user,
        activeRequests: [...user.activeRequests, { ...requestData, status: 'В работе' }]
      });
    }
  };

  const updateUser = (newData) => {
    if (user) {
      setUser({
        ...user,
        ...newData
      });
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, takeRequest, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
