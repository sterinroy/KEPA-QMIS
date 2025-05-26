import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import './Login.css';
import logo from '../assets/logo.svg';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [pen, setPen] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pen, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    // Save token and role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // Redirect based on role
    switch (data.role) {
      case "Admin":
        window.location.href = "/AdminDashboard";
        break;
      case "QuarterMaster":
        window.location.href = "/QuarterMaster";
        break;
      case "User":
        window.location.href = "/UserDashboard";
        break;
      default:
        alert("Unknown role.");
    }

  } catch (error) {
    console.error(error);
    alert("An error occurred during login.");
  }
};
  

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="background-logo" />
      <Box className="login-box" sx={{ zIndex: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'white', textAlign: 'center' }}>
          QMIS - KEPA
        </Typography>
        <TextField
          fullWidth
          label="Enter the PEN Number"
          value={pen}
          onChange={(e) => setPen(e.target.value)}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <RouterLink to="/register" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
            Register
          </RouterLink>
        </Box>
      </Box>
      <footer style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: 'white',
        fontSize: '0.9rem',
        position: 'absolute',
        bottom: '10px',
        width: '100%'
      }}>
        © {new Date().getFullYear()} All rights reserved to "Albert the Keng"
      </footer>
    </div>
  );
};

export default Login;
