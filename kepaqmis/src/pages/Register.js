import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Register.css';
import logo from '../assets/logo.svg'; // update this path
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [role, setRole] = React.useState('User');
  const [pen, setPen] = React.useState('');
const [name, setName] = React.useState('');
const [phone, setPhone] = React.useState('');
const [password, setPassword] = React.useState('');
const [confirmPassword, setConfirmPassword] = React.useState('');

// Submit handler
const handleSubmit = async () => {
  if (password !== confirmPassword) {
    setSnackbarMessage("❌ Passwords do not match");
    setSnackbarOpen(true);
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pen, name, phone, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      setSnackbarMessage(`❌ ${data.msg || "Registration failed"}`);
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("✅ Registration successful! Pending approval by Admin.");
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 4000); // wait 2 seconds before redirecting
    }
  } catch (err) {
    console.error(err);
    setSnackbarMessage("❌ An error occurred.");
    setSnackbarOpen(true);
  }
};


  const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirm = () => setShowConfirm(!showConfirm);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
const [snackbarMessage, setSnackbarMessage] = React.useState('');


  return (
    <Box className="register-container">
      <img src={logo} alt="logo" className="register-logo" />

      <Container 
        maxWidth="sm" 
        sx={{ 
          backgroundColor: 'transparent', 
          zIndex: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '3px',
          },
          py: 2
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
          Create your account with us below
        </Typography>

        <Typography color="white" variant="body2" mb={2}>
          Already have an account?{' '}
          <Link href="/Login" underline="hover" sx={{ color: 'white', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <Typography color="white" variant="subtitle1" mb={1}>
            You're creating an account as?
          </Typography>
          <RadioGroup
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
          >
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <FormControlLabel
                value="User"
                control={<Radio sx={{ color: 'white' }} />}
                label={
                  <Typography color="white">User</Typography>
                }
                sx={{ 
                  flex: 1,
                  border: '1px solid white', 
                  px: 2, 
                  py: 1,
                  borderRadius: 2,
                  m: 0
                }}
              />
              <FormControlLabel
                value="QuarterMaster"
                control={<Radio sx={{ color: 'white' }} />}
                label={
                  <Typography color="white">QuarterMaster</Typography>
                }
                sx={{ 
                  flex: 1,
                  border: '1px solid white', 
                  px: 2, 
                  py: 1,
                  borderRadius: 2,
                  m: 0
                }}
              />
            </Box>
            <FormControlLabel
              value="Admin"
              control={<Radio sx={{ color: 'white' }} />}
              label={
                <Typography color="white">Admin</Typography>
              }
              sx={{ 
                border: '1px solid white', 
                px: 2, 
                py: 1,
                borderRadius: 2,
                m: 0,
                width: '42.5%'
              }}
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="PEN Number"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
          sx={textFieldStyle}
          value={pen}
          onChange={(e) => setPen(e.target.value)}
        />

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
          sx={textFieldStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
          sx={textFieldStyle}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end" sx={{ color: 'white' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
          sx={textFieldStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirm} edge="end" sx={{ color: 'white' }}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
          sx={textFieldStyle}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />


        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>

      </Container>
      <Snackbar
      open={snackbarOpen}
     autoHideDuration={6000}
     onClose={() => setSnackbarOpen(false)}
     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
  <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>

    </Box>
  );
};

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#ddd',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  mb: 2,
};

export default Register;