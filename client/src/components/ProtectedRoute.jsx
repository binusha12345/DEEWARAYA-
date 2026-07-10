// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isLoggedIn } = useAuth();

  // Not logged in → redirect to login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → redirect to home (not login)
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Everything ok → show the page
  return children;
};

export default ProtectedRoute;