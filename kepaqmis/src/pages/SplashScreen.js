import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";
import logo from "../assets/wtkq.svg";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [explode, setExplode] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const explodeTimer = setTimeout(() => {
      setExplode(true); // begin explosion
    }, 3000); // after bounce

    const logoTimer = setTimeout(() => {
      setShowLogo(true); // show logo
    }, 4000); // after explosion

    const redirectTimer = setTimeout(() => {
      navigate("/login");
    }, 9000); // final redirect

    return () => {
      clearTimeout(explodeTimer);
      clearTimeout(logoTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="container">
      {/* Circle */}
      <div className={`black-circle ${explode ? "explode-grow" : "bounce"}`} />

      {/* Logo on top */}
      {showLogo && (
        <img src={logo} alt="KEPA QMIS" className="splash-logo" />
      )}
    </div>
  );
};

export default SplashScreen;
