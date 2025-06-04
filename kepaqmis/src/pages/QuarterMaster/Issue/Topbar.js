import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const user = {
    name: 'Quarter Master (Issue Wing)',
    email: 'qm@example.com',
    avatarUrl: 'https://i.pravatar.cc/300',
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#0C1227',
        color: '#fff',
        boxShadow: 'none',
        borderTopLeftRadius: 16,
        height: 90,
        ml: '260px',
        width: 'calc(100% - 260px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box ml={2}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ fontFamily: 'DM Sans, sans-serif', color: '#fff' }}
          >
            Welcome Quarter Master
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontFamily: 'DM Sans, sans-serif', color: '#ccc' }}
          >
            (Issue Wing)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
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
            sx={{ color: '#fff' }}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                backgroundColor: '#1c1f2b',
                color: '#fff',
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                {user.email}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#333' }} />
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
