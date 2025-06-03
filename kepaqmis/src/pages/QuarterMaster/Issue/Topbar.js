import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { alpha } from '@mui/material/styles';

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Dummy user data
  const user = {
    name: 'Quarter Master (Issue Wing)',
    email: 'qm@example.com',
    avatarUrl: 'https://i.pravatar.cc/300', // Placeholder avatar image
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#f7f7f7',
        color: '#000',
        boxShadow: 'none',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        height: 90,
        ml: '250px', // Shift right to avoid sidebar (assuming sidebar width 250px)
        width: 'calc(100% - 250px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box ml={2}>
          <Typography variant="h5" fontWeight="bold">
            Welcome Quarter Master
          </Typography>
          <Typography variant="h6" color="textSecondary" fontWeight="bold">
            (Issue Wing)
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 1.5,
            backgroundColor: alpha('#000', 0.05),
            '&:hover': { backgroundColor: alpha('#000', 0.1) },
            width: { xs: '100%', sm: 300 },
            mr: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              pl: 2,
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              height: '100%',
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              color: 'inherit',
              width: '100%',
              pl: 5,
              pr: 2,
              py: 0.5,
              '&::placeholder': {
                color: '#333', // Dark grey placeholder
                opacity: 1,
              },
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            sx={{ width: 40, height: 40, mr: 1 }}
          />
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-controls={anchorEl ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: { mt: 1, minWidth: 200 },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => {
                alert('Logged out!');
                handleMenuClose();
              }}
              sx={{ color: 'orange', fontWeight: 'bold' }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
