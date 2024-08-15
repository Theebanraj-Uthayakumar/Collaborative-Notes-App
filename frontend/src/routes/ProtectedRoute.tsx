import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/service/user.service";

const ProtectedRoute = ({ children }: any) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
