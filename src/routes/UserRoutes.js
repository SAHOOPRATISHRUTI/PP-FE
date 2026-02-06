import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "../pages/UserHome";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
    </Routes>
  );
}

export default UserRoutes;