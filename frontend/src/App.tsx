import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { isAuthenticated } from "./service/user.service";
import Toaster from "./components/Toaster";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated() ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
