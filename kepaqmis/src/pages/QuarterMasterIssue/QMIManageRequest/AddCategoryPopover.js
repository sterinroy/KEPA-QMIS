// File: AddCategoryPopover.js
import React from "react";
import { Popover, Box, Typography, TextField, Button } from "@mui/material";

const AddCategoryPopover = ({
  anchorEl,
  open,
  onClose,
  value,
  onChange,
  onAdd,
  label = "Category",
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Add New {label}</Typography>
        <TextField
          size="small"
          value={value}
          onChange={onChange}
          placeholder={`${label} Name`}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={onAdd}>
          Add
        </Button>
      </Box>
    </Popover>
  );
};

export default AddCategoryPopover;
