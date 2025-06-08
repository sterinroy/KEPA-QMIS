import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0C1227",
        color: "white",
        textAlign: "center",
        marginLeft: '130px',
        width: "100%",
        marginTop: '-50px',
        fontSize: "14px",
      }}
    >
      <Typography variant="body2">© 2025 KEPA. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
