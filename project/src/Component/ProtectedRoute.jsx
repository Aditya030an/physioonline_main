import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const ownerKey = localStorage.getItem("owner_key");

  if (!ownerKey) {
    return <Navigate to="/owner-login" replace />;
  }

  return children;
};

export default ProtectedRoute;