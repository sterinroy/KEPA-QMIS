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
import './Register.css'; // for background/logo styling

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [role, setRole] = React.useState('QuarterMaster');

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirm = () => setShowConfirm(!showConfirm);

  return (
    <Box className="register-container">
      <img src="/path-to-your-logo.png" alt="logo" className="register-logo" />

      <Container maxWidth="sm" sx={{ backgroundColor: 'transparent', zIndex: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
          Create your account with us below
        </Typography>

        <Typography color="white" variant="body2" mb={2}>
          Already have an account?{' '}
          <Link href="/" underline="hover" sx={{ color: 'white', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <Typography color="white" variant="subtitle1" mb={1}>
            You’re creating an account as?
          </Typography>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ gap: 2 }}
          >
            <FormControlLabel
              value="QuarterMaster"
              control={<Radio sx={{ color: 'white' }} />}
              label="QuarterMaster"
              sx={{ color: 'white', border: '1px solid white', px: 2, borderRadius: 2 }}
            />
            <FormControlLabel
              value="User"
              control={<Radio sx={{ color: 'white' }} />}
              label="User"
              sx={{ color: 'white', border: '1px solid white', px: 2, borderRadius: 2 }}
            />
            <FormControlLabel
              value="Admin"
              control={<Radio sx={{ color: 'white' }} />}
              label="Admin"
              sx={{ color: 'white', border: '1px solid white', px: 2, borderRadius: 2, mt: 2 }}
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
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}
        >
          Create Account
        </Button>
      </Container>
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