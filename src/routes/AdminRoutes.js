import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";

const AdminRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={token ? <Dashboard /> : <Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRoutes;
