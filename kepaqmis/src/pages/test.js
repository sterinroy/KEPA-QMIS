import React from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import './Login.css';
import logo from '../assets/logo.svg'; // update this path
import { Link as RouterLink } from 'react-router-dom';


const Login = () => {
  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="background-logo" />
      <Box className="login-box" sx={{ zIndex: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'white',textAlign: 'center', }}>
          QMIS - KEPA
        </Typography>
        <TextField
          fullWidth
          label="Enter the PEN Number"
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
        © {new Date().getFullYear()} All rights reserved to Albert the Keng
      </footer>
    </div>
  );
};

export default Login;
