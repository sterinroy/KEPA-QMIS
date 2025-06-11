import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser,
} from "../../redux/actions/superAdminActions";
import "./SuperAdmin.css";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Logout logged successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }

    localStorage.clear();
    setShowDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    try {
      CSS.registerProperty({
        name: "--p",
        syntax: "<integer>",
        initialValue: 90, // Changed from 0 to 90 to match your first displayed value (2018)
        inherits: true,
      });
    } catch (e) {
      console.warn("CSS Custom Properties not fully supported");
    }
  }, []);

  const data = { 2018: 90, 2017: 20, 2016: 65 };
  const darr = Object.entries(data).map(
    ([year, value]) => `${value} for ${year}`
  );
  const initialValue = Object.values(data)[0];
  // Add state for percentage
  const [percentage, setPercentage] = useState(90); // Start with 90%

  // Update handler for radio buttons
  const handleYearChange = (value) => {
    setPercentage(value);
    const pie = document.querySelector(".pie");
    if (pie) {
      pie.style.setProperty("--p", value);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: "90px",
            ml: "260px",
            display: "flex",
            gap: "20px",
          }}
        >
          <div className="pie-chart-container">
            <div className="wrap">
              <div className="radio-buttons">
                {Object.entries(data).map(([year, value]) => (
                  <React.Fragment key={year}>
                    <input
                      type="radio"
                      name="o"
                      id={`o${year}`}
                      defaultChecked={value === initialValue}
                      onChange={() => handleYearChange(value)}
                    />
                    <label htmlFor={`o${year}`}>{year}</label>
                  </React.Fragment>
                ))}
              </div>
              <div className="pie" />
            </div>
          </div>

          <div className="main-container">
            <div className="year-stats">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"].map(
                (month, index) => (
                  <div
                    key={month}
                    className={`month-group ${
                      month === "May" ? "selected" : ""
                    }`}
                  >
                    <div
                      className={`bar h-${[
                        "100",
                        "50",
                        "75",
                        "25",
                        "100",
                        "50",
                        "75",
                        "25",
                        "50",
                        "75",
                        "25",
                        "100",
                      ][index]}`}
                    ></div>
                    <p className="month">{month}</p>
                  </div>
                )
              )}
            </div>

            <div className="stats-info">
              <div className="graph-container">
                <div className="percent">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle"
                      strokeDasharray="100, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray="85, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray="60, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray="30, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
                <p>Total: $2075</p>
              </div>

              <div className="info">
                <p>
                  Most expensive category <br />
                  <span>Restaurants & Dining</span>
                </p>
                <p>
                  Updated categories <span>2</span>
                </p>
                <p>
                  Bonus payments <span>$92</span>
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
