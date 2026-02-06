import React, { useState } from "react";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

function AdminLogin() {
  const nav = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      localStorage.setItem("token", res.data.token);
      nav("/admin/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p:4, mt:10 }}>
        <Typography variant="h5">Admin Login</Typography>
        <form onSubmit={submit}>
          <TextField fullWidth margin="normal" label="Username"
            onChange={e=>setU(e.target.value)} />
          <TextField fullWidth margin="normal" type="password" label="Password"
            onChange={e=>setP(e.target.value)} />
          <Button fullWidth variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminLogin;
