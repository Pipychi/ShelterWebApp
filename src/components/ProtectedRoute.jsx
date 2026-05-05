import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    if (!user) return <Navigate to="/" replace />;
    if (user.role === 'admin') return <Navigate to="/admin-verification" replace />;
    if (user.role === 'shelter') return <Navigate to="/shelter-profile" replace />;
    return <Navigate to="/requests" replace />;
  }

  return children;
}
