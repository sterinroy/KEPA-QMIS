import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./Login.css";
import logo from "../assets/logo.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { FaSnowflake } from "react-icons/fa";
import { RiPoliceBadgeFill } from "react-icons/ri";

const Login = () => {
  const [pen, setPen] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const sprayContainer = document.querySelector(".snow-spray-container");

    const createParticle = (x, y) => {
      const particle = document.createElement("div");
      particle.className = "spray-particle";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      sprayContainer.appendChild(particle);

      setTimeout(() => {
        sprayContainer.removeChild(particle);
      }, 1000);
    };

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        createParticle(e.clientX + offsetX, e.clientY + offsetY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", updateCursor);
    return () => document.removeEventListener("mousemove", updateCursor);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      switch (auth.role) {
        case "Admin":
          navigate("/AdminDashboard");
          break;
        case "QuarterMaster":
          navigate("/QuarterMaster");
          break;
        case "User":
          navigate("/UserDashboard");
          break;
        case "SuperAdmin":
          navigate("/SuperAdminDashboard");
          break;
        default:
          alert("Unknown role.");
      }
    }
  }, [auth, navigate]);

  const handleLogin = () => {
    dispatch(login(pen, password));
  };

  return (
    <div className="custom-cursor-area">
      <div className="login-container">
        <div className="snow-spray-container" />
        <div
          className="custom-cursor"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
          }}
        >
          <RiPoliceBadgeFill />
        </div>
        <div className="snowfall-left">
          {[...Array(20)].map((_, i) => (
            <FaSnowflake key={`left-${i}`} className="snowflake-icon" />
          ))}
        </div>
        <div className="snowfall-right">
          {[...Array(20)].map((_, i) => (
            <FaSnowflake key={`right-${i}`} className="snowflake-icon" />
          ))}
        </div>
        <img src={logo} alt="Logo" className="background-logo" />
        <Box className="login-box" sx={{ zIndex: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "white",
              textAlign: "center",
            }}
          >
            QMIS - KEPA
          </Typography>
          <TextField
            fullWidth
            label="Enter the PEN Number"
            value={pen}
            onChange={(e) => setPen(e.target.value)}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
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
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <RouterLink
              to="/register"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register
            </RouterLink>
          </Box>
        </Box>
        <footer
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "white",
            fontSize: "0.9rem",
            position: "absolute",
            bottom: "10px",
            width: "100%",
          }}
        >
          © {new Date().getFullYear()} All rights reserved to "Albert the Keng"
        </footer>
      </div>
    </div>
  );
};

export default Login;
