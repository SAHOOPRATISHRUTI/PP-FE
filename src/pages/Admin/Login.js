import React, { useState } from "react";
import LoginForm from "../../components/Admin/LoginForm";

function Login() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? <LoginForm onLogin={setUser} /> : <h2>Welcome, {user.username}</h2>}
    </div>
  );
}

export default Login;
