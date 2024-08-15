import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../service/user.service";

const ProtectedRoute = ({ children }: any) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
