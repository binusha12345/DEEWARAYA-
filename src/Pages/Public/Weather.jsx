import React from "react";
import WeatherDashboard from "./WeatherDashboard";

const Weather = () => {
   <style>{weatherPageStyles}</style>  
  return <WeatherDashboard />;
};


// ============================================================
// ✅ RESPONSIVE STYLES - Proper & Clean
// ============================================================

const weatherPageStyles = `

  /* ==============================
     BASE - Page wrapper foundation
     ============================== */

  /* Ensure full height on all screens */
  #root {
    height: 100%;
    min-height: 100vh;
  }

  /* ==============================
     ANIMATIONS
     ============================== */
  @keyframes weatherPageFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Smooth page load */
  .weather-page-wrapper {
    animation: weatherPageFadeIn 0.25s ease forwards;
  }
`;

export default Weather;