import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const isAuthenticated = localStorage.getItem("adminToken");

  return (
    <div className="app">
      <ToastContainer />

      {!isLoginPage && <Navbar />}
      {!isLoginPage && <hr />}

      <div className={`app-container ${isLoginPage ? "no-sidebar" : ""}`}>
        {!isLoginPage && <Sidebar />}

        <div className="app-content">
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
            />

            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;