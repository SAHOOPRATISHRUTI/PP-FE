import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (

    <Router>
          <>
      <AdminRoutes />
        <UserRoutes />
        </>
    </Router>
  
  );
}

export default App;



